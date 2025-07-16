/**
 * Theme toggle refactorizado con manejo de errores mejorado
 */

import {
  getStorageItem,
  setStorageItem,
  isStorageAvailable,
} from "./utils/storage-manager.js";
import { attachEventListener } from "./utils/event-manager.js";
import {
  safeQuerySelector,
  safeAddClass,
  safeRemoveClass,
  safeHasClass,
} from "./utils/dom-utils.js";

const THEME_KEY = "theme";
const THEME_DARK = "dark";
const THEME_LIGHT = "light";

/**
 * Obtiene el tema actual de manera segura
 * @returns {string} 'dark' o 'light'
 */
function getCurrentTheme() {
  try {
    // Intentar obtener del localStorage primero
    if (isStorageAvailable()) {
      const savedTheme = getStorageItem(THEME_KEY);
      if (savedTheme === THEME_DARK || savedTheme === THEME_LIGHT) {
        return savedTheme;
      }
    }

    // Fallback a preferencia del sistema
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return THEME_DARK;
    }

    return THEME_LIGHT;
  } catch (error) {
    console.error("Error al obtener tema actual:", error);
    return THEME_LIGHT;
  }
}

/**
 * Aplica el tema al documento
 * @param {string} theme - 'dark' o 'light'
 * @returns {boolean} true si se aplicó exitosamente
 */
function applyTheme(theme) {
  try {
    if (!document.documentElement) {
      throw new Error("document.documentElement no está disponible");
    }

    if (theme !== THEME_DARK && theme !== THEME_LIGHT) {
      throw new Error(
        `Tema inválido: ${theme}. Debe ser '${THEME_DARK}' o '${THEME_LIGHT}'`
      );
    }

    if (theme === THEME_DARK) {
      safeAddClass(document.documentElement, "dark");
    } else {
      safeRemoveClass(document.documentElement, "dark");
    }

    // Guardar tema en localStorage
    if (isStorageAvailable()) {
      setStorageItem(THEME_KEY, theme);
    }

    // Disparar evento personalizado
    window.dispatchEvent(
      new CustomEvent("themeChanged", {
        detail: { theme },
      })
    );

    return true;
  } catch (error) {
    console.error(`Error al aplicar tema ${theme}:`, error);
    return false;
  }
}

/**
 * Actualiza los iconos del botón de tema
 * @param {boolean} isDark - Si el tema actual es dark
 */
function updateThemeIcons(isDark) {
  try {
    const moonIcon = safeQuerySelector("#theme-toggle-moon-icon");
    const sunIcon = safeQuerySelector("#theme-toggle-sun-icon");

    if (!moonIcon || !sunIcon) {
      console.warn("No se encontraron iconos de tema");
      return;
    }

    if (isDark) {
      safeAddClass(moonIcon, "hidden");
      safeRemoveClass(sunIcon, "hidden");
    } else {
      safeRemoveClass(moonIcon, "hidden");
      safeAddClass(sunIcon, "hidden");
    }
  } catch (error) {
    console.error("Error al actualizar iconos de tema:", error);
  }
}

/**
 * Configura el toggle de tema
 */
function setupThemeToggle() {
  try {
    const themeToggle = safeQuerySelector("#theme-toggle");

    if (!themeToggle) {
      console.warn("No se encontró botón de toggle de tema");
      return;
    }

    // Aplicar tema inicial
    const currentTheme = getCurrentTheme();
    applyTheme(currentTheme);
    updateThemeIcons(currentTheme === THEME_DARK);

    // Configurar event listener para el toggle
    const toggleHandler = (e) => {
      e.preventDefault();

      try {
        const isDark = safeHasClass(document.documentElement, "dark");
        const newTheme = isDark ? THEME_LIGHT : THEME_DARK;

        const success = applyTheme(newTheme);
        if (success) {
          updateThemeIcons(newTheme === THEME_DARK);
          console.log(`Tema cambiado a: ${newTheme}`);
        }
      } catch (error) {
        console.error("Error al cambiar tema:", error);
      }
    };

    attachEventListener(themeToggle, "click", toggleHandler);

    console.log("Theme toggle configurado exitosamente");
  } catch (error) {
    console.error("Error al configurar theme toggle:", error);
  }
}

/**
 * Inicializa el sistema de temas
 */
function initThemeSystem() {
  try {
    // Aplicar tema inicial lo antes posible
    const currentTheme = getCurrentTheme();
    applyTheme(currentTheme);

    // Configurar toggle cuando el DOM esté listo
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", setupThemeToggle);
    } else {
      setupThemeToggle();
    }
  } catch (error) {
    console.error("Error al inicializar sistema de temas:", error);
  }
}

/**
 * Escucha cambios en la preferencia del sistema
 */
function listenToSystemThemeChanges() {
  try {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleSystemThemeChange = (e) => {
        try {
          // Solo aplicar si no hay tema guardado explícitamente
          const savedTheme = getStorageItem(THEME_KEY);
          if (!savedTheme) {
            const newTheme = e.matches ? THEME_DARK : THEME_LIGHT;
            applyTheme(newTheme);
            updateThemeIcons(newTheme === THEME_DARK);
            console.log(`Tema actualizado por cambio del sistema: ${newTheme}`);
          }
        } catch (error) {
          console.error("Error al manejar cambio de tema del sistema:", error);
        }
      };

      mediaQuery.addEventListener("change", handleSystemThemeChange);
    }
  } catch (error) {
    console.error("Error al configurar listener de tema del sistema:", error);
  }
}

// Inicializar inmediatamente
initThemeSystem();

// Escuchar cambios del sistema
listenToSystemThemeChanges();

// Para compatibilidad con Astro
document.addEventListener("astro:page-load", () => {
  try {
    setupThemeToggle();
  } catch (error) {
    console.error("Error en astro:page-load:", error);
  }
});

// Exponer funciones globalmente
window.themeSystem = {
  getCurrentTheme,
  applyTheme,
  setupToggle: setupThemeToggle,
  init: initThemeSystem,
};

export { getCurrentTheme, applyTheme, setupThemeToggle, initThemeSystem };
