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

describe('calculateAverage()', () => {

  it('TC01 - Testing Rata-Rata Nilai Mahasiswa', () => {
    const scores = [80, 90, 100];
    const expected = 90;

    const actual = calculateAverage(scores);
    expect(actual).toBe(expected);
  });
});

  describe('getLetterGrade()', () => {
    it('TC02 - Testing Output A', () => {
      const score = 91;
      const expected = 'A';

      const actual = getLetterGrade(score);
      expect(actual).toBe(expected);
    });
  });

  describe('getLetterGrade()', () => {
    it('TC03 - Testing Output B', () => {
      const score = 81;
      const expected = 'B';

      const actual = getLetterGrade(score);
      expect(actual).toBe(expected);
    });
});

describe('getLetterGrade()', () => {
    it('TC04 - Testing Output C', () => {
      const score = 71;
      const expected = 'C';

      const actual = getLetterGrade(score);
      expect(actual).toBe(expected);
    });
});
describe('getLetterGrade()', () => {
    it('TC05 - Testing Output D', () => {
      const score = 61;
      const expected = 'D';

      const actual = getLetterGrade(score);
      expect(actual).toBe(expected);
    });
});
describe('getLetterGrade()', () => {
    it('TC06 - Testing Output E', () => {
      const score = 40;
      const expected = 'E';

      const actual = getLetterGrade(score);
      expect(actual).toBe(expected);
    });
});
describe('getLetterGrade()', () => {
    it('TC07 - Testing Output F', () => {
      const score = 0;
      const expected = 'F';

      const actual = getLetterGrade(score);
      expect(actual).toBe(expected);
    });
});

describe('calculateAverage() - validation', () => {
  it('TC08 - Testing Average Of Single Score', () => {
    const scores = [85];
    const expected = 85;

    const actual = calculateAverage(scores);
    expect(actual).toBe(expected);
  });

  it('TC09 - Testing Non-Array Input', () => {
    expect(() => calculateAverage('80')).toThrow(TypeError);
    expect(() => calculateAverage('80')).toThrow('Scores must be an array');
  });

  it('TC10 - Testing Empty Array', () => {
    expect(() => calculateAverage([])).toThrow('Scores array must not be empty');
  });

  it('TC11 - Testing NaN Score', () => {
    expect(() => calculateAverage([80, NaN])).toThrow(TypeError);
    expect(() => calculateAverage([80, NaN])).toThrow('All scores must be valid numbers');
  });

  it('TC12 - Testing Non-Number Score', () => {
    expect(() => calculateAverage([80, '90'])).toThrow(TypeError);
  });

  it('TC13 - Testing Negative Score', () => {
    expect(() => calculateAverage([80, -5])).toThrow(RangeError);
    expect(() => calculateAverage([80, -5])).toThrow('Scores must be between 0 and 100');
  });

  it('TC14 - Testing Score Above 100', () => {
    expect(() => calculateAverage([80, 105])).toThrow(RangeError);
  });
});

describe('getLetterGrade() - boundary values', () => {
  it('TC15 - Testing Score 100 For A', () => {
    expect(getLetterGrade(100)).toBe('A');
  });

  it('TC16 - Testing Lower Bound Of A (90)', () => {
    expect(getLetterGrade(90)).toBe('A');
  });

  it('TC17 - Testing Just Below A (89.99)', () => {
    expect(getLetterGrade(89.99)).toBe('B');
  });

  it('TC18 - Testing Lower Bound Of B (80)', () => {
    expect(getLetterGrade(80)).toBe('B');
  });

  it('TC19 - Testing Just Below B (79.99)', () => {
    expect(getLetterGrade(79.99)).toBe('C');
  });

  it('TC20 - Testing Lower Bound Of C (70)', () => {
    expect(getLetterGrade(70)).toBe('C');
  });

  it('TC21 - Testing Just Below C (69.99)', () => {
    expect(getLetterGrade(69.99)).toBe('D');
  });

  it('TC22 - Testing Lower Bound Of D (60)', () => {
    expect(getLetterGrade(60)).toBe('D');
  });

  it('TC23 - Testing Just Below D (59.99)', () => {
    expect(getLetterGrade(59.99)).toBe('E');
  });

  it('TC24 - Testing Lower Bound Of E (30)', () => {
    expect(getLetterGrade(30)).toBe('E');
  });

  it('TC25 - Testing Just Below E (29.99)', () => {
    expect(getLetterGrade(29.99)).toBe('F');
  });
});

describe('getLetterGrade() - validation', () => {
  it('TC26 - Testing Non-Number Input', () => {
    expect(() => getLetterGrade('90')).toThrow(TypeError);
    expect(() => getLetterGrade('90')).toThrow('Score must be a valid number');
  });

  it('TC27 - Testing NaN Input', () => {
    expect(() => getLetterGrade(NaN)).toThrow(TypeError);
  });

  it('TC28 - Testing Negative Score', () => {
    expect(() => getLetterGrade(-1)).toThrow(RangeError);
    expect(() => getLetterGrade(-1)).toThrow('Score must be between 0 and 100');
  });

  it('TC29 - Testing Score Above 100', () => {
    expect(() => getLetterGrade(101)).toThrow(RangeError);
  });
});

describe('isPassing()', () => {
  it('TC30 - Testing Default Passing Threshold (81)', () => {
    expect(isPassing(81)).toBe(true);
  });

  it('TC31 - Testing Score Below Default Threshold', () => {
    expect(isPassing(80.99)).toBe(false);
  });

  it('TC32 - Testing Custom Threshold 60 (Pass)', () => {
    expect(isPassing(60, 60)).toBe(true);
  });

  it('TC33 - Testing Score Just Below Custom Threshold', () => {
    expect(isPassing(59.99, 60)).toBe(false);
  });

  it('TC34 - Testing Invalid Score Input', () => {
    expect(() => isPassing('80')).toThrow(TypeError);
    expect(() => isPassing('80')).toThrow('Score must be a valid number');
  });

  it('TC35 - Testing Invalid Passing Score Input', () => {
    expect(() => isPassing(80, '60')).toThrow(TypeError);
    expect(() => isPassing(80, '60')).toThrow('Passing score must be a valid number');
  });

  it('TC36 - Testing Out Of Range Score', () => {
    expect(() => isPassing(101)).toThrow(RangeError);
  });

  it('TC37 - Testing Out Of Range Passing Score', () => {
    expect(() => isPassing(80, 101)).toThrow(RangeError);
    expect(() => isPassing(80, 101)).toThrow('Passing score must be between 0 and 100');
  });
});

describe('getGradePoint()', () => {
  it('TC38 - Testing Grade Point Mapping', () => {
    const cases = [
      ['A', 4],
      ['B', 3],
      ['C', 2],
      ['D', 1],
      ['F', 0],
    ];

    cases.forEach(([grade, expected]) => {
      const actual = getGradePoint(grade);
      expect(actual).toBe(expected);
    });
  });

  it('TC39 - Testing Invalid Letter Grade E', () => {
    expect(() => getGradePoint('E')).toThrow('Invalid letter grade');
  });

  it('TC40 - Testing Unknown And Lowercase Letter Grade', () => {
    expect(() => getGradePoint('Z')).toThrow('Invalid letter grade');
    expect(() => getGradePoint('a')).toThrow('Invalid letter grade');
  });
});

describe('calculateGPA()', () => {
  it('TC41 - Testing GPA From All Letter Grades', () => {
    const letterGrades = ['A', 'B', 'C', 'D', 'F'];
    const expected = 2;

    const actual = calculateGPA(letterGrades);
    expect(actual).toBe(expected);
  });

  it('TC42 - Testing GPA Rounding To 2 Decimals', () => {
    const letterGrades = ['A', 'B', 'F'];
    const expected = 2.33;

    const actual = calculateGPA(letterGrades);
    expect(actual).toBe(expected);
  });

  it('TC43 - Testing Non-Array Input', () => {
    expect(() => calculateGPA('A')).toThrow(TypeError);
    expect(() => calculateGPA('A')).toThrow('Letter grades must be an array');
  });

  it('TC44 - Testing Empty Array', () => {
    expect(() => calculateGPA([])).toThrow('Letter grades array must not be empty');
  });

  it('TC45 - Testing Invalid Letter Grade Inside Array', () => {
    expect(() => calculateGPA(['A', 'Z'])).toThrow('Invalid letter grade');
  });
});

describe('getHighestScore() and getLowestScore()', () => {
  it('TC46 - Testing Highest Score', () => {
    const scores = [80, 95, 90];
    const expected = 95;

    const actual = getHighestScore(scores);
    expect(actual).toBe(expected);
  });

  it('TC47 - Testing Lowest Score', () => {
    const scores = [80, 95, 90];
    const expected = 80;

    const actual = getLowestScore(scores);
    expect(actual).toBe(expected);
  });

  it('TC48 - Testing Single Score List', () => {
    expect(getHighestScore([70])).toBe(70);
    expect(getLowestScore([70])).toBe(70);
  });

  it('TC49 - Testing Empty Array', () => {
    expect(() => getHighestScore([])).toThrow('Scores must be a non-empty array');
    expect(() => getLowestScore([])).toThrow('Scores must be a non-empty array');
  });

  it('TC50 - Testing Non-Array Input', () => {
    expect(() => getHighestScore('80')).toThrow('Scores must be a non-empty array');
    expect(() => getLowestScore(null)).toThrow('Scores must be a non-empty array');
  });
});
