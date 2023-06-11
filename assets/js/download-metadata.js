const { getElementById: getById } = document;
const input = getById('file-input');
const inputButton = getById('file-input-button');
const card = getById('file-card');
const fileName = getById('file-name');
const cancel = getById('file-cancel');

inputButton.addEventListener('click', handleInputButtonClick);
input.addEventListener('change', handleInputChange);
cancel.addEventListener('click', handleCancelClick);

function handleInputButtonClick() {
    input.click();
}

function handleInputChange() {
    if (input.files.length === 0) {
        alert('No files uploaded');
    } else {
        showFileInfo(input.files[0].name);
    }
}

function handleCancelClick() {
    resetInput();
    hideCard();
}

function showFileInfo(filename) {
    card.classList.remove('hidden');
    fileName.textContent = filename;
}

function resetInput() {
    input.value = '';
}

function hideCard() {
    card.classList.add('hidden');
    fileName.textContent = 'FILE_NAME';
}