function upload() {
    const input = document.getElementById('file-input');
    const inputButton = document.getElementById('file-input-button');
    const card = document.getElementById('file-card');
    const fileName = document.getElementById('file-name');
    const cancel = document.getElementById('file-cancel');

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

    inputButton.addEventListener('click', () => {
        input.click();
    });

    input.addEventListener('change', () => {
        if (input.files.length === 0) {
            alert('No files uploaded');
        } else {
            showFileInfo(input.files[0].name);
        }
    });

    cancel.addEventListener('click', () => {
        resetInput();
        hideCard();
    });
}

upload();