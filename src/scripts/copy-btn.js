// public/copyCode.js

document.addEventListener('astro:page-load', () => {
    const codeBlocks = document.querySelectorAll('pre > code');

    const copyIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
    const checkIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

    codeBlocks.forEach((block) => {
        // Crear el botón de copiar
        const button = document.createElement('button');
        button.classList.add('copy-button');

        // Crear el icono de copiar (inicial)
        button.innerHTML = copyIcon;

        // Agregar el botón al bloque de código
        block.parentNode.insertBefore(button, block);

        // Evento al hacer clic en el botón
        button.addEventListener('click', () => {
            const code = block.innerText; // Obtener el código del bloque
            navigator.clipboard.writeText(code).then(() => {
                // Cambiar el icono a check
                button.innerHTML = checkIcon;
                setTimeout(() => {
                    // Restaurar el icono de copiar después de 2 segundos
                    button.innerHTML = copyIcon;
                }, 2000);
            });
        });
    });
});
