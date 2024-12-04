import { assertEquals } from "@std/assert";
import { partOne, partTwo, splitParts } from "./main.ts";

Deno.test(function partOneTest() {
  const instruction = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))'
  assertEquals(partOne(instruction), 161);
});

Deno.test(function splitPartsTest() {
  const [slice, remainder] = splitParts(`xxdo()xxmul(2,2)xxxdon't()xxmul(1,1)xxdo()`)
  assertEquals(slice, 'xxdo()xxmul(2,2)');
  assertEquals(remainder, `xxxdon't()xxmul(1,1)xxdo()`)
  assertEquals(splitParts(remainder)[0], `xxxdon't()xxmul(1,1)`)
})

Deno.test(function splitPartsExitTest() {
  let remainder = splitParts(`do()mul(2,2)don't()mul(1,1)xx`)[1]
  assertEquals(remainder,`don't()mul(1,1)xx`)

  remainder = splitParts(remainder)[1]
  assertEquals(remainder,`xx`)

  remainder = splitParts(remainder)[1]
  assertEquals(remainder, '')
});

Deno.test(function partTwoTest() {
  const instruction = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`
  assertEquals(partTwo(instruction), 48);
});
