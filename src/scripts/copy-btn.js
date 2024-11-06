// public/copyCode.js

document.addEventListener('astro:page-load', () => {
    const codeBlocks = document.querySelectorAll('pre > code');

    codeBlocks.forEach((block) => {
        // Create the copy button
        const button = document.createElement('button');
        button.classList.add('copy-button');

        // Add the copy icon (initial)
        button.innerHTML = 'Copiar';

        // Add the button to the code block
        block.parentNode.insertBefore(button, block);

        // Event when clicking the button
        button.addEventListener('click', () => {
            const code = block.innerText; // Get the code from the block
            navigator.clipboard.writeText(code).then(() => {
                // Change the button content to "copied" with the check icon
                button.innerHTML = '<i class="bx bxs-check-square"></i> Copiado!';
                setTimeout(() => {
                    // Restore the copy icon after 2 seconds
                    button.innerHTML = 'Copiar';
                }, 2000);
            });
        });
    });
});
