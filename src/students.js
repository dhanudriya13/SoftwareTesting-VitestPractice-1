import {
  calculateAverage,
  calculateGPA,
  getLetterGrade,
  isPassing,
} from "./grading.js";

export function validateStudent(student) {
  if (!student || typeof student !== "object") {
    throw new TypeError("Student must be an object");
  }
  if (student.id === undefined || student.id === null || student.id === "") {
    throw new Error("Student must have an id");
  }
  if (typeof student.name !== "string" || student.name.trim() === "") {
    throw new Error("Student must have a valid name");
  }
  if (!Array.isArray(student.scores)) {
    throw new TypeError("Student scores must be an array");
  }
  return true;
}

export function createStudentReport(student, passingScore = 60) {
  validateStudent(student);

  const average = Number(calculateAverage(student.scores).toFixed(2));
  const letterGrade = getLetterGrade(average);

  return {
    id: student.id,
    name: student.name.trim(),
    average,
    letterGrade,
    passed: isPassing(average, passingScore),
  };
}

export function createClassReport(students, passingScore = 60) {
  if (!Array.isArray(students)) {
    throw new TypeError("Students must be an array");
  }

  return students.map((student) => createStudentReport(student, passingScore));
}

export function calculateClassGPA(students) {
  if (!Array.isArray(students) || students.length === 0) {
    throw new Error("Students must be a non-empty array");
  }

  const letterGrades = students.map((student) => {
    validateStudent(student);
    const average = calculateAverage(student.scores);
    return getLetterGrade(average);
  });

  return calculateGPA(letterGrades);
}

export function rankStudents(students) {
  const reports = createClassReport(students);
  return [...reports].sort((a, b) => b.average - a.average);
}
