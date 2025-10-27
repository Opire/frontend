export function getRelativeTime(date: Date) {
  const rtf = new Intl.RelativeTimeFormat('en', {
    numeric: 'auto',
    style: 'long',
  });

  const units: {
    [key: string]: number;
  } = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: (24 * 60 * 60 * 1000 * 365) / 12,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
  };

  const elapsed: number = date.getTime() - new Date().getTime();

  for (const u in units) {
    if (Math.abs(elapsed) > units[u] || u === 'second') {
      return rtf.format(Math.round(elapsed / units[u]), u as Intl.RelativeTimeFormatUnit);
    }
  }
}
