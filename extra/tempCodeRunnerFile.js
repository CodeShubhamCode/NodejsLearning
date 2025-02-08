import fs from "fs";

// Create a ReadStream
const readStream = fs.createReadStream('input.txt', { encoding: 'utf8' });

// Event listeners
readStream.on('data', (chunk) => {
  console.log("Received chunk:", chunk);
});

readStream.on('end', () => {
  console.log("Reading completed.");
});

readStream.on('error', (err) => {
  console.error("Error:", err);
});
