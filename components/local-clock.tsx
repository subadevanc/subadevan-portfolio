"use client";

import { useEffect, useState } from "react";

export function LocalClock({ timeZone, suffix }: { timeZone: string; suffix: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return (
    <span className="tabular-nums" aria-label={time ? `Local time ${time} ${suffix}` : undefined}>
      {time ?? "--:--"} {suffix}
    </span>
  );
}
