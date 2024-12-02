import { assertEquals } from "@std/assert";
import { calculateDiffs, createArrayFromFile, type Arrays } from "./pt_one.ts";

const arrays: Arrays = [[3, 4, 2, 1, 3, 3], [4, 3, 5, 3, 9, 3]]

Deno.test(function readFromFileTest() {
  const output = createArrayFromFile('input_test.txt') 
  assertEquals(output, arrays);
})

Deno.test(function diffsTest() {
  assertEquals(calculateDiffs(arrays), 11);
});
