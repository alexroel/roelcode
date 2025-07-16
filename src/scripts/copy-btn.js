/**
 * Script refactorizado para botones de copiar código con manejo de errores
 */

import { attachEventListener } from "./utils/event-manager.js";
import {
  safeQuerySelectorAll,
  onDOMReady,
  safeAddClass,
} from "./utils/dom-utils.js";

// Iconos SVG
const COPY_ICON =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Copiar código"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';

const CHECK_ICON =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Copiado"><polyline points="20 6 9 17 4 12"></polyline></svg>';

const ERROR_ICON =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-label="Error al copiar"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';

/**
 * Verifica si la API de clipboard está disponible
 * @returns {boolean} true si está disponible
 */
function isClipboardAvailable() {
  try {
    return (
      navigator &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    );
  } catch (error) {
    console.warn("API de clipboard no disponible:", error);
    return false;
  }
}

/**
 * Copia texto al clipboard usando la API moderna
 * @param {string} text - Texto a copiar
 * @returns {Promise<boolean>} true si se copió exitosamente
 */
async function copyToClipboard(text) {
  try {
    if (!text || typeof text !== "string") {
      throw new Error("Texto inválido para copiar");
    }

    if (isClipboardAvailable()) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback para navegadores antiguos
      return copyToClipboardFallback(text);
    }
  } catch (error) {
    console.error("Error al copiar al clipboard:", error);

    // Intentar fallback si la API principal falla
    try {
      return copyToClipboardFallback(text);
    } catch (fallbackError) {
      console.error("Error en fallback de clipboard:", fallbackError);
      return false;
    }
  }
}

/**
 * Fallback para copiar al clipboard usando APIs modernas sin execCommand
 * @param {string} text - Texto a copiar
 * @returns {boolean} true si se copió exitosamente
 */
function copyToClipboardFallback(text) {
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    textArea.setAttribute("aria-hidden", "true");

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    let successful = false;

    // Intentar con ClipboardEvent moderna
    try {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(textArea);
      selection.removeAllRanges();
      selection.addRange(range);

      // Usar ClipboardEvent en lugar de KeyboardEvent
      const clipboardEvent = new ClipboardEvent("copy", {
        bubbles: true,
        cancelable: true,
        clipboardData: new DataTransfer(),
      });

      if (clipboardEvent.clipboardData) {
        clipboardEvent.clipboardData.setData("text/plain", text);
        document.dispatchEvent(clipboardEvent);
        successful = true;
      } else {
        // Si no hay soporte para ClipboardEvent, dar instrucciones al usuario
        console.info("Texto seleccionado. Usa Ctrl+C para copiar.");
        successful = false;
      }
    } catch (modernErr) {
      // Último recurso: solo mostrar mensaje al usuario
      console.warn(
        "Funcionalidad de clipboard no disponible en este navegador"
      );
      console.info("Texto seleccionado. Usa Ctrl+C para copiar manualmente.");
      successful = false;
    }

    document.body.removeChild(textArea);
    return successful;
  } catch (error) {
    console.error("Error en fallback de clipboard:", error);
    return false;
  }
}

/**
 * Crea un botón de copiar para un bloque de código
 * @param {HTMLElement} codeBlock - Elemento del bloque de código
 * @returns {HTMLElement|null} Botón creado o null si hay error
 */
function createCopyButton(codeBlock) {
  try {
    if (!codeBlock || !codeBlock.parentNode) {
      throw new Error("Bloque de código inválido");
    }

    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", "Copiar código");
    button.setAttribute("title", "Copiar código");

    safeAddClass(button, "copy-button");
    button.innerHTML = COPY_ICON;

    // Configurar event listener
    const clickHandler = async (e) => {
      e.preventDefault();

      try {
        const code = codeBlock.innerText || codeBlock.textContent || "";

        if (!code.trim()) {
          throw new Error("No hay código para copiar");
        }

        // Mostrar estado de carga
        button.innerHTML = "⏳";
        button.disabled = true;

        const success = await copyToClipboard(code);

        if (success) {
          // Mostrar éxito
          button.innerHTML = CHECK_ICON;

          // Disparar evento personalizado
          window.dispatchEvent(
            new CustomEvent("codeCopied", {
              detail: {
                code: code.length > 100 ? code.substring(0, 100) + "..." : code,
              },
            })
          );

          // Restaurar después de 2 segundos
          setTimeout(() => {
            button.innerHTML = COPY_ICON;
            button.disabled = false;
          }, 2000);
        } else {
          // Mostrar error
          button.innerHTML = ERROR_ICON;

          // Restaurar después de 3 segundos
          setTimeout(() => {
            button.innerHTML = COPY_ICON;
            button.disabled = false;
          }, 3000);
        }
      } catch (error) {
        console.error("Error al copiar código:", error);

        // Mostrar error visual
        button.innerHTML = ERROR_ICON;
        setTimeout(() => {
          button.innerHTML = COPY_ICON;
          button.disabled = false;
        }, 3000);
      }
    };

    attachEventListener(button, "click", clickHandler);

    return button;
  } catch (error) {
    console.error("Error al crear botón de copiar:", error);
    return null;
  }
}

/**
 * Inicializa botones de copiar para todos los bloques de código
 */
function initializeCopyButtons() {
  try {
    const codeBlocks = safeQuerySelectorAll("pre > code");

    if (codeBlocks.length === 0) {
      console.log("No se encontraron bloques de código");
      return;
    }

    let buttonsCreated = 0;

    codeBlocks.forEach((codeBlock) => {
      try {
        // Verificar si ya tiene botón de copiar
        const existingButton =
          codeBlock.parentNode.querySelector(".copy-button");
        if (existingButton) {
          console.log("Bloque de código ya tiene botón de copiar");
          return;
        }

        const button = createCopyButton(codeBlock);
        if (button) {
          codeBlock.parentNode.insertBefore(button, codeBlock);
          buttonsCreated++;
        }
      } catch (error) {
        console.error("Error al procesar bloque de código:", error);
      }
    });

    console.log(
      `Inicializados ${buttonsCreated} botones de copiar en ${codeBlocks.length} bloques de código`
    );
  } catch (error) {
    console.error("Error al inicializar botones de copiar:", error);
  }
}

/**
 * Re-inicializa botones de copiar (útil para contenido dinámico)
 */
function reinitializeCopyButtons() {
  try {
    initializeCopyButtons();
  } catch (error) {
    console.error("Error al re-inicializar botones de copiar:", error);
  }
}

// Inicializar cuando el DOM esté listo
onDOMReady(initializeCopyButtons);

// Para compatibilidad con Astro
document.addEventListener("astro:page-load", () => {
  try {
    initializeCopyButtons();
  } catch (error) {
    console.error("Error en astro:page-load:", error);
  }
});

// Exponer funciones globalmente
window.copyButtons = {
  init: initializeCopyButtons,
  reinit: reinitializeCopyButtons,
  isClipboardAvailable,
};

export { initializeCopyButtons, reinitializeCopyButtons, copyToClipboard };
