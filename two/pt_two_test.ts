import { assertEquals } from "@std/assert";
import { isSafe } from "./pt_two.ts";

const reports = [
  [7, 6, 4, 2, 1],
  [1, 2, 7, 8, 9],
  [9, 7, 6, 2, 1],
  [1, 3, 2, 4, 5],
  [8, 6, 4, 4, 1],
  [1, 3, 6, 7, 9],
];

Deno.test(function analyseReportTest() {
  assertEquals(isSafe(reports[0]), true);
  assertEquals(isSafe(reports[1]), false);
  assertEquals(isSafe(reports[2]), false);
  assertEquals(isSafe(reports[3]), true);
  assertEquals(isSafe(reports[4]), true);
  assertEquals(isSafe(reports[5]), true);
});

Deno.test(function allSafeReportsTest() {
  [
    [48, 46, 47, 49, 51, 54, 56],
    [1, 1, 2, 3, 4, 5],
  ].forEach((report) => assertEquals(isSafe(report), true));
});
