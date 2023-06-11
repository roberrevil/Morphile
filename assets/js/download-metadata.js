const ExifReader = require('exifreader');
const PNG = require('pngjs').PNG;
const { PDFDocument } = require('pdfjs-dist');

function readJPEGMetadata(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function(e) {
      try {
        const tags = ExifReader.load(e.target.result);
        const metadata = {};

        for (const tag in tags) {
          if (tags.hasOwnProperty(tag)) {
            metadata[tag] = tags[tag].description;
          }
        }

        resolve(metadata);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  });
}

function readPNGMetadata(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function(e) {
      const png = PNG.sync.read(e.target.result);
      const metadata = png.data;

      resolve(metadata);
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  });
}

function readPDFMetadata(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async function(e) {
      try {
        const pdf = await PDFDocument.load(e.target.result);
        const metadata = pdf.getMetadata();

        resolve(metadata);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  });
}

function convertToCSV(metadata) {
  const rows = [];

  for (const key in metadata) {
    const value = metadata[key];
    rows.push(`${key},${JSON.stringify(value)}`);
  }

  return rows.join('\n');
}

function downloadCSV(csvContent) {
  const blob = new Blob([csvContent], { type: 'text/csv' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'metadata.csv';

  link.click();
}

const fileInput = document.getElementById('file-input');

fileInput.addEventListener('change', async function(event) {
  const file = event.target.files[0];

  try {
    let metadata;
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
      metadata = await readJPEGMetadata(file);
    } else if (fileExtension === 'png') {
      metadata = await readPNGMetadata(file);
    } else if (fileExtension === 'pdf') {
      metadata = await readPDFMetadata(file);
    } else {
      throw new Error('Unsupported file format');
    }

    const csvContent = convertToCSV(metadata);
    downloadCSV(csvContent);
  } catch (error) {
    console.error(error);
  }
});
