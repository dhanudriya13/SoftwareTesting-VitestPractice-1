import { describe, it, expect } from 'vitest';
import {
  calculateAverage,
  getLetterGrade,
  isPassing,
  getGradePoint,
  calculateGPA,
  getHighestScore,
  getLowestScore
} from '../src/grading.js';
import {
  validateStudent,
  createStudentReport,
  createClassReport,
  calculateClassGPA,
  rankStudents
} from '../src/students.js';

describe('it.each - getLetterGrade() score to grade mapping', () => {
  it.each([
    [100, 'A'],
    [95, 'A'],
    [90, 'A'],
    [89, 'B'],
    [80, 'B'],
    [79, 'C'],
    [70, 'C'],
    [69, 'D'],
    [60, 'D'],
    [59, 'E'],
    [30, 'E'],
    [29, 'F'],
    [0, 'F']
  ])('score %i maps to grade %s', (score, expected) => {
    expect(getLetterGrade(score)).toBe(expected);
  });
});

describe('it.each - calculateAverage()', () => {
  it.each([
    ['single score', [85], 85],
    ['two scores', [0, 100], 50],
    ['three scores', [80, 90, 100], 90],
    ['four scores', [1, 2, 3, 4], 2.5],
    ['five scores', [60, 70, 80, 90, 75], 75],
    ['all identical scores', [50, 50, 50], 50],
    ['boundary scores', [0, 100, 0, 100], 50]
  ])('averages %s', (label, scores, expected) => {
    expect(calculateAverage(scores)).toBe(expected);
  });
});

describe('it.each - isPassing() with default threshold', () => {
  it.each([
    { score: 81, expected: true },
    { score: 80, expected: false },
    { score: 100, expected: true },
    { score: 0, expected: false }
  ])('isPassing($score) with default threshold 81 → $expected', ({ score, expected }) => {
    expect(isPassing(score)).toBe(expected);
  });
});

describe('it.each - isPassing() with custom threshold', () => {
  it.each([
    [0, 0, true],
    [59, 60, false],
    [60, 60, true],
    [61, 60, true],
    [79, 80, false],
    [80, 80, true],
    [99, 100, false],
    [100, 100, true]
  ])('isPassing(%i, %i) → %s', (score, passingScore, expected) => {
    expect(isPassing(score, passingScore)).toBe(expected);
  });
});

describe('it.each - getGradePoint()', () => {
  it.each([
    { grade: 'A', points: 4 },
    { grade: 'B', points: 3 },
    { grade: 'C', points: 2 },
    { grade: 'D', points: 1 },
    { grade: 'F', points: 0 }
  ])('maps $grade to $points points', ({ grade, points }) => {
    expect(getGradePoint(grade)).toBe(points);
  });
});

describe('it.each - calculateGPA()', () => {
  it.each([
    [['A'], 4],
    [['A', 'B'], 3.5],
    [['A', 'B', 'C', 'D', 'F'], 2],
    [['A', 'B', 'F'], 2.33],
    [['B', 'B', 'B'], 3],
    [['A', 'F'], 2]
  ])('GPA of %j is %s', (letterGrades, expected) => {
    expect(calculateGPA(letterGrades)).toBe(expected);
  });
});

describe('it.each - getHighestScore()', () => {
  it.each([
    [[80, 95, 90], 95],
    [[100], 100],
    [[0, 100], 100],
    [[5, 3, 9, 1], 9],
    [[0, 0, 0], 0]
  ])('highest of %j is %i', (scores, expected) => {
    expect(getHighestScore(scores)).toBe(expected);
  });
});

describe('it.each - getLowestScore()', () => {
  it.each([
    [[80, 95, 90], 80],
    [[75], 75],
    [[0, 100], 0],
    [[5, 3, 9, 1], 1],
    [[100, 100, 100], 100]
  ])('lowest of %j is %i', (scores, expected) => {
    expect(getLowestScore(scores)).toBe(expected);
  });
});

describe('it.each - validation errors', () => {
  it.each([
    { label: 'calculateAverage with non-array', run: () => calculateAverage('80'), errorType: TypeError, message: 'Scores must be an array' },
    { label: 'calculateAverage with empty array', run: () => calculateAverage([]), errorType: Error, message: 'Scores array must not be empty' },
    { label: 'calculateAverage with NaN score', run: () => calculateAverage([80, NaN]), errorType: TypeError, message: 'All scores must be valid numbers' },
    { label: 'calculateAverage with negative score', run: () => calculateAverage([80, -5]), errorType: RangeError, message: 'Scores must be between 0 and 100' },
    { label: 'calculateAverage with score above 100', run: () => calculateAverage([80, 101]), errorType: RangeError, message: 'Scores must be between 0 and 100' },
    { label: 'getLetterGrade with string', run: () => getLetterGrade('90'), errorType: TypeError, message: 'Score must be a valid number' },
    { label: 'getLetterGrade with negative score', run: () => getLetterGrade(-1), errorType: RangeError, message: 'Score must be between 0 and 100' },
    { label: 'getLetterGrade with score above 100', run: () => getLetterGrade(101), errorType: RangeError, message: 'Score must be between 0 and 100' },
    { label: 'isPassing with string score', run: () => isPassing('80'), errorType: TypeError, message: 'Score must be a valid number' },
    { label: 'isPassing with string threshold', run: () => isPassing(80, '60'), errorType: TypeError, message: 'Passing score must be a valid number' },
    { label: 'isPassing with threshold above 100', run: () => isPassing(80, 101), errorType: RangeError, message: 'Passing score must be between 0 and 100' },
    { label: 'calculateGPA with non-array', run: () => calculateGPA('A'), errorType: TypeError, message: 'Letter grades must be an array' },
    { label: 'calculateGPA with empty array', run: () => calculateGPA([]), errorType: Error, message: 'Letter grades array must not be empty' },
    { label: 'getGradePoint with E', run: () => getGradePoint('E'), errorType: Error, message: 'Invalid letter grade' },
    { label: 'getGradePoint with unknown grade', run: () => getGradePoint('Z'), errorType: Error, message: 'Invalid letter grade' },
    { label: 'getHighestScore with empty array', run: () => getHighestScore([]), errorType: Error, message: 'Scores must be a non-empty array' },
    { label: 'getLowestScore with null', run: () => getLowestScore(null), errorType: Error, message: 'Scores must be a non-empty array' }
  ])('$label throws expected error', ({ run, errorType, message }) => {
    expect(run).toThrow(errorType);
    expect(run).toThrow(message);
  });
});

describe('it.each - validateStudent() valid input', () => {
  it.each([
    { id: 1, name: 'Alice', scores: [90, 85] },
    { id: 'A1', name: 'Bob', scores: [] },
    { id: 0, name: 'a', scores: [0] },
    { id: ' ', name: 'Cara', scores: [100] }
  ])('accepts student with id $id and name $name', (student) => {
    expect(validateStudent(student)).toBe(true);
  });
});

describe('it.each - validateStudent() invalid input', () => {
  it.each([
    { label: 'null input', student: null, errorType: TypeError, message: 'Student must be an object' },
    { label: 'string input', student: 'Alice', errorType: TypeError, message: 'Student must be an object' },
    { label: 'missing id', student: { name: 'Alice', scores: [] }, errorType: Error, message: 'Student must have an id' },
    { label: 'null id', student: { id: null, name: 'Alice', scores: [] }, errorType: Error, message: 'Student must have an id' },
    { label: 'empty id', student: { id: '', name: 'Alice', scores: [] }, errorType: Error, message: 'Student must have an id' },
    { label: 'numeric name', student: { id: 1, name: 123, scores: [] }, errorType: Error, message: 'Student must have a valid name' },
    { label: 'whitespace name', student: { id: 1, name: '   ', scores: [] }, errorType: Error, message: 'Student must have a valid name' },
    { label: 'scores not an array', student: { id: 1, name: 'Alice', scores: '90' }, errorType: TypeError, message: 'Student scores must be an array' }
  ])('$label throws expected error', ({ student, errorType, message }) => {
    expect(() => validateStudent(student)).toThrow(errorType);
    expect(() => validateStudent(student)).toThrow(message);
  });
});

describe('it.each - createStudentReport()', () => {
  it.each([
    {
      label: 'Alice with A grade',
      student: { id: 1, name: 'Alice', scores: [95, 88, 92] },
      passingScore: undefined,
      expected: { id: 1, name: 'Alice', average: 91.67, letterGrade: 'A', passed: true }
    },
    {
      label: 'Bob with C grade',
      student: { id: 2, name: 'Bob', scores: [70, 75, 72] },
      passingScore: undefined,
      expected: { id: 2, name: 'Bob', average: 72.33, letterGrade: 'C', passed: true }
    },
    {
      label: 'Cara exactly at default pass mark',
      student: { id: 3, name: 'Cara', scores: [60, 58, 62] },
      passingScore: undefined,
      expected: { id: 3, name: 'Cara', average: 60, letterGrade: 'D', passed: true }
    },
    {
      label: 'Dan failing default threshold',
      student: { id: 4, name: 'Dan', scores: [40, 50, 60] },
      passingScore: undefined,
      expected: { id: 4, name: 'Dan', average: 50, letterGrade: 'E', passed: false }
    },
    {
      label: 'Eve failing custom threshold 81',
      student: { id: 5, name: 'Eve', scores: [80, 80, 80] },
      passingScore: 81,
      expected: { id: 5, name: 'Eve', average: 80, letterGrade: 'B', passed: false }
    },
    {
      label: 'Fay exactly at custom threshold 81',
      student: { id: 6, name: 'Fay', scores: [81, 81, 81] },
      passingScore: 81,
      expected: { id: 6, name: 'Fay', average: 81, letterGrade: 'B', passed: true }
    },
    {
      label: 'Gil with zero score',
      student: { id: 7, name: 'Gil', scores: [0] },
      passingScore: undefined,
      expected: { id: 7, name: 'Gil', average: 0, letterGrade: 'F', passed: false }
    }
  ])('$label', ({ student, passingScore, expected }) => {
    expect(createStudentReport(student, passingScore)).toEqual(expected);
  });
});

describe('it.each - calculateClassGPA()', () => {
  it.each([
    {
      label: 'mixed class of A, C and D students',
      students: [
        { id: 1, name: 'Alice', scores: [95, 88, 92] },
        { id: 2, name: 'Bob', scores: [70, 75, 72] },
        { id: 3, name: 'Cara', scores: [60, 58, 62] }
      ],
      expected: 2.33
    },
    {
      label: 'class of only A students',
      students: [
        { id: 1, name: 'Ann', scores: [95] },
        { id: 2, name: 'Amy', scores: [100] }
      ],
      expected: 4
    },
    {
      label: 'class with one A and one F student',
      students: [
        { id: 1, name: 'Ace', scores: [95] },
        { id: 2, name: 'Fay', scores: [10] }
      ],
      expected: 2
    },
    {
      label: 'class with B and C students',
      students: [
        { id: 1, name: 'Ben', scores: [85] },
        { id: 2, name: 'Cyd', scores: [75] }
      ],
      expected: 2.5
    }
  ])('GPA of $label is $expected', ({ students, expected }) => {
    expect(calculateClassGPA(students)).toBe(expected);
  });
});

describe('it.each - rankStudents()', () => {
  it.each([
    {
      label: 'students in mixed order',
      students: [
        { id: 3, name: 'Cara', scores: [60, 58, 62] },
        { id: 1, name: 'Alice', scores: [95, 88, 92] },
        { id: 2, name: 'Bob', scores: [70, 75, 72] }
      ],
      expected: ['Alice', 'Bob', 'Cara']
    },
    {
      label: 'students already ranked',
      students: [
        { id: 1, name: 'Alice', scores: [95, 88, 92] },
        { id: 2, name: 'Bob', scores: [70, 75, 72] },
        { id: 3, name: 'Cara', scores: [60, 58, 62] }
      ],
      expected: ['Alice', 'Bob', 'Cara']
    },
    {
      label: 'single student',
      students: [{ id: 2, name: 'Bob', scores: [70, 75, 72] }],
      expected: ['Bob']
    },
    {
      label: 'tie keeps input order',
      students: [
        { id: 1, name: 'First', scores: [80] },
        { id: 2, name: 'Second', scores: [80] }
      ],
      expected: ['First', 'Second']
    }
  ])('ranks $label', ({ students, expected }) => {
    const actual = rankStudents(students);
    expect(actual.map((s) => s.name)).toEqual(expected);
  });
});

describe('it.each - createClassReport()', () => {
  it.each([
    {
      label: 'one student',
      students: [{ id: 1, name: 'Alice', scores: [95, 88, 92] }],
      passingScore: 60,
      expectedLength: 1,
      firstName: 'Alice'
    },
    {
      label: 'three students',
      students: [
        { id: 1, name: 'Alice', scores: [95, 88, 92] },
        { id: 2, name: 'Bob', scores: [70, 75, 72] },
        { id: 3, name: 'Cara', scores: [60, 58, 62] }
      ],
      passingScore: 70,
      expectedLength: 3,
      firstName: 'Alice'
    }
  ])('report with $label and threshold $passingScore', ({ students, passingScore, expectedLength, firstName }) => {
    const actual = createClassReport(students, passingScore);

    expect(actual).toHaveLength(expectedLength);
    expect(actual[0].name).toBe(firstName);
  });
});
