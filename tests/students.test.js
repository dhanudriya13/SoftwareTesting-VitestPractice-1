import { describe, it, expect } from 'vitest';
import {
  validateStudent,
  createStudentReport,
  createClassReport,
  calculateClassGPA,
  rankStudents
} from '../src/students.js';

describe('validateStudent()', () => {
  it('TC51 - Testing Valid Student', () => {
    const student = { id: 1, name: 'Alice', scores: [90, 85] };

    const actual = validateStudent(student);
    expect(actual).toBe(true);
  });

  it('TC52 - Testing Null Input', () => {
    expect(() => validateStudent(null)).toThrow(TypeError);
    expect(() => validateStudent(null)).toThrow('Student must be an object');
  });

  it('TC53 - Testing Undefined Input', () => {
    expect(() => validateStudent(undefined)).toThrow(TypeError);
  });

  it('TC54 - Testing Non-Object Input', () => {
    expect(() => validateStudent('Alice')).toThrow(TypeError);
    expect(() => validateStudent(123)).toThrow(TypeError);
  });

  it('TC55 - Testing Missing Id', () => {
    const student = { name: 'Alice', scores: [90] };

    expect(() => validateStudent(student)).toThrow('Student must have an id');
  });

  it('TC56 - Testing Null Id', () => {
    const student = { id: null, name: 'Alice', scores: [90] };

    expect(() => validateStudent(student)).toThrow('Student must have an id');
  });

  it('TC57 - Testing Empty String Id', () => {
    const student = { id: '', name: 'Alice', scores: [90] };

    expect(() => validateStudent(student)).toThrow('Student must have an id');
  });

  it('TC58 - Testing Non-String Name', () => {
    const student = { id: 1, name: 123, scores: [90] };

    expect(() => validateStudent(student)).toThrow('Student must have a valid name');
  });

  it('TC59 - Testing Blank Name', () => {
    const student = { id: 1, name: '   ', scores: [90] };

    expect(() => validateStudent(student)).toThrow('Student must have a valid name');
  });

  it('TC60 - Testing Scores That Are Not An Array', () => {
    const student = { id: 1, name: 'Alice', scores: '90' };

    expect(() => validateStudent(student)).toThrow(TypeError);
    expect(() => validateStudent(student)).toThrow('Student scores must be an array');
  });
});

describe('createStudentReport()', () => {
  it('TC61 - Testing Report Fields', () => {
    const student = { id: 1, name: 'Alice', scores: [95, 88, 92] };
    const expected = {
      id: 1,
      name: 'Alice',
      average: 91.67,
      letterGrade: 'A',
      passed: true
    };

    const actual = createStudentReport(student);
    expect(actual).toEqual(expected);
  });

  it('TC62 - Testing Name Trimming', () => {
    const student = { id: 2, name: '  Bob  ', scores: [70, 75, 72] };

    const actual = createStudentReport(student);
    expect(actual.name).toBe('Bob');
  });

  it('TC63 - Testing Average Rounded To 2 Decimals', () => {
    const student = { id: 3, name: 'Cara', scores: [80, 81, 83] };

    const actual = createStudentReport(student);
    expect(actual.average).toBe(81.33);
    expect(actual.letterGrade).toBe('B');
  });

  it('TC64 - Testing Default Passing Score 60 (Pass)', () => {
    const student = { id: 4, name: 'Dan', scores: [60] };

    const actual = createStudentReport(student);
    expect(actual.average).toBe(60);
    expect(actual.letterGrade).toBe('D');
    expect(actual.passed).toBe(true);
  });

  it('TC65 - Testing Default Passing Score 60 (Fail)', () => {
    const student = { id: 5, name: 'Eve', scores: [59] };

    const actual = createStudentReport(student);
    expect(actual.letterGrade).toBe('E');
    expect(actual.passed).toBe(false);
  });

  it('TC66 - Testing Custom Passing Score 81 (Fail)', () => {
    const student = { id: 6, name: 'Fay', scores: [80] };

    const actual = createStudentReport(student, 81);
    expect(actual.passed).toBe(false);
  });

  it('TC67 - Testing Custom Passing Score 81 (Pass)', () => {
    const student = { id: 7, name: 'Gil', scores: [81] };

    const actual = createStudentReport(student, 81);
    expect(actual.passed).toBe(true);
  });

  it('TC68 - Testing Invalid Student Propagates Error', () => {
    const student = { id: 8, name: 'Hal', scores: [] };

    expect(() => createStudentReport(student)).toThrow('Scores array must not be empty');
  });

  it('TC69 - Testing Letter Grade From Average', () => {
    const student = { id: 9, name: 'Ivy', scores: [70, 80] };

    const actual = createStudentReport(student);
    expect(actual.average).toBe(75);
    expect(actual.letterGrade).toBe('C');
  });
});

describe('createClassReport()', () => {
  const students = [
    { id: 1, name: 'Alice', scores: [95, 88, 92] },
    { id: 2, name: 'Bob', scores: [70, 75, 72] },
    { id: 3, name: 'Cara', scores: [60, 58, 62] }
  ];

  it('TC70 - Testing Report For Each Student', () => {
    const actual = createClassReport(students);

    expect(actual).toHaveLength(3);
    expect(actual[0].name).toBe('Alice');
    expect(actual[1].average).toBe(72.33);
    expect(actual[2].letterGrade).toBe('D');
  });

  it('TC71 - Testing Empty Array Returns Empty Report', () => {
    expect(createClassReport([])).toEqual([]);
  });

  it('TC72 - Testing Non-Array Input', () => {
    expect(() => createClassReport('Alice')).toThrow(TypeError);
    expect(() => createClassReport('Alice')).toThrow('Students must be an array');
  });

  it('TC73 - Testing Custom Passing Score Applied To All', () => {
    const passing = createClassReport(students, 70);
    const failing = createClassReport(students, 80);

    expect(passing[1].passed).toBe(true);
    expect(failing[1].passed).toBe(false);
  });
});

describe('calculateClassGPA()', () => {
  const students = [
    { id: 1, name: 'Alice', scores: [95, 88, 92] },
    { id: 2, name: 'Bob', scores: [70, 75, 72] },
    { id: 3, name: 'Cara', scores: [60, 58, 62] }
  ];

  it('TC74 - Testing Class GPA Calculation', () => {
    const expected = 2.33;

    const actual = calculateClassGPA(students);
    expect(actual).toBe(expected);
  });

  it('TC75 - Testing Class GPA With All A Grades', () => {
    const topStudents = [
      { id: 1, name: 'Ann', scores: [95] },
      { id: 2, name: 'Amy', scores: [100] }
    ];

    const actual = calculateClassGPA(topStudents);
    expect(actual).toBe(4);
  });

  it('TC76 - Testing Empty Array', () => {
    expect(() => calculateClassGPA([])).toThrow('Students must be a non-empty array');
  });

  it('TC77 - Testing Non-Array Input', () => {
    expect(() => calculateClassGPA(null)).toThrow('Students must be a non-empty array');
  });

  it('TC78 - Testing Invalid Student Propagates Error', () => {
    const withInvalid = [...students, { id: 4, name: 'Dan', scores: [] }];

    expect(() => calculateClassGPA(withInvalid)).toThrow('Scores array must not be empty');
  });

  it('TC79 - Testing Student With E Grade Throws', () => {
    const lowGrades = [{ id: 1, name: 'Low', scores: [40] }];

    expect(() => calculateClassGPA(lowGrades)).toThrow('Invalid letter grade');
  });
});

describe('rankStudents()', () => {
  const students = [
    { id: 1, name: 'Alice', scores: [95, 88, 92] },
    { id: 2, name: 'Bob', scores: [70, 75, 72] },
    { id: 3, name: 'Cara', scores: [60, 58, 62] }
  ];

  it('TC80 - Testing Ranked Descending By Average', () => {
    const actual = rankStudents(students);

    expect(actual.map((s) => s.name)).toEqual(['Alice', 'Bob', 'Cara']);
    expect(actual.map((s) => s.average)).toEqual([91.67, 72.33, 60]);
  });

  it('TC81 - Testing Input Array Is Not Mutated', () => {
    const snapshot = JSON.parse(JSON.stringify(students));

    rankStudents(students);

    expect(students).toEqual(snapshot);
  });

  it('TC82 - Testing Ranked Report Fields', () => {
    const actual = rankStudents(students);

    expect(actual[0]).toEqual({
      id: 1,
      name: 'Alice',
      average: 91.67,
      letterGrade: 'A',
      passed: true
    });
  });

  it('TC83 - Testing Single Student', () => {
    const actual = rankStudents([students[1]]);

    expect(actual).toHaveLength(1);
    expect(actual[0].name).toBe('Bob');
  });

  it('TC84 - Testing Equal Averages Keep Input Order', () => {
    const tied = [
      { id: 1, name: 'First', scores: [80] },
      { id: 2, name: 'Second', scores: [80] }
    ];

    const actual = rankStudents(tied);

    expect(actual.map((s) => s.name)).toEqual(['First', 'Second']);
  });

  it('TC85 - Testing Empty Array', () => {
    expect(rankStudents([])).toEqual([]);
  });

  it('TC86 - Testing Non-Array Input', () => {
    expect(() => rankStudents(null)).toThrow(TypeError);
    expect(() => rankStudents(null)).toThrow('Students must be an array');
  });
});
