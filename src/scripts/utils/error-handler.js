/**
 * Sistema global de manejo de errores y logging
 */

// Configuración de logging
const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
};

// Configuración por defecto
const DEFAULT_CONFIG = {
  logLevel: LOG_LEVELS.WARN,
  enableErrorReporting: false,
  maxErrorsToStore: 50,
  errorReportingEndpoint: null,
};

let errorConfig = { ...DEFAULT_CONFIG };

/**
 * Configura el sistema de manejo de errores
 * @param {Object} config - Configuración personalizada
 */
export function configureErrorHandling(config = {}) {
  try {
    errorConfig = { ...errorConfig, ...config };
    console.log("Sistema de manejo de errores configurado:", errorConfig);
  } catch (error) {
    console.error("Error al configurar sistema de errores:", error);
  }
}

/**
 * Logger con diferentes niveles
 */
export const logger = {
  error: (message, data = null) => {
    if (errorConfig.logLevel >= LOG_LEVELS.ERROR) {
      console.error(`[ERROR] ${message}`, data);
      storeError({ level: "error", message, data, timestamp: Date.now() });
    }
  },

  warn: (message, data = null) => {
    if (errorConfig.logLevel >= LOG_LEVELS.WARN) {
      console.warn(`[WARN] ${message}`, data);
    }
  },

  info: (message, data = null) => {
    if (errorConfig.logLevel >= LOG_LEVELS.INFO) {
      console.info(`[INFO] ${message}`, data);
    }
  },

  debug: (message, data = null) => {
    if (errorConfig.logLevel >= LOG_LEVELS.DEBUG) {
      console.debug(`[DEBUG] ${message}`, data);
    }
  },
};

/**
 * Almacena errores para análisis posterior
 * @param {Object} errorData - Datos del error
 */
function storeError(errorData) {
  try {
    if (typeof localStorage === "undefined") return;

    const storedErrors = JSON.parse(localStorage.getItem("app_errors") || "[]");
    storedErrors.push(errorData);

    // Mantener solo los últimos N errores
    if (storedErrors.length > errorConfig.maxErrorsToStore) {
      storedErrors.splice(
        0,
        storedErrors.length - errorConfig.maxErrorsToStore
      );
    }

    localStorage.setItem("app_errors", JSON.stringify(storedErrors));
  } catch (error) {
    console.warn("No se pudo almacenar error:", error);
  }
}

/**
 * Obtiene errores almacenados
 * @returns {Array} Array de errores
 */
export function getStoredErrors() {
  try {
    if (typeof localStorage === "undefined") return [];
    return JSON.parse(localStorage.getItem("app_errors") || "[]");
  } catch (error) {
    console.warn("No se pudieron obtener errores almacenados:", error);
    return [];
  }
}

/**
 * Limpia errores almacenados
 */
export function clearStoredErrors() {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("app_errors");
    }
  } catch (error) {
    console.warn("No se pudieron limpiar errores almacenados:", error);
  }
}

/**
 * Maneja errores no capturados globalmente
 */
function setupGlobalErrorHandling() {
  // Errores de JavaScript no capturados
  window.addEventListener("error", (event) => {
    const errorData = {
      type: "javascript_error",
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error ? event.error.stack : null,
      timestamp: Date.now(),
    };

    logger.error("Error JavaScript no capturado", errorData);

    if (errorConfig.enableErrorReporting) {
      reportError(errorData);
    }
  });

  // Promesas rechazadas no manejadas
  window.addEventListener("unhandledrejection", (event) => {
    const errorData = {
      type: "unhandled_promise_rejection",
      message: event.reason ? event.reason.toString() : "Promise rejected",
      stack: event.reason && event.reason.stack ? event.reason.stack : null,
      timestamp: Date.now(),
    };

    logger.error("Promise rechazada no manejada", errorData);

    if (errorConfig.enableErrorReporting) {
      reportError(errorData);
    }
  });

  // Errores personalizados de la aplicación
  window.addEventListener("unhandledException", (event) => {
    const errorData = {
      type: "application_error",
      message: event.detail?.error?.message || "Error de aplicación",
      context: event.detail,
      timestamp: Date.now(),
    };

    logger.error("Error de aplicación", errorData);

    if (errorConfig.enableErrorReporting) {
      reportError(errorData);
    }
  });
}

/**
 * Reporta errores a un endpoint externo (si está configurado)
 * @param {Object} errorData - Datos del error
 */
async function reportError(errorData) {
  try {
    if (!errorConfig.errorReportingEndpoint) return;

    const response = await fetch(errorConfig.errorReportingEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...errorData,
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: Date.now(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Error reporting failed: ${response.status}`);
    }
  } catch (error) {
    console.warn("No se pudo reportar error al servidor:", error);
  }
}

/**
 * Wrapper para funciones que puede capturar errores
 * @param {Function} fn - Función a wrappear
 * @param {string} context - Contexto para el logging
 * @returns {Function} Función wrapped
 */
export function withErrorHandling(fn, context = "Unknown") {
  return function wrappedFunction(...args) {
    try {
      const result = fn.apply(this, args);

      // Si es una Promise, capturar errores de rechazo
      if (result && typeof result.catch === "function") {
        return result.catch((error) => {
          logger.error(`Error en ${context} (Promise)`, { error, args });
          throw error;
        });
      }

      return result;
    } catch (error) {
      logger.error(`Error en ${context}`, { error, args });
      throw error;
    }
  };
}

/**
 * Crea un wrapper de error para funciones async
 * @param {Function} fn - Función async
 * @param {string} context - Contexto para el logging
 * @returns {Function} Función wrapped
 */
export function withAsyncErrorHandling(fn, context = "Unknown") {
  return async function wrappedAsyncFunction(...args) {
    try {
      return await fn.apply(this, args);
    } catch (error) {
      logger.error(`Error async en ${context}`, { error, args });
      throw error;
    }
  };
}

/**
 * Inicializa el sistema de manejo de errores
 */
export function initErrorHandling(config = {}) {
  try {
    configureErrorHandling(config);
    setupGlobalErrorHandling();

    logger.info("Sistema de manejo de errores inicializado");

    // Limpiar errores antiguos al inicializar
    const storedErrors = getStoredErrors();
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentErrors = storedErrors.filter(
      (error) => error.timestamp > sevenDaysAgo
    );

    if (recentErrors.length !== storedErrors.length) {
      localStorage.setItem("app_errors", JSON.stringify(recentErrors));
      logger.info(
        `Limpiados ${
          storedErrors.length - recentErrors.length
        } errores antiguos`
      );
    }
  } catch (error) {
    console.error("Error al inicializar sistema de manejo de errores:", error);
  }
}

// Auto-inicializar con configuración por defecto
if (typeof window !== "undefined") {
  // Inicializar cuando el DOM esté listo
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => initErrorHandling());
  } else {
    initErrorHandling();
  }
}

export { LOG_LEVELS };
