export function calcInstruction(instruction: string): number {
  const re = /mul\((?<a>\d{1,3}),(?<b>\d{1,3})\)/g
  let sum = 0;
  let match;
  while ((match = re.exec(instruction)) !== null) {
    const { a: aStr, b: bStr } = match?.groups ?? {}
    const a = parseInt(aStr)
    const b = parseInt(bStr)
    if(![a, b].every(num => Number.isNaN(num))) {
      sum += (a * b)
    }
  }
  return sum
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const file = Deno.readTextFileSync('./input.txt')
  // console.log(file)
  console.log(calcInstruction(file))
}
