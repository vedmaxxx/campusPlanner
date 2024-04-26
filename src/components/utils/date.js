export const dateOptions = {
  day: "numeric",
  month: "long",
};

export const getDayWeek = (date) => {
  const days = ["Вc", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  return days[date.getDay()];
};

export const dataTransform = (date) => {
  const formattedDate = new Intl.DateTimeFormat("ru", dateOptions).format(date);
  return formattedDate;
};
