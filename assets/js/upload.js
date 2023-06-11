const input = document.getElementById('file-input');
const inputButton = document.getElementById('file-input-button');
const card = document.getElementById('file-card');
const fileName = document.getElementById('file-name');
const cancel = document.getElementById('file-cancel');

inputButton.addEventListener('click', () => {
    input.click();
});

input.addEventListener('change', () => {
  if (input.files.length === 0) {
      alert('Nessun file caricato');
  } else {
      card.classList.remove('hidden');
      fileName.textContent = input.files[0].name;
  }
});


cancel.addEventListener('click', () => {
    input.value = '';
    card.classList.add('hidden');
    fileName.textContent = 'NOME_FILE';
});

