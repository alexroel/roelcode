/**
 * Manejo refactorizado de toggles de secciones con manejo de errores
 */

import {
  attachEventListener,
  removeEventListener,
} from "./utils/event-manager.js";
import {
  safeQuerySelectorAll,
  safeQuerySelector,
  onDOMReady,
} from "./utils/dom-utils.js";

/**
 * Inicializa los toggles de secciones
 */
function initSectionToggles() {
  try {
    const sectionButtons = safeQuerySelectorAll(".section-toggle");

    if (sectionButtons.length === 0) {
      console.log("No se encontraron botones de sección");
      return;
    }

    sectionButtons.forEach((button) => {
      const clickHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
          const content = button.nextElementSibling;
          const icon = safeQuerySelector(".section-icon", button);

          if (!content) {
            console.warn("No se encontró contenido para el botón de sección");
            return;
          }

          const isHidden = content.classList.contains("hidden");

          if (isHidden) {
            content.classList.remove("hidden");
            if (icon) icon.classList.add("rotate-180");
          } else {
            content.classList.add("hidden");
            if (icon) icon.classList.remove("rotate-180");
          }
        } catch (error) {
          console.error("Error al manejar toggle de sección:", error);
        }
      };

      attachEventListener(button, "click", clickHandler);
    });

    console.log(`Inicializados ${sectionButtons.length} toggles de sección`);
  } catch (error) {
    console.error("Error al inicializar toggles de sección:", error);
  }
}

/**
 * Limpia los event listeners de secciones
 */
function cleanupSectionToggles() {
  try {
    const sectionButtons = safeQuerySelectorAll(".section-toggle");

    sectionButtons.forEach((button) => {
      removeEventListener(button, "click");
    });

    console.log("Limpiados event listeners de secciones");
  } catch (error) {
    console.error("Error al limpiar toggles de sección:", error);
  }
}

/**
 * Re-inicializa los toggles de secciones (útil para contenido dinámico)
 */
function reinitSectionToggles() {
  try {
    cleanupSectionToggles();
    initSectionToggles();
  } catch (error) {
    console.error("Error al re-inicializar toggles de sección:", error);
  }
}

// Inicializar cuando el DOM esté listo
onDOMReady(initSectionToggles);

// Exponer funciones globalmente para uso en páginas
window.sectionToggles = {
  init: initSectionToggles,
  cleanup: cleanupSectionToggles,
  reinit: reinitSectionToggles,
};

// Limpiar al salir de la página
window.addEventListener("beforeunload", cleanupSectionToggles);

export { initSectionToggles, cleanupSectionToggles, reinitSectionToggles };
