export function toArray(input: string, delimitter: string): string[][] {
  return input.split("\n").map((line) => line.split(delimitter).filter(Boolean))
    .filter((line) => line.length);
}

export function isCorrectlyOrdered(
  pages: string[],
  rules: string[][],
): boolean {
  for (const [before, after] of rules) {
    const beforeIdx = pages.indexOf(before);
    const afterIdx = pages.indexOf(after);
    if (beforeIdx === -1 || afterIdx === -1) continue;
    if (beforeIdx > afterIdx) return false;
  }
  return true;
}

export function findMiddlePage(pages: string[]): string {
  return pages[Math.floor(pages.length / 2)];
}

export function parseInput(
  input: string,
): Record<"rules" | "pagesList", Array<string[]>> {
  const rules: string[][] = [];
  const pagesList: string[][] = [];

  for (const line of input.split("\n\n")) {
    if (line.includes("|")) rules.push(...toArray(line, "|"));
    if (line.includes(",")) pagesList.push(...toArray(line, ","));
  }

  return { rules, pagesList };
}

export function partOne(input: string) {
  const { rules, pagesList } = parseInput(input);

  const middlePages: number[] = [];
  for (let i = 0; i < pagesList.length; i++) {
    const pages = pagesList[i];
    if (isCorrectlyOrdered(pages, rules)) {
      middlePages.push(Number(findMiddlePage(pages)));
    }
  }

  return middlePages.reduce((acc, cur) => acc += cur, 0);
}

if (import.meta.main) {
  const input = Deno.readTextFileSync("input.txt");
  console.log(partOne(input));
}
