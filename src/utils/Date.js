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
export const getMonthDay = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  // Function to get ordinal suffix for a day
  function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th'; // Special case for 11th to 20th
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  const dayWithSuffix = day + getOrdinalSuffix(day);

  return ` ${month} ${dayWithSuffix}`;
};

export const isPastDueDate = (dueDate) => {
  const now = new Date();
  const due = new Date(dueDate);
  return due < now;
};
