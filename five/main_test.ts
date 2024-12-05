import { assertEquals } from "@std/assert";
import {
  findMiddlePage,
  isCorrectlyOrdered,
  parseInput,
  partOne,
  toArray,
} from "./main.ts";

const rules = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13
`;

Deno.test(function rulesToArrayTest() {
  assertEquals(
    toArray(
      `
47|53
97|13
`,
      "|",
    ),
    [["47", "53"], ["97", "13"]],
  );
});

Deno.test(function pagesToArrayTest() {
  assertEquals(
    toArray(
      `
47,53
97,13
`,
      ",",
    ),
    [["47", "53"], ["97", "13"]],
  );
});

Deno.test(function isPagesOrderedTest() {
  //Good
  assertEquals(
    isCorrectlyOrdered("75,47,61,53,29".split(","), toArray(rules, "|")),
    true,
  );
  assertEquals(
    isCorrectlyOrdered("97,61,53,29,13".split(","), toArray(rules, "|")),
    true,
  );
  assertEquals(
    isCorrectlyOrdered("75,29,13".split(","), toArray(rules, "|")),
    true,
  );

  //Bad
  assertEquals(
    isCorrectlyOrdered("75,97,47,61,53".split(","), toArray(rules, "|")),
    false,
  );
  assertEquals(
    isCorrectlyOrdered("61,13,29".split(","), toArray(rules, "|")),
    false,
  );
  assertEquals(
    isCorrectlyOrdered("97,13,75,29,47".split(","), toArray(rules, "|")),
    false,
  );
});

Deno.test(function findMiddlePageTest() {
  assertEquals(findMiddlePage(["97", "13", "75", "29", "47"]), "75");
});

Deno.test(function findMiddlePageTest() {
  assertEquals(findMiddlePage(["97", "13", "75", "29", "47"]), "75");
});

Deno.test(function parseInputTest() {
  const { rules, pagesList } = parseInput(`
41|47

97,12
`);
  assertEquals(rules, [["41", "47"]]);
  assertEquals(pagesList, [["97", "12"]]);
});

Deno.test(function partOneTest() {
  const input = Deno.readTextFileSync("input_test.txt");
  const output = partOne(input);
  assertEquals(output, 143);
});
