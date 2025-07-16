/**
 * Utilidades generales para DOM y validación con manejo de errores
 */

/**
 * Busca un elemento en el DOM de manera segura
 * @param {string} selector - Selector CSS
 * @param {HTMLElement} context - Contexto de búsqueda (document por defecto)
 * @returns {HTMLElement|null} Elemento encontrado o null
 */
export function safeQuerySelector(selector, context = document) {
  try {
    if (!selector || typeof selector !== "string") {
      throw new Error(
        `Selector debe ser un string válido, recibido: ${selector}`
      );
    }

    if (!context || !context.querySelector) {
      throw new Error("Contexto de búsqueda inválido");
    }

    return context.querySelector(selector);
  } catch (error) {
    console.error(
      `Error al buscar elemento con selector "${selector}":`,
      error
    );
    return null;
  }
}

/**
 * Busca múltiples elementos en el DOM de manera segura
 * @param {string} selector - Selector CSS
 * @param {HTMLElement} context - Contexto de búsqueda (document por defecto)
 * @returns {NodeList|Array} Lista de elementos encontrados
 */
export function safeQuerySelectorAll(selector, context = document) {
  try {
    if (!selector || typeof selector !== "string") {
      throw new Error(
        `Selector debe ser un string válido, recibido: ${selector}`
      );
    }

    if (!context || !context.querySelectorAll) {
      throw new Error("Contexto de búsqueda inválido");
    }

    return context.querySelectorAll(selector);
  } catch (error) {
    console.error(
      `Error al buscar elementos con selector "${selector}":`,
      error
    );
    return [];
  }
}

/**
 * Obtiene un atributo de un elemento de manera segura
 * @param {HTMLElement} element - Elemento DOM
 * @param {string} attributeName - Nombre del atributo
 * @param {string} defaultValue - Valor por defecto
 * @returns {string} Valor del atributo o valor por defecto
 */
export function safeGetAttribute(element, attributeName, defaultValue = "") {
  try {
    if (!element || !element.getAttribute) {
      throw new Error("Elemento inválido");
    }

    if (!attributeName || typeof attributeName !== "string") {
      throw new Error(
        `AttributeName debe ser un string válido, recibido: ${attributeName}`
      );
    }

    const value = element.getAttribute(attributeName);
    return value !== null ? value : defaultValue;
  } catch (error) {
    console.error(`Error al obtener atributo "${attributeName}":`, error);
    return defaultValue;
  }
}

/**
 * Establece un atributo de un elemento de manera segura
 * @param {HTMLElement} element - Elemento DOM
 * @param {string} attributeName - Nombre del atributo
 * @param {string} value - Valor del atributo
 * @returns {boolean} true si se estableció exitosamente
 */
export function safeSetAttribute(element, attributeName, value) {
  try {
    if (!element || !element.setAttribute) {
      throw new Error("Elemento inválido");
    }

    if (!attributeName || typeof attributeName !== "string") {
      throw new Error(
        `AttributeName debe ser un string válido, recibido: ${attributeName}`
      );
    }

    element.setAttribute(attributeName, String(value));
    return true;
  } catch (error) {
    console.error(`Error al establecer atributo "${attributeName}":`, error);
    return false;
  }
}

/**
 * Añade una clase CSS de manera segura
 * @param {HTMLElement} element - Elemento DOM
 * @param {string} className - Nombre de la clase
 * @returns {boolean} true si se añadió exitosamente
 */
export function safeAddClass(element, className) {
  try {
    if (!element || !element.classList) {
      throw new Error("Elemento inválido");
    }

    if (!className || typeof className !== "string") {
      throw new Error(
        `ClassName debe ser un string válido, recibido: ${className}`
      );
    }

    element.classList.add(className);
    return true;
  } catch (error) {
    console.error(`Error al añadir clase "${className}":`, error);
    return false;
  }
}

/**
 * Remueve una clase CSS de manera segura
 * @param {HTMLElement} element - Elemento DOM
 * @param {string} className - Nombre de la clase
 * @returns {boolean} true si se removió exitosamente
 */
export function safeRemoveClass(element, className) {
  try {
    if (!element || !element.classList) {
      throw new Error("Elemento inválido");
    }

    if (!className || typeof className !== "string") {
      throw new Error(
        `ClassName debe ser un string válido, recibido: ${className}`
      );
    }

    element.classList.remove(className);
    return true;
  } catch (error) {
    console.error(`Error al remover clase "${className}":`, error);
    return false;
  }
}

/**
 * Alterna una clase CSS de manera segura
 * @param {HTMLElement} element - Elemento DOM
 * @param {string} className - Nombre de la clase
 * @returns {boolean} true si la clase está presente después de alternar
 */
export function safeToggleClass(element, className) {
  try {
    if (!element || !element.classList) {
      throw new Error("Elemento inválido");
    }

    if (!className || typeof className !== "string") {
      throw new Error(
        `ClassName debe ser un string válido, recibido: ${className}`
      );
    }

    return element.classList.toggle(className);
  } catch (error) {
    console.error(`Error al alternar clase "${className}":`, error);
    return false;
  }
}

/**
 * Verifica si un elemento tiene una clase específica
 * @param {HTMLElement} element - Elemento DOM
 * @param {string} className - Nombre de la clase
 * @returns {boolean} true si el elemento tiene la clase
 */
export function safeHasClass(element, className) {
  try {
    if (!element || !element.classList) {
      return false;
    }

    if (!className || typeof className !== "string") {
      return false;
    }

    return element.classList.contains(className);
  } catch (error) {
    console.error(`Error al verificar clase "${className}":`, error);
    return false;
  }
}

/**
 * Ejecuta una función cuando el DOM esté listo
 * @param {Function} callback - Función a ejecutar
 */
export function onDOMReady(callback) {
  try {
    if (typeof callback !== "function") {
      throw new Error("Callback debe ser una función");
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        try {
          callback();
        } catch (error) {
          console.error("Error en callback de DOMContentLoaded:", error);
        }
      });
    } else {
      // DOM ya está listo
      setTimeout(() => {
        try {
          callback();
        } catch (error) {
          console.error("Error en callback inmediato:", error);
        }
      }, 0);
    }
  } catch (error) {
    console.error("Error en onDOMReady:", error);
  }
}

/**
 * Debounce función para limitar la frecuencia de ejecución
 * @param {Function} func - Función a debounce
 * @param {number} wait - Tiempo de espera en ms
 * @param {boolean} immediate - Si ejecutar inmediatamente
 * @returns {Function} Función debounced
 */
export function debounce(func, wait, immediate = false) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) {
        try {
          func.apply(this, args);
        } catch (error) {
          console.error("Error en función debounced:", error);
        }
      }
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      try {
        func.apply(this, args);
      } catch (error) {
        console.error("Error en función debounced inmediata:", error);
      }
    }
  };
}

/**
 * Throttle función para limitar la frecuencia de ejecución
 * @param {Function} func - Función a throttle
 * @param {number} limit - Límite de tiempo en ms
 * @returns {Function} Función throttled
 */
export function throttle(func, limit) {
  let inThrottle;

  return function executedFunction(...args) {
    if (!inThrottle) {
      try {
        func.apply(this, args);
      } catch (error) {
        console.error("Error en función throttled:", error);
      }
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Valida si un string es un email válido
 * @param {string} email - Email a validar
 * @returns {boolean} true si es válido
 */
export function isValidEmail(email) {
  try {
    if (!email || typeof email !== "string") {
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  } catch (error) {
    console.error("Error al validar email:", error);
    return false;
  }
}

/**
 * Valida si un string no está vacío
 * @param {string} str - String a validar
 * @returns {boolean} true si no está vacío
 */
export function isNotEmpty(str) {
  try {
    return typeof str === "string" && str.trim().length > 0;
  } catch (error) {
    console.error("Error al validar string vacío:", error);
    return false;
  }
}
