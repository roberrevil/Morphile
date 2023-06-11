const exiftool = require('exiftool-vendored').exiftool;

function downloadCSV(data, filename) {
  const csvContent = "data:text/csv;charset=utf-8," + data;
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function retrieveAllMetadata(file) {
  try {
    const metadata = await exiftool.read(file.path);
    return metadata;
  } catch (error) {
    console.error('Error retrieving metadata:', error);
    return null;
  }
}

const fileInput = document.getElementById('file-input');
const downloadButton = document.getElementById('download-metadata-button');

downloadButton.addEventListener('click', async () => {
  const selectedFile = fileInput.files[0];
  if (selectedFile) {
    const metadata = await retrieveAllMetadata(selectedFile);
    if (metadata) {
      const csvData = Object.entries(metadata).map(([key, value]) => `${key},${value}`).join('\n');
      downloadCSV(csvData, 'metadata.csv');
    }
  }
});
