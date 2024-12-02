import { runReports, analyseReport  } from './pt_one.ts'

export function isSafe(report: number[]): boolean {
  let result = analyseReport(report)
  if(result > -1) {
    report.splice(result, 1)
    result = analyseReport(report)
  }
  return result === -1;
} 

if (import.meta.main) {
  runReports(isSafe)
}
