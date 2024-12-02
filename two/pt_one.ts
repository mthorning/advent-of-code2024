export function getReportsFromInput(path: string): number[][] {
  const file = Deno.readTextFileSync(path);
  const a = file.split("\n").filter(Boolean).map((line) =>
    line.split(" ").map((char) => parseInt(char))
  );
  return a;
}

type Vector = "asc" | "desc";
export function analyseReport(report: number[]): number {
  let prev: number = -1;
  let vector: Vector | undefined;

  for (let i = 0; i < report.length; i++) {
    const level = report[i];
    const currentVector = level > prev ? "asc" : "desc";

    let diff = level - prev;
    if (diff < 0) diff = diff * -1;

    switch (true) {
      case prev === -1:
        prev = level;
        continue;

      case vector && vector !== currentVector:
        return i;

      case diff > 3:
        return i;

      case diff === 0:
        return i;
    }

    prev = level;
    vector = currentVector;
  }

  return -1;
}

export function isSafe(report: number[]): boolean {
  return analyseReport(report) === -1
}

export function runReports(checkIfSafe = isSafe) {
  const reports = getReportsFromInput("./input.txt");
  const totalSafe = reports.reduce(
    (numSafe, report) => checkIfSafe(report) ? numSafe + 1 : numSafe,
    0,
  );
  console.log(totalSafe)
}

if (import.meta.main) {
  runReports();
}
