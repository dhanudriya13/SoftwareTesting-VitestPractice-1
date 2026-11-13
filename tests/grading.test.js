import { describe, it, expect } from 'vitest';
import {
  calculateAverage,
  getLetterGrade
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
