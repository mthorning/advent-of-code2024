import { assertEquals } from "@std/assert";
import { calcInstruction } from "./main.ts";

const instruction = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))'

Deno.test(function addTest() {
  assertEquals(calcInstruction(instruction), 161);
});
