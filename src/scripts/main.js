/**
 * Script principal que inicializa todos los sistemas refactorizados
 */

// Importar sistemas principales
import { initErrorHandling, LOG_LEVELS } from "./utils/error-handler.js";
import { initThemeSystem } from "./theme-toggle.js";
import { initializeCopyButtons } from "./copy-btn.js";
import { initSectionToggles } from "./section-toggles-refactored.js";
import { initCourseProgress } from "./course-progress-refactored.js";
import { cleanOldStorageItems } from "./utils/storage-manager.js";
import { setupGlobalToastAPI } from "./utils/toast-manager.js";

/**
 * Configuración de la aplicación
 */
const APP_CONFIG = {
  // Configuración de errores
  errorHandling: {
    logLevel: LOG_LEVELS.WARN,
    enableErrorReporting: false,
    maxErrorsToStore: 50,
  },

  // Configuración de limpieza de datos
  storage: {
    cleanupOnInit: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
  },
};

/**
 * Inicializa todos los sistemas de la aplicación
 */
async function initializeApp() {
  try {
    console.log("🚀 Inicializando aplicación Roelcode...");

    // 1. Inicializar manejo de errores primero
    initErrorHandling(APP_CONFIG.errorHandling);

    // 2. Configurar API global de notificaciones
    setupGlobalToastAPI();

    // 3. Limpiar datos antiguos si está habilitado
    if (APP_CONFIG.storage.cleanupOnInit) {
      cleanOldStorageItems("courseProgress", APP_CONFIG.storage.maxAge);
      cleanOldStorageItems("favorites", APP_CONFIG.storage.maxAge);
    }

    // 4. Inicializar sistema de temas
    initThemeSystem();

    // 5. Inicializar funcionalidades basadas en contenido
    initializeCopyButtons();
    initSectionToggles();
    initCourseProgress();

    console.log("✅ Aplicación inicializada exitosamente");

    // Disparar evento de aplicación lista
    window.dispatchEvent(
      new CustomEvent("appInitialized", {
        detail: { timestamp: Date.now() },
      })
    );
  } catch (error) {
    console.error("❌ Error al inicializar aplicación:", error);

    // Intentar inicialización mínima
    try {
      console.log("🔄 Intentando inicialización mínima...");
      initThemeSystem();
      initializeCopyButtons();
    } catch (fallbackError) {
      console.error("❌ Error en inicialización mínima:", fallbackError);
    }
  }
}

/**
 * Re-inicializa sistemas para contenido dinámico
 */
function reinitializeSystems() {
  try {
    console.log("🔄 Re-inicializando sistemas...");

    // Re-inicializar solo los sistemas que manejan contenido dinámico
    window.copyButtons?.reinit();
    window.sectionToggles?.reinit();
    window.courseProgress?.init();

    console.log("✅ Sistemas re-inicializados");
  } catch (error) {
    console.error("❌ Error al re-inicializar sistemas:", error);
  }
}

/**
 * Maneja la navegación de Astro
 */
function setupAstroNavigation() {
  // Para páginas que se cargan por primera vez
  document.addEventListener("DOMContentLoaded", initializeApp);

  // Para navegación SPA de Astro
  document.addEventListener("astro:page-load", () => {
    try {
      reinitializeSystems();
    } catch (error) {
      console.error("Error en astro:page-load:", error);
    }
  });

  // Limpiar recursos al salir de la página
  document.addEventListener("astro:before-preparation", () => {
    try {
      // Limpiar event listeners si es necesario
      window.sectionToggles?.cleanup();
      window.courseProgress?.cleanup();
    } catch (error) {
      console.error("Error en limpieza de página:", error);
    }
  });
}

/**
 * Expone API global para debugging y uso externo
 */
function setupGlobalAPI() {
  window.RoelcodeApp = {
    // Métodos de control
    init: initializeApp,
    reinit: reinitializeSystems,

    // Acceso a sistemas
    theme: window.themeSystem,
    copyButtons: window.copyButtons,
    sectionToggles: window.sectionToggles,
    courseProgress: window.courseProgress,

    // Configuración
    config: APP_CONFIG,

    // Utilidades de debugging
    debug: {
      getStoredErrors: () => window.errorHandler?.getStoredErrors(),
      clearErrors: () => window.errorHandler?.clearStoredErrors(),
      getConfig: () => APP_CONFIG,
    },
  };
}

/**
 * Maneja el estado de carga de la aplicación
 */
function setupLoadingStates() {
  // Mostrar indicador de carga si existe
  const loadingIndicator = document.querySelector(".app-loading");

  window.addEventListener("appInitialized", () => {
    if (loadingIndicator) {
      loadingIndicator.style.display = "none";
    }

    // Añadir clase para indicar que la app está lista
    document.body.classList.add("app-ready");
  });
}

// Configurar todo cuando el script se carga
setupAstroNavigation();
setupGlobalAPI();
setupLoadingStates();

// Si el DOM ya está listo, inicializar inmediatamente
if (document.readyState !== "loading") {
  initializeApp();
}

// Exportar funciones principales para uso en otros módulos
export { initializeApp, reinitializeSystems, APP_CONFIG };
