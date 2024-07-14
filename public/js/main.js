function onSubmit(event) {
    event.preventDefault();

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

        const data = await response.json();

        console.log({data});

    } catch (error) {
        document.querySelector('.msg').textContent = error;
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