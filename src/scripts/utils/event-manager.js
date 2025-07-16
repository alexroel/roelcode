/**
 * Utilidades para manejo de eventos con limpieza automática y manejo de errores
 */

/**
 * Maneja event listeners con limpieza automática para evitar duplicados
 * @param {HTMLElement} element - El elemento DOM
 * @param {string} eventType - Tipo de evento (click, change, etc.)
 * @param {Function} handler - Función manejadora del evento
 * @throws {Error} Si el elemento no es válido o falta el handler
 */
export function attachEventListener(element, eventType, handler) {
  try {
    if (!element || !element.addEventListener) {
      throw new Error(`Elemento inválido para attachEventListener: ${element}`);
    }

    if (typeof handler !== "function") {
      throw new Error(
        `Handler debe ser una función, recibido: ${typeof handler}`
      );
    }

    if (!eventType || typeof eventType !== "string") {
      throw new Error(
        `EventType debe ser un string válido, recibido: ${eventType}`
      );
    }

    // Eliminar event listeners existentes para evitar duplicados
    const existingHandler = element[`__${eventType}Handler`];
    if (existingHandler) {
      element.removeEventListener(eventType, existingHandler);
    }

    // Wrapper para manejo de errores en el handler
    const errorSafeHandler = (event) => {
      try {
        handler(event);
      } catch (error) {
        console.error(`Error en event handler para ${eventType}:`, error);
        // Opcional: reportar error a servicio de monitoreo
        window.dispatchEvent(
          new CustomEvent("unhandledException", {
            detail: { error, eventType, element },
          })
        );
      }
    };

    // Agregar nuevo event listener y guardarlo en el elemento
    element[`__${eventType}Handler`] = errorSafeHandler;
    element.addEventListener(eventType, errorSafeHandler);
  } catch (error) {
    console.error("Error al adjuntar event listener:", error);
    throw error;
  }
}

/**
 * Remueve event listeners de manera segura
 * @param {HTMLElement} element - El elemento DOM
 * @param {string} eventType - Tipo de evento a remover
 */
export function removeEventListener(element, eventType) {
  try {
    if (!element || !element.removeEventListener) {
      console.warn(`Elemento inválido para removeEventListener: ${element}`);
      return;
    }

    const existingHandler = element[`__${eventType}Handler`];
    if (existingHandler) {
      element.removeEventListener(eventType, existingHandler);
      delete element[`__${eventType}Handler`];
    }
  } catch (error) {
    console.error("Error al remover event listener:", error);
  }
}

/**
 * Remueve todos los event listeners de un elemento
 * @param {HTMLElement} element - El elemento DOM
 */
export function removeAllEventListeners(element) {
  try {
    if (!element) {
      console.warn("Elemento inválido para removeAllEventListeners");
      return;
    }

    // Buscar todas las propiedades que contengan handlers
    Object.keys(element).forEach((key) => {
      if (key.endsWith("Handler")) {
        const eventType = key.replace("__", "").replace("Handler", "");
        removeEventListener(element, eventType);
      }
    });
  } catch (error) {
    console.error("Error al remover todos los event listeners:", error);
  }
}

/**
 * Adjunta múltiples event listeners a un elemento
 * @param {HTMLElement} element - El elemento DOM
 * @param {Object} eventHandlers - Objeto con pares eventType: handler
 */
export function attachMultipleEventListeners(element, eventHandlers) {
  try {
    if (!element || typeof eventHandlers !== "object") {
      throw new Error("Elemento o eventHandlers inválidos");
    }

    Object.entries(eventHandlers).forEach(([eventType, handler]) => {
      attachEventListener(element, eventType, handler);
    });
  } catch (error) {
    console.error("Error al adjuntar múltiples event listeners:", error);
    throw error;
  }
}
