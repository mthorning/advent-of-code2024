import { assertEquals } from "@std/assert";
import { getReportsFromInput, isSafe } from "./pt_one.ts";

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
  assertEquals(isSafe(reports[3]), false);
  assertEquals(isSafe(reports[4]), false);
  assertEquals(isSafe(reports[5]), true);
});

Deno.test(function parseInputTest() {
  const output = getReportsFromInput("./input_test.txt");
  assertEquals(output, reports);
});
