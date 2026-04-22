// Warming ramp schedule
// Days since warmup start → daily send limit
// Starts at 20/day with warm contacts, ramps up over 3 weeks

const WARMUP_SCHEDULE: { day: number; limit: number }[] = [
  { day: 1,  limit: 20  },
  { day: 4,  limit: 40  },
  { day: 8,  limit: 75  },
  { day: 15, limit: 150 },
  { day: 22, limit: 250 },
];

export function getDailyLimitForDay(dayNumber: number): number {
  let limit = WARMUP_SCHEDULE[0].limit;
  for (const entry of WARMUP_SCHEDULE) {
    if (dayNumber >= entry.day) {
      limit = entry.limit;
    }
  }
  return limit;
}

export function getDaysSinceStart(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
}

export function isWarmed(dayNumber: number): boolean {
  return dayNumber >= 22;
}
