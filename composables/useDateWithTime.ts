export function useDateWithTime(milliseconds: number) {
  return useDateFormat(milliseconds, 'YYYY-MM-DD HH:mm:ss')
}
