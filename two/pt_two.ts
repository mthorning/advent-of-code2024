import { analyseReport, runReports } from "./pt_one.ts";

export function isSafe(report: number[]): boolean {
  if (analyseReport(report) === -1) return true;

  for (let i = 0; i < report.length; i++) {
    const shortReport = [...report]
    shortReport.splice(i, 1);
    if (analyseReport(shortReport) === -1) return true;
  }
  return false;
}

if (import.meta.main) {
  runReports(isSafe);
}
