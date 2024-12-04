export function makeWordSearch(input: string): string[][] {
  return input.split("\n").map((line) =>
    line.split("").filter((char) => /\w/.test(char))
  ).filter((line) => line.length);
}

export function hasSpace({
  x,
  y,
  width,
  height,
  wordLength,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  wordLength: number;
}): Record<string, boolean> {
  const len = wordLength - 1;
  return {
    hasSpaceAbove: y >= len,
    hasSpaceAfter: x < (width - len),
    hasSpaceBelow: y < (height - len),
    hasSpaceBefore: x >= len,
  };
}

const XMAS = "XMAS";
export function partOneSearch(wordSearch: string[][]): number {
  const makeCheck =
    (x: number, y: number) => (xInc: number, yInc: number): number => {
      let found = "X";
      let curX = x;
      let curY = y;
      while (XMAS.startsWith(found)) {
        curX += xInc;
        curY += yInc;
        found += wordSearch[curY][curX];
        // console.log(y, x, yInc, xInc, curY, curX, wordSearch[curY][curX]);
        if (found === XMAS) return 1;
      }
      return 0;
    };

  let count = 0;
  for (let y = 0; y < wordSearch.length; y++) {
    for (let x = 0; x < wordSearch[y].length; x++) {
      if (wordSearch[y][x] !== "X") continue;

      const {
        hasSpaceAbove,
        hasSpaceAfter,
        hasSpaceBelow,
        hasSpaceBefore,
      } = hasSpace({
        x,
        y,
        width: wordSearch[y].length,
        height: wordSearch.length,
        wordLength: XMAS.length,
      });

      const check = makeCheck(x, y);

      if (hasSpaceAbove) {
        //check up
        count += check(0, -1);

        if (hasSpaceBefore) {
          //check diagonal before
          count += check(-1, -1);
        }

        if (hasSpaceAfter) {
          //check diagonal after
          count += check(1, -1);
        }
      }

      if (hasSpaceBelow) {
        //check down
        count += check(0, 1);

        if (hasSpaceBefore) {
          //check diagonal before
          count += check(-1, 1);
        }

        if (hasSpaceAfter) {
          //check diagonal after
          count += check(1, 1);
        }
      }

      if (hasSpaceAfter) {
        // check after
        count += check(1, 0);
      }

      if (hasSpaceBefore) {
        // check before
        count += check(-1, 0);
      }
    }
  }
  return count;
}

export function partTwoSearch(wordSearch: string[][]): number {
  let count = 0;
  for (let y = 0; y < wordSearch.length; y++) {
    for (let x = 0; x < wordSearch[y].length; x++) {
      if (wordSearch[y][x] !== "A") continue;

      const check = (x: number, y: number): number => {
        return Number([
          `${wordSearch[y - 1][x - 1]}A${wordSearch[y + 1][x + 1]}`,
          `${wordSearch[y - 1][x + 1]}A${wordSearch[y + 1][x - 1]}`,
        ].every((word) => ["MAS", "SAM"].includes(word)));
      };

      const {
        hasSpaceAbove,
        hasSpaceAfter,
        hasSpaceBelow,
        hasSpaceBefore,
      } = hasSpace({
        x,
        y,
        width: wordSearch[y].length,
        height: wordSearch.length,
        wordLength: 2,
      });

      if (hasSpaceAbove && hasSpaceBefore && hasSpaceBelow && hasSpaceAfter) {
        count += check(x, y);
      }
    }
  }
  return count;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const input = Deno.readTextFileSync("input.txt");
  // console.log(partOneSearch(makeWordSearch(input)));
  console.log(partTwoSearch(makeWordSearch(input)));
}
