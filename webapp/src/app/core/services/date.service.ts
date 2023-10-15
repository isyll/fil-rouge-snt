export function time2Number(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function difference(time1: string, time2: string, str = false) {
  const [time1Hours, time1minutes] = time1.split(':').map(Number);
  const [time2Hours, time2minutes] = time2.split(':').map(Number);

  const differenceInMinutes =
      time2Hours * 60 + time2minutes - (time1Hours * 60 + time1minutes),
    hours = Math.floor(differenceInMinutes / 60);

  const minutes = differenceInMinutes % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0'
  )}`;
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const result = `${year}/${month}/${day}`;

  return result;
}
