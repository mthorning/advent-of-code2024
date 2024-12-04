function getValue(match: RegExpExecArray): number {
  const { a: aStr, b: bStr } = match?.groups ?? {};
  const a = parseInt(aStr);
  const b = parseInt(bStr);

  if (![a, b].every((num) => Number.isNaN(num))) {
    return a * b;
  }
  return 0;
}
export function partOne(input: string) {
  const re = /mul\((?<a>\d{1,3}),(?<b>\d{1,3})\)/g;

  let sum = 0;
  let match: ReturnType<typeof re.exec>;
  while ((match = re.exec(input)) !== null) {
    sum += getValue(match);
  }
  return sum;
}

export function splitParts(input: string): [string, string] {
  const re = /mul\(\d{1,3},\d{1,3}\)/d;
  const match = re.exec(input);
  if (!match?.indices) return ["", ""];

  return [
    input.slice(0, match.indices[0][1]),
    input.slice(match.indices[0][1]),
  ];
}

export function partTwo(input: string, sum = 0, does = true): number {
  if (input.length === 0) return sum;

  const [slice, remainder] = splitParts(input);

  const cont = () => { 
    const re = /mul\((?<a>\d{1,3}),(?<b>\d{1,3})\)$/;
    const match = re.exec(slice);
    if (match === null) return sum;

    return partTwo(remainder, sum + getValue(match), true);
  }

  if (!does) {
    //in don't mode and just found a do
    if(/do\(\)/.test(slice)) {
      return cont()
    }

    // in don't mode and just found a don't
    return partTwo(remainder, sum, false);
  }

  if(does && /don't\(\)/.test(slice)) {
    return partTwo(remainder, sum, false);
  } 

  return cont()
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const input = Deno.readTextFileSync("./input.txt");
  console.log(partOne(input));

  console.log(partTwo(input));
}
