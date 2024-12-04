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
}: {
  x: number;
  y: number;
  width: number;
  height: number;
}): Record<string, boolean> {
  // console.log('width', width, 'height', height)
  return {
    hasSpaceAbove: y > 2,
    hasSpaceAfter: x < (width - 3),
    hasSpaceBelow: y < (height - 3),
    hasSpaceBefore: x > 2,
  };
}

const XMAS = "XMAS";
export function search(wordSearch: string[][]): number {
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
      });

      /* console.log(y, hasSpaceAbove, hasSpaceBelow);
      console.log(x, hasSpaceBefore, hasSpaceAfter); */

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

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const input = Deno.readTextFileSync("input.txt");
  console.log(search(makeWordSearch(input)));
}
