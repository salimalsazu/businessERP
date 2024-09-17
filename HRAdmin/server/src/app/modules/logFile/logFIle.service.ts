import fs from 'fs';
import path from 'path';

const parseLogContent = (content: string) => {
  return content
    .trim()
    .split('\n') // Splitting by newlines for each log entry
    .map((line: string) => {
      return { message: line.trim() }; // Each line becomes a separate log message object
    });
};

const getLatestLogFile = async (logType: string): Promise<any[]> => {
  try {
    const logDir = path.join(process.cwd(), 'logs', 'winston', logType);

    // Read all files in the directory
    const files = await fs.promises.readdir(logDir);

    if (!files.length) {
      throw new Error('No log files found.');
    }

    // Filter files that start with 'HR'
    const hrFiles = files.filter(file => file.startsWith('HR'));

    if (!hrFiles.length) {
      throw new Error('No HR log files found.');
    }

    // Sort files by modification time
    const sortedFiles = hrFiles.sort((a, b) => {
      const statA = fs.statSync(path.join(logDir, a)).mtimeMs;
      const statB = fs.statSync(path.join(logDir, b)).mtimeMs;
      return statB - statA;
    });

    const logEntries: any[] = [];

    // Iterate through sorted files and read them
    for (const file of sortedFiles) {
      const filePath = path.join(logDir, file);

      // Read each file asynchronously
      const data = await fs.promises.readFile(filePath, 'utf8');

      // Parse log content
      const fileLogEntries = parseLogContent(data);
      logEntries.push(...fileLogEntries); // Merge log entries
    }

    return logEntries;
  } catch (error) {
    // Catching and throwing error to be handled by caller
    //@ts-ignore
    throw new Error(`Error fetching logs: ${error.message}`);
  }
};

export const logFileService = {
  getLatestLogFile,
};
