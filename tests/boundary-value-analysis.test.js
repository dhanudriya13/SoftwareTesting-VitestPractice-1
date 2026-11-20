import { describe, it, expect } from 'vitest';
import {
  calculateAverage,
  getLetterGrade,
  isPassing,
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

describe('getLetterGrade() - score range boundaries [0, 100]', () => {
  it('BVA01 - Testing Minimum Minus One (-1)', () => {
    expect(() => getLetterGrade(-1)).toThrow(RangeError);
    expect(() => getLetterGrade(-1)).toThrow('Score must be between 0 and 100');
  });

  it('BVA02 - Testing Minimum (0)', () => {
    expect(getLetterGrade(0)).toBe('F');
  });

  it('BVA03 - Testing Minimum Plus One (1)', () => {
    expect(getLetterGrade(1)).toBe('F');
  });

  it('BVA04 - Testing Nominal Value (50)', () => {
    expect(getLetterGrade(50)).toBe('E');
  });

  it('BVA05 - Testing Maximum Minus One (99)', () => {
    expect(getLetterGrade(99)).toBe('A');
  });

  it('BVA06 - Testing Maximum (100)', () => {
    expect(getLetterGrade(100)).toBe('A');
  });

  it('BVA07 - Testing Maximum Plus One (101)', () => {
    expect(() => getLetterGrade(101)).toThrow(RangeError);
    expect(() => getLetterGrade(101)).toThrow('Score must be between 0 and 100');
  });
});

describe('getLetterGrade() - grade band boundaries', () => {
  it('BVA08 - Testing F/E Boundary Minus One (29)', () => {
    expect(getLetterGrade(29)).toBe('F');
  });

  it('BVA09 - Testing F/E Boundary Minimum (30)', () => {
    expect(getLetterGrade(30)).toBe('E');
  });

  it('BVA10 - Testing E/D Boundary Minus One (59)', () => {
    expect(getLetterGrade(59)).toBe('E');
  });

  it('BVA11 - Testing E/D Boundary Minimum (60)', () => {
    expect(getLetterGrade(60)).toBe('D');
  });

  it('BVA12 - Testing D/C Boundary Minus One (69)', () => {
    expect(getLetterGrade(69)).toBe('D');
  });

  it('BVA13 - Testing D/C Boundary Minimum (70)', () => {
    expect(getLetterGrade(70)).toBe('C');
  });

  it('BVA14 - Testing C/B Boundary Minus One (79)', () => {
    expect(getLetterGrade(79)).toBe('C');
  });

  it('BVA15 - Testing C/B Boundary Minimum (80)', () => {
    expect(getLetterGrade(80)).toBe('B');
  });

  it('BVA16 - Testing B/A Boundary Minus One (89)', () => {
    expect(getLetterGrade(89)).toBe('B');
  });

  it('BVA17 - Testing B/A Boundary Minimum (90)', () => {
    expect(getLetterGrade(90)).toBe('A');
  });
});

describe('calculateAverage() - score boundaries [0, 100]', () => {
  it('BVA18 - Testing Score Below Minimum (-1)', () => {
    expect(() => calculateAverage([-1])).toThrow(RangeError);
    expect(() => calculateAverage([-1])).toThrow('Scores must be between 0 and 100');
  });

  it('BVA19 - Testing Score At Minimum (0)', () => {
    expect(calculateAverage([0])).toBe(0);
  });

  it('BVA20 - Testing Score At Maximum (100)', () => {
    expect(calculateAverage([100])).toBe(100);
  });

  it('BVA21 - Testing Score Above Maximum (101)', () => {
    expect(() => calculateAverage([101])).toThrow(RangeError);
    expect(() => calculateAverage([101])).toThrow('Scores must be between 0 and 100');
  });
});

describe('calculateAverage() - array size boundaries', () => {
  it('BVA22 - Testing Size Below Minimum (0 items)', () => {
    expect(() => calculateAverage([])).toThrow('Scores array must not be empty');
  });

  it('BVA23 - Testing Size At Minimum (1 item)', () => {
    expect(calculateAverage([75])).toBe(75);
  });

  it('BVA24 - Testing Nominal Size (5 items)', () => {
    const scores = [10, 20, 30, 40, 50];
    const expected = 30;

    const actual = calculateAverage(scores);
    expect(actual).toBe(expected);
  });
});

describe('isPassing() - default threshold boundaries (81)', () => {
  it('BVA25 - Testing Threshold Minus One (80)', () => {
    expect(isPassing(80)).toBe(false);
  });

  it('BVA26 - Testing Threshold Exact Value (81)', () => {
    expect(isPassing(81)).toBe(true);
  });

  it('BVA27 - Testing Threshold Plus One (82)', () => {
    expect(isPassing(82)).toBe(true);
  });

  it('BVA28 - Testing Just Below Threshold (80.99)', () => {
    expect(isPassing(80.99)).toBe(false);
  });
});

describe('isPassing() - score boundaries [0, 100]', () => {
  it('BVA29 - Testing Score Below Minimum (-1)', () => {
    expect(() => isPassing(-1)).toThrow(RangeError);
    expect(() => isPassing(-1)).toThrow('Score must be between 0 and 100');
  });

  it('BVA30 - Testing Score At Minimum (0)', () => {
    expect(isPassing(0)).toBe(false);
  });

  it('BVA31 - Testing Score At Maximum (100)', () => {
    expect(isPassing(100)).toBe(true);
  });

  it('BVA32 - Testing Score Above Maximum (101)', () => {
    expect(() => isPassing(101)).toThrow(RangeError);
    expect(() => isPassing(101)).toThrow('Score must be between 0 and 100');
  });
});

describe('isPassing() - passingScore boundaries [0, 100]', () => {
  it('BVA33 - Testing Passing Score Below Minimum (-1)', () => {
    expect(() => isPassing(80, -1)).toThrow(RangeError);
    expect(() => isPassing(80, -1)).toThrow('Passing score must be between 0 and 100');
  });

  it('BVA34 - Testing Passing Score At Minimum (0)', () => {
    expect(isPassing(0, 0)).toBe(true);
  });

  it('BVA35 - Testing Passing Score At Maximum (100)', () => {
    expect(isPassing(99, 100)).toBe(false);
    expect(isPassing(100, 100)).toBe(true);
  });

  it('BVA36 - Testing Passing Score Above Maximum (101)', () => {
    expect(() => isPassing(80, 101)).toThrow(RangeError);
    expect(() => isPassing(80, 101)).toThrow('Passing score must be between 0 and 100');
  });

  it('BVA37 - Testing Score Below Custom Threshold (59 of 60)', () => {
    expect(isPassing(59, 60)).toBe(false);
  });

  it('BVA38 - Testing Score At Custom Threshold (60 of 60)', () => {
    expect(isPassing(60, 60)).toBe(true);
  });
});

describe('validateStudent() - id boundaries', () => {
  it('BVA39 - Testing Empty String Id (minimum invalid)', () => {
    const student = { id: '', name: 'Alice', scores: [90] };

    expect(() => validateStudent(student)).toThrow('Student must have an id');
  });

  it('BVA40 - Testing Single Space Id (minimum valid)', () => {
    const student = { id: ' ', name: 'Alice', scores: [90] };

    expect(validateStudent(student)).toBe(true);
  });

  it('BVA41 - Testing Numeric Zero Id (falsy but valid)', () => {
    const student = { id: 0, name: 'Alice', scores: [90] };

    expect(validateStudent(student)).toBe(true);
  });
});

describe('validateStudent() - name boundaries', () => {
  it('BVA42 - Testing Empty String Name (0 characters)', () => {
    const student = { id: 1, name: '', scores: [90] };

    expect(() => validateStudent(student)).toThrow('Student must have a valid name');
  });

  it('BVA43 - Testing Whitespace Name (1 character, 0 after trim)', () => {
    const student = { id: 1, name: ' ', scores: [90] };

    expect(() => validateStudent(student)).toThrow('Student must have a valid name');
  });

  it('BVA44 - Testing Single Character Name (minimum valid)', () => {
    const student = { id: 1, name: 'a', scores: [90] };

    expect(validateStudent(student)).toBe(true);
  });
});

describe('createStudentReport() - grade and passing boundaries', () => {
  it('BVA45 - Testing Average Just Below A Boundary (89.99)', () => {
    const student = { id: 1, name: 'Alice', scores: [89.99] };

    const actual = createStudentReport(student);
    expect(actual.average).toBe(89.99);
    expect(actual.letterGrade).toBe('B');
  });

  it('BVA46 - Testing Average At A Boundary (90)', () => {
    const student = { id: 2, name: 'Bob', scores: [90] };

    const actual = createStudentReport(student);
    expect(actual.average).toBe(90);
    expect(actual.letterGrade).toBe('A');
  });

  it('BVA47 - Testing Passing Score Minus One (80.99 of 81)', () => {
    const student = { id: 3, name: 'Cara', scores: [80.99] };

    const actual = createStudentReport(student, 81);
    expect(actual.passed).toBe(false);
  });

  it('BVA48 - Testing Passing Score At Threshold (81 of 81)', () => {
    const student = { id: 4, name: 'Dan', scores: [81] };

    const actual = createStudentReport(student, 81);
    expect(actual.passed).toBe(true);
  });
});

describe('class functions - class size boundaries', () => {
  it('BVA49 - Testing Class Size Below Minimum (0 students) For calculateClassGPA', () => {
    expect(() => calculateClassGPA([])).toThrow('Students must be a non-empty array');
  });

  it('BVA50 - Testing Class Size At Minimum (1 student) For calculateClassGPA', () => {
    const students = [{ id: 1, name: 'Alice', scores: [95] }];

    const actual = calculateClassGPA(students);
    expect(actual).toBe(4);
  });

  it('BVA51 - Testing Class Size Below Minimum (0 students) For createClassReport', () => {
    expect(createClassReport([])).toEqual([]);
  });

  it('BVA52 - Testing Class Size At Minimum (1 student) For createClassReport', () => {
    const students = [{ id: 1, name: 'Alice', scores: [95] }];

    const actual = createClassReport(students);
    expect(actual).toHaveLength(1);
    expect(actual[0].letterGrade).toBe('A');
  });

  it('BVA53 - Testing Class Size Below Minimum (0 students) For rankStudents', () => {
    expect(rankStudents([])).toEqual([]);
  });
});

describe('getHighestScore() and getLowestScore() - list boundaries', () => {
  it('BVA54 - Testing List Size Below Minimum (0 items)', () => {
    expect(() => getHighestScore([])).toThrow('Scores must be a non-empty array');
    expect(() => getLowestScore([])).toThrow('Scores must be a non-empty array');
  });

  it('BVA55 - Testing List Size At Minimum (1 item)', () => {
    expect(getHighestScore([75])).toBe(75);
    expect(getLowestScore([75])).toBe(75);
  });

  it('BVA56 - Testing Boundary Values In List (0 and 100)', () => {
    const scores = [0, 100];

    expect(getHighestScore(scores)).toBe(100);
    expect(getLowestScore(scores)).toBe(0);
  });
});
