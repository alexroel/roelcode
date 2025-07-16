/**
 * Utilidades para manejo de progreso de cursos con validación y manejo de errores
 */

import { getStorageItem, setStorageItem } from "./storage-manager.js";

const COURSE_PROGRESS_KEY = "courseProgress";

/**
 * Estructura de datos para el progreso del curso
 * @typedef {Object} CourseProgress
 * @property {string} courseId - ID del curso
 * @property {Array} completedLessons - Array de lecciones completadas
 * @property {number} totalLessons - Total de lecciones en el curso
 * @property {number} progressPercentage - Porcentaje de progreso
 * @property {number} lastUpdated - Timestamp de última actualización
 */

/**
 * Obtiene el progreso de todos los cursos
 * @returns {Object} Objeto con el progreso de todos los cursos
 */
export function getAllCourseProgress() {
  try {
    const progress = getStorageItem(COURSE_PROGRESS_KEY, {});

    // Validar estructura de datos
    if (typeof progress !== "object" || progress === null) {
      console.warn("Progreso de cursos corrupto, reiniciando...");
      return {};
    }

    return progress;
  } catch (error) {
    console.error("Error al obtener progreso de cursos:", error);
    return {};
  }
}

/**
 * Obtiene el progreso de un curso específico
 * @param {string} courseId - ID del curso
 * @returns {CourseProgress|null} Progreso del curso o null si no existe
 */
export function getCourseProgress(courseId) {
  try {
    if (!courseId || typeof courseId !== "string") {
      throw new Error(
        `CourseId debe ser un string válido, recibido: ${courseId}`
      );
    }

    const allProgress = getAllCourseProgress();
    return allProgress[courseId] || null;
  } catch (error) {
    console.error(`Error al obtener progreso del curso ${courseId}:`, error);
    return null;
  }
}

/**
 * Guarda el progreso de un curso
 * @param {string} courseId - ID del curso
 * @param {CourseProgress} courseProgress - Datos del progreso
 * @returns {boolean} true si se guardó exitosamente
 */
export function saveCourseProgress(courseId, courseProgress) {
  try {
    if (!courseId || typeof courseId !== "string") {
      throw new Error(
        `CourseId debe ser un string válido, recibido: ${courseId}`
      );
    }

    if (!courseProgress || typeof courseProgress !== "object") {
      throw new Error(
        `CourseProgress debe ser un objeto válido, recibido: ${courseProgress}`
      );
    }

    // Validar estructura mínima
    const requiredFields = ["completedLessons", "totalLessons"];
    for (const field of requiredFields) {
      if (!(field in courseProgress)) {
        throw new Error(`Campo requerido faltante en courseProgress: ${field}`);
      }
    }

    const allProgress = getAllCourseProgress();

    // Añadir timestamp de actualización
    const updatedProgress = {
      ...courseProgress,
      courseId,
      lastUpdated: Date.now(),
      progressPercentage: calculateProgressPercentage(
        courseProgress.completedLessons.length,
        courseProgress.totalLessons
      ),
    };

    allProgress[courseId] = updatedProgress;

    const saved = setStorageItem(COURSE_PROGRESS_KEY, allProgress);

    if (saved) {
      // Disparar evento personalizado para notificar cambios
      window.dispatchEvent(
        new CustomEvent("courseProgressUpdated", {
          detail: { courseId, progress: updatedProgress },
        })
      );
    }

    return saved;
  } catch (error) {
    console.error(`Error al guardar progreso del curso ${courseId}:`, error);
    return false;
  }
}

/**
 * Marca una lección como completada
 * @param {string} courseId - ID del curso
 * @param {string} lessonId - ID de la lección
 * @param {string} lessonTitle - Título de la lección
 * @param {number} totalLessons - Total de lecciones en el curso
 * @returns {boolean} true si se guardó exitosamente
 */
export function markLessonCompleted(
  courseId,
  lessonId,
  lessonTitle,
  totalLessons
) {
  try {
    if (!courseId || !lessonId) {
      throw new Error("CourseId y lessonId son requeridos");
    }

    if (!Number.isInteger(totalLessons) || totalLessons <= 0) {
      throw new Error(
        `TotalLessons debe ser un número entero positivo, recibido: ${totalLessons}`
      );
    }

    let courseProgress = getCourseProgress(courseId) || {
      completedLessons: [],
      totalLessons: totalLessons,
    };

    // Verificar si la lección ya está completada
    const isAlreadyCompleted = courseProgress.completedLessons.some(
      (lesson) => lesson.lessonId === lessonId
    );

    if (!isAlreadyCompleted) {
      courseProgress.completedLessons.push({
        lessonId,
        lessonTitle: lessonTitle || "Título no disponible",
        completedAt: Date.now(),
      });
    }

    // Actualizar total de lecciones si es diferente
    courseProgress.totalLessons = totalLessons;

    return saveCourseProgress(courseId, courseProgress);
  } catch (error) {
    console.error(
      `Error al marcar lección ${lessonId} como completada:`,
      error
    );
    return false;
  }
}

/**
 * Desmarca una lección como completada
 * @param {string} courseId - ID del curso
 * @param {string} lessonId - ID de la lección
 * @returns {boolean} true si se guardó exitosamente
 */
export function markLessonIncomplete(courseId, lessonId) {
  try {
    if (!courseId || !lessonId) {
      throw new Error("CourseId y lessonId son requeridos");
    }

    const courseProgress = getCourseProgress(courseId);
    if (!courseProgress) {
      console.warn(`No se encontró progreso para el curso ${courseId}`);
      return false;
    }

    // Filtrar la lección completada
    courseProgress.completedLessons = courseProgress.completedLessons.filter(
      (lesson) => lesson.lessonId !== lessonId
    );

    return saveCourseProgress(courseId, courseProgress);
  } catch (error) {
    console.error(`Error al desmarcar lección ${lessonId}:`, error);
    return false;
  }
}

/**
 * Verifica si una lección está completada
 * @param {string} courseId - ID del curso
 * @param {string} lessonId - ID de la lección
 * @returns {boolean} true si la lección está completada
 */
export function isLessonCompleted(courseId, lessonId) {
  try {
    if (!courseId || !lessonId) {
      return false;
    }

    const courseProgress = getCourseProgress(courseId);
    if (!courseProgress) {
      return false;
    }

    return courseProgress.completedLessons.some(
      (lesson) => lesson.lessonId === lessonId
    );
  } catch (error) {
    console.error(
      `Error al verificar si lección ${lessonId} está completada:`,
      error
    );
    return false;
  }
}

/**
 * Calcula el porcentaje de progreso
 * @param {number} completedCount - Número de lecciones completadas
 * @param {number} totalCount - Total de lecciones
 * @returns {number} Porcentaje de progreso (0-100)
 */
export function calculateProgressPercentage(completedCount, totalCount) {
  try {
    if (!Number.isInteger(completedCount) || !Number.isInteger(totalCount)) {
      throw new Error("CompletedCount y totalCount deben ser números enteros");
    }

    if (totalCount <= 0) {
      return 0;
    }

    const percentage = Math.round((completedCount / totalCount) * 100);
    return Math.min(100, Math.max(0, percentage));
  } catch (error) {
    console.error("Error al calcular porcentaje de progreso:", error);
    return 0;
  }
}

/**
 * Obtiene estadísticas del progreso del curso
 * @param {string} courseId - ID del curso
 * @returns {Object} Estadísticas del progreso
 */
export function getCourseStats(courseId) {
  try {
    const progress = getCourseProgress(courseId);
    if (!progress) {
      return {
        totalLessons: 0,
        completedLessons: 0,
        progressPercentage: 0,
        isCompleted: false,
        lastUpdated: null,
      };
    }

    const completedCount = progress.completedLessons.length;
    const isCompleted = completedCount === progress.totalLessons;

    return {
      totalLessons: progress.totalLessons,
      completedLessons: completedCount,
      progressPercentage: calculateProgressPercentage(
        completedCount,
        progress.totalLessons
      ),
      isCompleted,
      lastUpdated: progress.lastUpdated || null,
    };
  } catch (error) {
    console.error(
      `Error al obtener estadísticas del curso ${courseId}:`,
      error
    );
    return {
      totalLessons: 0,
      completedLessons: 0,
      progressPercentage: 0,
      isCompleted: false,
      lastUpdated: null,
    };
  }
}

/**
 * Limpia el progreso de un curso específico
 * @param {string} courseId - ID del curso
 * @returns {boolean} true si se limpió exitosamente
 */
export function clearCourseProgress(courseId) {
  try {
    if (!courseId || typeof courseId !== "string") {
      throw new Error(
        `CourseId debe ser un string válido, recibido: ${courseId}`
      );
    }

    const allProgress = getAllCourseProgress();
    delete allProgress[courseId];

    const saved = setStorageItem(COURSE_PROGRESS_KEY, allProgress);

    if (saved) {
      window.dispatchEvent(
        new CustomEvent("courseProgressCleared", {
          detail: { courseId },
        })
      );
    }

    return saved;
  } catch (error) {
    console.error(`Error al limpiar progreso del curso ${courseId}:`, error);
    return false;
  }
}
