# Student Grading Application

A small JavaScript student grading application intended for practicing unit tests with [Vitest](https://vitest.dev/).

## Project structure

- `src/grading.js` — core grading utilities (averages, letter grades, GPA, pass/fail checks, min/max)
- `src/students.js` — student validation and report generation built on top of grading utilities
- `vitest.config.js` — Vitest configuration

## Setup

```bash
npm install
```

## Run tests

```bash
npm test
```

Run once without watch mode:

```bash
npm run test:run
```

## Suggested unit test ideas

### `src/grading.js`
- `calculateAverage`
  - returns the correct average for valid scores
  - throws for empty arrays, non-array input, invalid numbers, or out-of-range scores
- `getLetterGrade`
  - maps boundary scores correctly (`90`, `80`, `70`, `60`, `59`)
  - throws for invalid or out-of-range values
- `isPassing`
  - uses default passing score (`60`)
  - respects a custom passing score
  - throws for invalid inputs
- `getGradePoint` / `calculateGPA`
  - converts letter grades to points correctly
  - calculates GPA and rounds to 2 decimal places
  - throws for invalid grades or empty arrays
- `getHighestScore` / `getLowestScore`
  - returns expected values for a score list
  - throws for empty or non-array input

### `src/students.js`
- `validateStudent`
  - accepts valid student objects
  - rejects missing/invalid `id`, `name`, or `scores`
- `createStudentReport`
  - returns average, letter grade, and pass/fail status
  - trims student names
  - supports custom passing score
- `createClassReport`
  - returns a report for each student
  - throws when input is not an array
- `calculateClassGPA`
  - computes GPA from students' average letter grades
  - throws for empty arrays or invalid students
- `rankStudents`
  - sorts students by average score in descending order

## Example usage

```js
import { createStudentReport, rankStudents } from "./src/students.js";

const alice = { id: 1, name: "Alice", scores: [95, 88, 92] };
console.log(createStudentReport(alice));

const students = [
  { id: 1, name: "Alice", scores: [95, 88, 92] },
  { id: 2, name: "Bob", scores: [70, 75, 72] },
  { id: 3, name: "Cara", scores: [60, 58, 62] },
];

console.log(rankStudents(students));
```
