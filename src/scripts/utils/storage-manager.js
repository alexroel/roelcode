/**
 * Utilidades para manejo seguro de localStorage con validación y manejo de errores
 */

/**
 * Obtiene un item del localStorage de manera segura
 * @param {string} key - Clave del localStorage
 * @param {any} defaultValue - Valor por defecto si no existe o hay error
 * @returns {any} Valor parseado o valor por defecto
 */
export function getStorageItem(key, defaultValue = null) {
  try {
    if (typeof localStorage === "undefined") {
      console.warn("localStorage no está disponible");
      return defaultValue;
    }

    if (!key || typeof key !== "string") {
      throw new Error(`Key debe ser un string válido, recibido: ${key}`);
    }

    const item = localStorage.getItem(key);

    if (item === null) {
      return defaultValue;
    }

    // Intentar parsear como JSON
    try {
      return JSON.parse(item);
    } catch (parseError) {
      // Si no es JSON válido, devolver como string
      return item;
    }
  } catch (error) {
    console.error(`Error al obtener item del localStorage (${key}):`, error);
    return defaultValue;
  }
}

/**
 * Guarda un item en localStorage de manera segura
 * @param {string} key - Clave del localStorage
 * @param {any} value - Valor a guardar (será serializado como JSON)
 * @returns {boolean} true si se guardó exitosamente, false en caso contrario
 */
export function setStorageItem(key, value) {
  try {
    if (typeof localStorage === "undefined") {
      console.warn("localStorage no está disponible");
      return false;
    }

    if (!key || typeof key !== "string") {
      throw new Error(`Key debe ser un string válido, recibido: ${key}`);
    }

    // Serializar el valor
    const serializedValue =
      typeof value === "string" ? value : JSON.stringify(value);

    localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    if (error.name === "QuotaExceededError") {
      console.error("localStorage está lleno. No se puede guardar más datos.");
      // Opcional: limpiar datos antiguos o mostrar mensaje al usuario
      window.dispatchEvent(
        new CustomEvent("storageQuotaExceeded", {
          detail: { key, value },
        })
      );
    } else {
      console.error(`Error al guardar item en localStorage (${key}):`, error);
    }
    return false;
  }
}

/**
 * Remueve un item del localStorage de manera segura
 * @param {string} key - Clave a remover
 * @returns {boolean} true si se removió exitosamente, false en caso contrario
 */
export function removeStorageItem(key) {
  try {
    if (typeof localStorage === "undefined") {
      console.warn("localStorage no está disponible");
      return false;
    }

    if (!key || typeof key !== "string") {
      throw new Error(`Key debe ser un string válido, recibido: ${key}`);
    }

    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error al remover item del localStorage (${key}):`, error);
    return false;
  }
}

/**
 * Verifica si localStorage está disponible
 * @returns {boolean} true si localStorage está disponible
 */
export function isStorageAvailable() {
  try {
    if (typeof localStorage === "undefined") {
      return false;
    }

    // Prueba escribir y leer
    const testKey = "__storage_test__";
    localStorage.setItem(testKey, "test");
    localStorage.getItem(testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    console.warn("localStorage no está disponible:", error);
    return false;
  }
}

/**
 * Obtiene el uso actual del localStorage en bytes (aproximado)
 * @returns {number} Bytes utilizados aproximadamente
 */
export function getStorageUsage() {
  try {
    if (!isStorageAvailable()) {
      return 0;
    }

    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total;
  } catch (error) {
    console.error("Error al calcular uso del localStorage:", error);
    return 0;
  }
}

/**
 * Limpia items antiguos del localStorage basado en un patrón de tiempo
 * @param {string} keyPattern - Patrón de clave a buscar
 * @param {number} maxAgeMs - Edad máxima en milisegundos
 */
export function cleanOldStorageItems(
  keyPattern,
  maxAgeMs = 7 * 24 * 60 * 60 * 1000
) {
  // 7 días por defecto
  try {
    if (!isStorageAvailable()) {
      return;
    }

    const now = Date.now();
    const keysToRemove = [];

    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key) && key.includes(keyPattern)) {
        try {
          const item = JSON.parse(localStorage[key]);
          if (item.timestamp && now - item.timestamp > maxAgeMs) {
            keysToRemove.push(key);
          }
        } catch (parseError) {
          // Si no puede parsear, ignorar
          continue;
        }
      }
    }

    keysToRemove.forEach((key) => removeStorageItem(key));

    if (keysToRemove.length > 0) {
      console.log(
        `Limpiados ${keysToRemove.length} items antiguos del localStorage`
      );
    }
  } catch (error) {
    console.error("Error al limpiar items antiguos del localStorage:", error);
  }
}
