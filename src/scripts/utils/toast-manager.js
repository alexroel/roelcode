/**
 * Sistema de notificaciones toast para la aplicación
 */

/**
 * Crea y muestra una notificación toast
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación ('success', 'info', 'warning', 'error')
 * @param {number} duration - Duración en milisegundos (default: 3000)
 */
export function createToast(message, type = "info", duration = 3000) {
  try {
    // Crear contenedor de toasts si no existe
    let toastContainer = document.getElementById("toast-container");
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.id = "toast-container";
      toastContainer.className = "fixed top-4 right-4 z-50 space-y-2";
      document.body.appendChild(toastContainer);
    }

    // Configurar estilos según el tipo
    const typeStyles = {
      success:
        "bg-emerald-50 dark:bg-emerald-900/50 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200",
      info: "bg-blue-50 dark:bg-blue-900/50 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200",
      warning:
        "bg-yellow-50 dark:bg-yellow-900/50 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200",
      error:
        "bg-red-50 dark:bg-red-900/50 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200",
    };

    const typeIcons = {
      success: "✓",
      info: "ℹ",
      warning: "⚠",
      error: "✕",
    };

    // Crear el toast
    const toast = document.createElement("div");
    toast.className = `
      px-4 py-3 rounded-lg shadow-lg border transition-all duration-300 transform translate-x-full opacity-0
      ${typeStyles[type] || typeStyles.info}
    `;

    toast.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="text-lg">${typeIcons[type] || typeIcons.info}</span>
        <span class="text-sm font-medium">${message}</span>
        <button class="ml-2 text-current hover:opacity-70" onclick="this.parentElement.parentElement.remove()">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
    `;

    toastContainer.appendChild(toast);

    // Animar entrada
    setTimeout(() => {
      toast.classList.remove("translate-x-full", "opacity-0");
    }, 10);

    // Auto-remover después del tiempo especificado
    setTimeout(() => {
      toast.classList.add("translate-x-full", "opacity-0");
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);

    return toast;
  } catch (error) {
    console.error("Error al crear toast:", error);
    // Fallback a alert si no se puede crear el toast
    alert(message);
  }
}

/**
 * Muestra un toast de éxito
 * @param {string} message - Mensaje a mostrar
 * @param {number} duration - Duración en milisegundos
 */
export function showSuccessToast(message, duration = 3000) {
  return createToast(message, "success", duration);
}

/**
 * Muestra un toast informativo
 * @param {string} message - Mensaje a mostrar
 * @param {number} duration - Duración en milisegundos
 */
export function showInfoToast(message, duration = 3000) {
  return createToast(message, "info", duration);
}

/**
 * Muestra un toast de advertencia
 * @param {string} message - Mensaje a mostrar
 * @param {number} duration - Duración en milisegundos
 */
export function showWarningToast(message, duration = 4000) {
  return createToast(message, "warning", duration);
}

/**
 * Muestra un toast de error
 * @param {string} message - Mensaje a mostrar
 * @param {number} duration - Duración en milisegundos
 */
export function showErrorToast(message, duration = 5000) {
  return createToast(message, "error", duration);
}

/**
 * Limpia todos los toasts existentes
 */
export function clearAllToasts() {
  try {
    const toastContainer = document.getElementById("toast-container");
    if (toastContainer) {
      toastContainer.innerHTML = "";
    }
  } catch (error) {
    console.error("Error al limpiar toasts:", error);
  }
}

/**
 * Expone las funciones toast globalmente para compatibilidad
 */
export function setupGlobalToastAPI() {
  if (typeof window !== "undefined") {
    window.showSuccessToast = showSuccessToast;
    window.showInfoToast = showInfoToast;
    window.showWarningToast = showWarningToast;
    window.showErrorToast = showErrorToast;
    window.createToast = createToast;
    window.clearAllToasts = clearAllToasts;
  }
}
