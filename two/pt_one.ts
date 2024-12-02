export function getReportsFromInput(path: string): number[][] {
  const file = Deno.readTextFileSync(path);
  const a = file.split("\n").filter(Boolean).map((line) =>
    line.split(" ").map((char) => parseInt(char))
  );
  return a;
}

type Vector = "asc" | "desc";
export function isSafe(report: number[]): boolean {
  let prev: number = -1;
  let vector: Vector | undefined;

  for (const level of report) {
    const currentVector = level > prev ? "asc" : "desc";

    let diff = level - prev;
    if (diff < 0) diff = diff * -1;

    switch (true) {
      case prev === -1:
        prev = level;
        continue;

      case vector && vector !== currentVector:
        return false;

      case diff > 3:
        return false;

      case diff === 0:
        return false;
    }

    prev = level;
    vector = currentVector;
  }

  return true;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const reports = getReportsFromInput("./input.txt");
  const totalSafe = reports.reduce(
    (numSafe, report) => isSafe(report) ? numSafe + 1 : numSafe,
    0,
  );
  console.log(totalSafe)
}
