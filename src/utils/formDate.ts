function addZero(num: number): string {
  if (num > 9) {
    return String(num);
  }
  return `0${num}`;
}

export function formatDate(date: Date): string {
  const result = `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${
    addZero(date.getDate())} ${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
  return result;
}

export default function formDate(date: string, timeZone: string): string {
  const dateRes = new Date(date);
  const moveTime = Number(timeZone) - new Date().getTimezoneOffset() / 60;
  dateRes.setHours(dateRes.getHours() + moveTime);
  return formatDate(dateRes);
}
