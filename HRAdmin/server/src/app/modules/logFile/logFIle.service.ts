import fs from 'fs';
import path from 'path';

const parseLogContent = (content: string) => {
  // Split the content by newline and filter out any empty lines
  return content
    .trim()
    .split('\r\n')
    .map(line => {
      return { message: line }; // Customize the object structure as needed
    });
};

const getLatestLogFile = (logType: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const logDir = path.join(process.cwd(), 'logs', 'winston', logType);

    fs.readdir(logDir, (err, files) => {
      if (err) {
        return reject(new Error('Unable to read log files.'));
      }

      if (files.length === 0) {
        return reject(new Error('No log files found.'));
      }

      // Filter files that start with 'HR'
      const hrFiles = files.filter(file => file.startsWith('HR'));

      if (hrFiles.length === 0) {
        return reject(new Error('No HR log files found.'));
      }

      // Sort the files by modification time (optional, if order matters)
      const sortedFiles = hrFiles.sort((a, b) => {
        return fs.statSync(path.join(logDir, b)).mtimeMs - fs.statSync(path.join(logDir, a)).mtimeMs;
      });

      const logEntries: any[] = [];

      // Use Promise.all to read all files asynchronously
      const readFilesPromises = sortedFiles.map(file => {
        const filePath = path.join(logDir, file);
        return fs.promises.readFile(filePath, 'utf8').then(data => {
          const fileLogEntries = parseLogContent(data);
          logEntries.push(...fileLogEntries);
        });
      });

      // Resolve after all files have been read
      Promise.all(readFilesPromises)
        .then(() => resolve(logEntries))
        .catch(err => reject(new Error('Error reading log files.')));
    });
  });
};

export const logFileService = {
  getLatestLogFile,
};
