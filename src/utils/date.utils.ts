export function convertTimestampToDate(timestamp: number) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const date = new Date(timestamp * 1000);
  const month = months[date.getMonth()];
  const day = date.getDate();

  return `${month} ${day}`;
}
