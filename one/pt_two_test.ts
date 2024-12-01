import { assertEquals } from "@std/assert";
import { calculateSimilarities, type Arrays } from "./pt_two.ts";

const arrays: Arrays = [[3, 4, 2, 1, 3, 3], [4, 3, 5, 3, 9, 3]]

Deno.test(function similarityTest() {
  assertEquals(calculateSimilarities(arrays), 31);
});
