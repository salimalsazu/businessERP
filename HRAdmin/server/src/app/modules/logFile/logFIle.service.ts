import fs from 'fs';
import path from 'path';

const parseLogContent = (content: any) => {
  // Split the content by newline and filter out any empty lines
  return content
    .trim()
    .split('\r\n')
    .map((line: any) => {
      return { message: line }; // Customize the object structure as needed
    });
};

// const getLatestLogFile = (logType: any) => {
//   return new Promise((resolve, reject) => {
//     const logDir = path.join(process.cwd(), 'logs', 'winston', logType);

//     fs.readdir(logDir, (err, files) => {
//       if (err) {
//         return reject(new Error('Unable to read log files.'));
//       }

//       if (files.length === 0) {
//         return reject(new Error('No log files found.'));
//       }

//       const sortedFiles = files.sort((a, b) => {
//         return fs.statSync(path.join(logDir, b)).mtimeMs - fs.statSync(path.join(logDir, a)).mtimeMs;
//       });

//       const latestLogFile = path.join(logDir, sortedFiles[0]);

//       fs.readFile(latestLogFile, 'utf8', (err, data) => {
//         if (err) {
//           return reject(new Error('Unable to read the log file.'));
//         }

//         const logEntries = parseLogContent(data);
//         resolve(logEntries);
//       });
//     });
//   });
// };

const getLatestLogFile = (logType: any) => {
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

      const logEntries: any = [];

      sortedFiles.forEach(file => {
        const filePath = path.join(logDir, file);

        // Read each file and parse the content
        const data = fs.readFileSync(filePath, 'utf8');
        const fileLogEntries = parseLogContent(data);

        logEntries.push(...fileLogEntries);
      });

      resolve(logEntries);
    });
  });
};

export const logFileService = {
  getLatestLogFile,
};
