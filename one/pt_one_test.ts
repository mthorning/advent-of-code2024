import { assertEquals } from "@std/assert";
import { calculateDiffs, createArrayFromFile } from "./pt_one.ts";

const arrays = [[3, 4, 2, 1, 3, 3], [4, 3, 5, 3, 9, 3]] as const

Deno.test(function readFromFileTest() {
  const output = createArrayFromFile('input_test') 
  assertEquals(output, arrays);
})

Deno.test(function diffsTest() {
  assertEquals(calculateDiffs(arrays), 11);
});
