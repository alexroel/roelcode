/**
 * Manejo refactorizado de progreso de cursos con manejo de errores
 */

import {
  attachEventListener,
  removeEventListener,
} from "./utils/event-manager.js";
import {
  getCourseProgress,
  markLessonCompleted,
  markLessonIncomplete,
  isLessonCompleted,
  getCourseStats,
} from "./utils/course-progress.js";
import {
  safeQuerySelector,
  safeQuerySelectorAll,
  safeGetAttribute,
  onDOMReady,
  safeAddClass,
  safeRemoveClass,
} from "./utils/dom-utils.js";
import { showSuccessToast, showInfoToast } from "./utils/toast-manager.js";

/**
 * Actualiza la UI de todas las lecciones basado en el progreso guardado
 * @param {string} courseId - ID del curso
 */
function updateAllLessonsUI(courseId) {
  try {
    if (!courseId) {
      throw new Error("CourseId es requerido");
    }

    const progress = getCourseProgress(courseId);
    if (!progress) {
      console.log(`No hay progreso guardado para el curso ${courseId}`);
      return;
    }

    // Actualizar todas las lecciones en el sidebar
    const lessonItems = safeQuerySelectorAll(".lesson-item");

    lessonItems.forEach((item) => {
      const lessonId = safeGetAttribute(item, "data-lesson-id");
      if (!lessonId) return;

      const completed = isLessonCompleted(courseId, lessonId);

      if (completed) {
        safeAddClass(item, "completed");
      } else {
        safeRemoveClass(item, "completed");
      }
    });

    // Actualizar botón dinámico de curso si existe
    updateDynamicCourseButton(courseId);

    console.log(
      `UI actualizada para ${lessonItems.length} lecciones del curso ${courseId}`
    );
  } catch (error) {
    console.error(
      `Error al actualizar UI de lecciones para curso ${courseId}:`,
      error
    );
  }
}

/**
 * Actualiza el botón dinámico del curso con el progreso actual
 * @param {string} courseId - ID del curso
 */
function updateDynamicCourseButton(courseId) {
  try {
    const courseButtonContainer = safeQuerySelector("#dynamic-course-button");
    if (!courseButtonContainer) return;

    const containerCourseId = safeGetAttribute(
      courseButtonContainer,
      "data-course-id"
    );
    if (!containerCourseId || containerCourseId !== courseId) return;

    const stats = getCourseStats(courseId);

    // Buscar elementos de progreso dentro del contenedor
    const progressBar = safeQuerySelector(
      ".progress-bar",
      courseButtonContainer
    );
    const progressText = safeQuerySelector(
      ".progress-text",
      courseButtonContainer
    );
    const continueButton = safeQuerySelector(
      ".continue-course-btn",
      courseButtonContainer
    );
    const startButton = safeQuerySelector(
      ".start-course-btn",
      courseButtonContainer
    );

    // Actualizar barra de progreso
    if (progressBar) {
      progressBar.style.width = `${stats.progressPercentage}%`;
    }

    // Actualizar texto de progreso
    if (progressText) {
      progressText.textContent = `${stats.completedLessons}/${stats.totalLessons} lecciones completadas`;
    }

    // Mostrar botón apropiado
    if (stats.completedLessons > 0) {
      if (continueButton) continueButton.style.display = "block";
      if (startButton) startButton.style.display = "none";
    } else {
      if (continueButton) continueButton.style.display = "none";
      if (startButton) startButton.style.display = "block";
    }

    console.log(
      `Botón dinámico actualizado para curso ${courseId}: ${stats.progressPercentage}%`
    );
  } catch (error) {
    console.error(
      `Error al actualizar botón dinámico para curso ${courseId}:`,
      error
    );
  }
}

/**
 * Inicializa el progreso de lecciones para la página actual
 */
function initializeLessonProgress() {
  try {
    const completeBtn = safeQuerySelector("#btn-complete-lesson");
    if (!completeBtn) {
      console.log("No se encontró botón de completar lección");
      return;
    }

    const lessonId = safeGetAttribute(completeBtn, "data-lesson-id");
    const courseId = safeGetAttribute(completeBtn, "data-course-id");
    const lessonTitle = safeGetAttribute(completeBtn, "data-lesson-title");
    const totalLessonsStr = safeGetAttribute(completeBtn, "data-total-lessons");

    if (!lessonId || !courseId) {
      throw new Error(
        "Faltan atributos requeridos en el botón de completar lección"
      );
    }

    const totalLessons = parseInt(totalLessonsStr, 10);
    if (isNaN(totalLessons) || totalLessons <= 0) {
      throw new Error(`Total de lecciones inválido: ${totalLessonsStr}`);
    }

    // Configurar estado inicial del botón
    const isCompleted = isLessonCompleted(courseId, lessonId);
    updateLessonButton(completeBtn, isCompleted);

    // Configurar el event listener
    const clickHandler = (e) => {
      e.preventDefault();

      try {
        const currentlyCompleted = isLessonCompleted(courseId, lessonId);

        if (currentlyCompleted) {
          // Desmarcar como completada
          const success = markLessonIncomplete(courseId, lessonId);
          if (success) {
            updateLessonButton(completeBtn, false);
            updateAllLessonsUI(courseId);
            showInfoToast("Lección marcada como pendiente");
            console.log(`Lección ${lessonId} desmarcada como completada`);
          }
        } else {
          // Marcar como completada
          const success = markLessonCompleted(
            courseId,
            lessonId,
            lessonTitle,
            totalLessons
          );
          if (success) {
            updateLessonButton(completeBtn, true);
            updateAllLessonsUI(courseId);
            showSuccessToast("¡Lección completada! 🎉");
            console.log(`Lección ${lessonId} marcada como completada`);
          }
        }
      } catch (error) {
        console.error("Error al manejar click en botón de completar:", error);
      }
    };

    attachEventListener(completeBtn, "click", clickHandler);

    // Actualizar UI inicial
    updateAllLessonsUI(courseId);

    console.log(
      `Progreso de lección inicializado para ${lessonId} en curso ${courseId}`
    );
  } catch (error) {
    console.error("Error al inicializar progreso de lección:", error);
  }
}

/**
 * Actualiza el estado visual del botón de completar lección
 * @param {HTMLElement} button - Botón de completar lección
 * @param {boolean} isCompleted - Si la lección está completada
 */
function updateLessonButton(button, isCompleted) {
  try {
    if (!button) {
      throw new Error("Botón de lección inválido");
    }

    const icon = safeQuerySelector(".check-icon", button);
    const text = safeQuerySelector(".btn-text", button);
    const confettiContainer = safeQuerySelector(".confetti-container", button);

    if (isCompleted) {
      safeAddClass(button, "completed");

      // Actualizar icono con animación
      if (icon) {
        icon.style.transform = "scale(0)";
        setTimeout(() => {
          icon.setAttribute("name", "tabler:check-circle");
          icon.style.transform = "scale(1)";
        }, 150);
      }

      // Actualizar texto con animación
      if (text) {
        text.style.opacity = "0";
        setTimeout(() => {
          text.textContent = "✓ Lección completada";
          text.style.opacity = "1";
        }, 150);
      }

      // Efecto de confeti
      if (confettiContainer) {
        confettiContainer.classList.add("active");
        setTimeout(() => {
          confettiContainer.classList.remove("active");
        }, 1000);
      }

      // Vibración en dispositivos móviles
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
    } else {
      safeRemoveClass(button, "completed");

      // Restaurar icono
      if (icon) {
        icon.setAttribute("name", "tabler:check");
      }

      // Restaurar texto
      if (text) {
        text.style.opacity = "0";
        setTimeout(() => {
          text.textContent = "Marcar como completada";
          text.style.opacity = "1";
        }, 150);
      }
    }
  } catch (error) {
    console.error("Error al actualizar botón de lección:", error);
  }
}

/**
 * Inicializa navegación entre lecciones
 */
function initializeLessonNavigation() {
  try {
    const navButtons = safeQuerySelectorAll(".lesson-nav-btn");

    navButtons.forEach((button) => {
      const clickHandler = (e) => {
        e.preventDefault();

        try {
          const href = safeGetAttribute(button, "href");
          if (href && href !== "#") {
            window.location.href = href;
          }
        } catch (error) {
          console.error("Error en navegación de lección:", error);
        }
      };

      attachEventListener(button, "click", clickHandler);
    });

    console.log(`Inicializados ${navButtons.length} botones de navegación`);
  } catch (error) {
    console.error("Error al inicializar navegación de lecciones:", error);
  }
}

/**
 * Limpia todos los event listeners relacionados con progreso
 */
function cleanupLessonProgress() {
  try {
    const completeBtn = safeQuerySelector("#btn-complete-lesson");
    if (completeBtn) {
      removeEventListener(completeBtn, "click");
    }

    const navButtons = safeQuerySelectorAll(".lesson-nav-btn");
    navButtons.forEach((button) => {
      removeEventListener(button, "click");
    });

    console.log("Limpiados event listeners de progreso de lecciones");
  } catch (error) {
    console.error("Error al limpiar progreso de lecciones:", error);
  }
}

/**
 * Inicializa todo el sistema de progreso de cursos
 */
function initCourseProgress() {
  try {
    initializeLessonProgress();
    initializeLessonNavigation();
  } catch (error) {
    console.error("Error al inicializar progreso de curso:", error);
  }
}

// Inicializar cuando el DOM esté listo
onDOMReady(initCourseProgress);

// Exponer funciones globalmente
window.courseProgress = {
  init: initCourseProgress,
  initLesson: initializeLessonProgress,
  initNavigation: initializeLessonNavigation,
  updateUI: updateAllLessonsUI,
  cleanup: cleanupLessonProgress,
};

// Limpiar al salir de la página
window.addEventListener("beforeunload", cleanupLessonProgress);

export {
  initCourseProgress,
  initializeLessonProgress,
  initializeLessonNavigation,
  updateAllLessonsUI,
  cleanupLessonProgress,
};
