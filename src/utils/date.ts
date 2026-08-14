export const parseDateToTimestamp = (dateStr: string | undefined | null): number => {
  if (!dateStr) return 0;

  if (dateStr.includes("T") || !isNaN(Date.parse(dateStr))) {
    const timestamp = new Date(dateStr).getTime();
    if (!isNaN(timestamp)) return timestamp;
  }

  const parts = dateStr.split(/[/\\-]/);
  if (parts.length >= 2) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    let year = parts[2] ? parseInt(parts[2], 10) : new Date().getFullYear();
    if (year < 100) year += 2000;

    return new Date(year, month, day).getTime();
  }

  return 0;
};

export const formatDate = (dateStr: string | undefined | null): string => {
  if (!dateStr) return "";

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
