import { assertEquals } from "@std/assert";
import { hasSpace, makeWordSearch, search } from "./main.ts";

const wordSearch = [
  ["M", "M", "M", "S", "X", "X", "M", "A", "S", "M"],
  ["M", "S", "A", "M", "X", "M", "S", "M", "S", "A"],
  ["A", "M", "X", "S", "X", "M", "A", "A", "M", "M"],
  ["M", "S", "A", "M", "A", "S", "M", "S", "M", "X"],
  ["X", "M", "A", "S", "A", "M", "X", "A", "M", "M"],
  ["X", "X", "A", "M", "M", "X", "X", "A", "M", "A"],
  ["S", "M", "S", "M", "S", "A", "S", "X", "S", "S"],
  ["S", "A", "X", "A", "M", "A", "S", "A", "A", "A"],
  ["M", "A", "M", "M", "M", "X", "M", "M", "M", "M"],
  ["M", "X", "M", "X", "A", "X", "M", "A", "S", "X"],
];

Deno.test(function makeWordSearchTest() {
  const input = `
    MMMSXXMASM
    MSAMXMSMSA
    AMXSXMAAMM
    MSAMASMSMX
    XMASAMXAMM
    XXAMMXXAMA
    SMSMSASXSS
    SAXAMASAAA
    MAMMMXMMMM
    MXMXAXMASX
  `;

  assertEquals(makeWordSearch(input), wordSearch);
});

Deno.test(function searchTest() {
  assertEquals(search(wordSearch), 18);
  assertEquals(search(makeWordSearch('SAMX')), 1);
  assertEquals(search(makeWordSearch('XMAS')), 1);
});

Deno.test(function searchDirectionsTest() {
  assertEquals(search(makeWordSearch(`
X
M
A
S
  `)), 1);
  assertEquals(search(makeWordSearch(`
S
A
M
X
  `)), 1);
  assertEquals(search(makeWordSearch(`
S
YA
YYM
YYYX
  `)), 1);

  assertEquals(search(makeWordSearch(`
YYYX
YYM
YA
S
  `)), 1);

  assertEquals(search(makeWordSearch(`
YYYS
YYAY
YMYY
XYYY
  `)), 1);

  assertEquals(search(makeWordSearch(`
XYYY
YMYY
YYAY
YYYS
  `)), 1);
});

Deno.test('has space', () => {
      const {
        hasSpaceAbove,
        hasSpaceAfter,
        hasSpaceBelow,
        hasSpaceBefore,
      } = hasSpace({
        x: 3,
        y: 3,
        width: 7,
        height: 7,
      });

  assertEquals(hasSpaceAbove, true)
  assertEquals(hasSpaceAfter, true)
  assertEquals(hasSpaceBelow, true)
  assertEquals(hasSpaceBefore, true)
})

