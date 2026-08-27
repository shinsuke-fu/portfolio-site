import { logEntries } from "@/data/log";
import type { LogEntry } from "@/types/log";

export async function getLogEntries(): Promise<LogEntry[]> {
  return logEntries;
}
