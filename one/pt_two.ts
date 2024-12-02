import { createArrayFromFile } from './pt_one.ts'

export type Arrays = [number[], number[]]
export function calculateSimilarities(arrays: Arrays): number {
  const [source, comparator] = arrays
  comparator.sort()

  let score = 0
  for (const num of source) {
    let multiplier = 0;
    for (const comp of comparator) {
      if (comp === num) multiplier++
      if (comp > num) break;
    }
    score += num * multiplier
  }

  return score
}

if (import.meta.main) {
  const arrays = createArrayFromFile('input.txt')
  const similiarityScore = calculateSimilarities(arrays)
  console.log(similiarityScore)
}
