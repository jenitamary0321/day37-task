const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Directory to store the text files
const folderPath = path.join(__dirname, 'files');

// Ensure the folder exists
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

// Endpoint to create a text file with the current timestamp
app.post('/create-file', (req, res) => {
  const timestamp = new Date().toISOString();
  const filename = `${new Date().toISOString().replace(/[:.]/g, '-')}.txt`;
  const filePath = path.join(folderPath, filename);

  fs.writeFile(filePath, timestamp, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error writing file');
    }
    res.send('File created successfully');
  });
});

// Endpoint to retrieve all text files in the folder
app.get('/files', (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading directory');
    }
    res.json(files);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
