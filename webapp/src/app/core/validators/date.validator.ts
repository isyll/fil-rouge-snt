export function dateValidator(control: any) {
  if (!DATE_REGEXP.test(control.value)) return { invalidDate: true };

  const inputDate = new Date(control.value);

  if (isNaN(inputDate.getTime())) return { invalidDate: true };

  return null;
}

export function validateTime(time: string): boolean {
  for (const t of time.split(':')) if (t.match(/^\d+$/) === null) return false;

  const [hours, minutes] = time.split(':').map(Number);

  if (hours >= 24 || hours < 0) return false;
  if (minutes >= 60 || minutes < 0) return false;

  return true;
}

export const TIME_REGEXP = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
export const DATE_REGEXP = /^\d{4}\/\d{2}\/\d{2}$/;
