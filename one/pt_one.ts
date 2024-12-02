/// <reference lib="deno.ns" />

export type Arrays = [number[], number[]]
export function createArrayFromFile(path: string): Arrays {
  const file = Deno.readTextFileSync(path);

  const arrA: number[] = []
  const arrB: number[] = []

  for (const line of file.split('\n')) {
    const [a, b] = line.split(/\s+/)

    if(a === '' || b === '') continue;

    arrA.push(parseInt(a))
    arrB.push(parseInt(b))
  }

  return [arrA, arrB]
}

export function calculateDiffs(arrays: Arrays): number {
  const [a, b] = arrays;
  const c = a.sort()
  const d = b.sort()
  let total = 0
  for(let i = 0; i < a.length; i++) {
    let diff = c[i] - d[i]
    if(diff < 0) diff = diff * -1
    total += diff
  }
  return total
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const arrays = createArrayFromFile('input.txt')
  const diff = calculateDiffs(arrays)
  console.log(diff)
}
