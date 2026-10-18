// Date → "YYYY-MM-DDTHH:mm" in the browser's local time, as <input type="datetime-local"> expects
export const toLocalInput = (date: Date) =>
  new Date(date.getTime() - date.getTimezoneOffset() * 60_000).toISOString().slice(0, 16)
