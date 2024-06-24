export const getFormattedDate = () => {
  const date = new Date();

  // Get day with suffix
  const day = date.getDate();
  let daySuffix;
  if (day % 10 === 1 && day !== 11) {
    daySuffix = "st";
  } else if (day % 10 === 2 && day !== 12) {
    daySuffix = "nd";
  } else if (day % 10 === 3 && day !== 13) {
    daySuffix = "rd";
  } else {
    daySuffix = "th";
  }

  // Get month name
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];

  // Get year
  const year = date.getFullYear();

  // Combine parts
  return `${day}${daySuffix}, ${month} ${year}`;
};
