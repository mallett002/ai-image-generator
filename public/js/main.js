function onSubmit(event) {
    event.preventDefault();

    document.querySelector('#prompt').disabled = true;
    document.querySelector('#msg').textContent = '';
    document.querySelector('#image').src = '';

    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;

    if (prompt === '') {
        alert('Please add a description');
        return;
    }

    generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
    showSpinner();

    try {
        const response = await fetch('/openai/generate-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt,
                size,
            }),
        });

        if (!response.ok) {
            removeSpinner();

            throw new Error('That image could not be generated')
        }

        const {imageUrl} = await response.json();
        
        const input = document.querySelector('#prompt');

        input.value = '';
        input.disabled = false;

        document.querySelector('#msg').textContent = `"${prompt}"`;
        document.querySelector('#image').src = imageUrl;

    } catch (error) {
        document.querySelector('#msg').textContent = error;
    }

    removeSpinner();
}

function showSpinner() {
    document.querySelector('.loading').classList.add('show');
}

function removeSpinner() {
    document.querySelector('.loading').classList.remove('show');
}

document.querySelector('#image-form')
    .addEventListener('submit', onSubmit);