const fileInput = document.querySelector('#file-input');
const extensionButton = document.querySelector('#extensions-button');
const convertButton = document.querySelector('#convert-button');

const convertImage = async (type) => {
  const file = fileInput.files[0];
  const img = new Image();
  img.src = URL.createObjectURL(file);

  await new Promise(resolve => img.onload = resolve);

  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const dataURL = canvas.toDataURL(`image/${type}`);
  const downloadLink = document.createElement('a');
  downloadLink.href = dataURL;
  downloadLink.download = `converted.${type}`;
  downloadLink.click();
}

convertButton.addEventListener('click', async () => {
  if (fileInput.files.length === 0) {
    alert('Please select a file.');
    return;
  }

  switch (extensionButton.innerHTML) {
    case 'JPG':
      await convertImage('jpg');
      break;
    case 'PNG':
      await convertImage('png');
      break;
    default:
      alert('Please select an extension.');
  }
});