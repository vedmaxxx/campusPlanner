import { getDayWeek } from "./date";

// начало 1 семестра - неделя, где есть 1 сентября (если оно не вскр)
// начало 2 семестра - неделя, где есть 1 февраля (если оно не вскр)
export const firstDayOfSemester = {
  1: new Date(2023, 8, 1),
  2: new Date(2024, 1, 1),
};

export const generateWeeks = (semester, weeks_number = 21) => {
  // генерация пустых недель с днями для конкретного семестра и на определенное кол-во недель
  const first_day = firstDayOfSemester[semester];
  let firstDayOfFirstWeek = new Date(first_day);
  const dayOfFirstWeek = (firstDayOfFirstWeek.getDay() - 1) % 7;
  firstDayOfFirstWeek.setDate(firstDayOfFirstWeek.getDate() - dayOfFirstWeek);

  const result = [];

  function incrementDays(date, days) {
    const resultDate = new Date(date);
    resultDate.setDate(resultDate.getDate() + days);
    return resultDate;
  }

  for (let i = 0; i < weeks_number; i++) {
    const week = { id: crypto.randomUUID(), number: i + 1 };
    week.dayslots = [];
    let date = firstDayOfFirstWeek;

    for (let i = 0; i < 6; i++) {
      const temp = incrementDays(firstDayOfFirstWeek, i);

      const dayslot = {
        id: crypto.randomUUID(),
        slots: [],
        date: temp,
        day: getDayWeek(temp),
      };
      week.dayslots.push(dayslot);
    }
    result.push(week);
    firstDayOfFirstWeek = incrementDays(firstDayOfFirstWeek, 7);
  }

  return result;
};

// array - куда вставляем, weeks - что вставляем
export const insertWeeksInArray = (schedule_weeks, weeks) => {
  if (weeks?.length === 0) return schedule_weeks;
  if (weeks?.length > schedule_weeks.length) return schedule_weeks;

  let result = schedule_weeks;
  // находим первый и последний дни входящего расписания
  for (let i = 0; i < weeks?.length; i++) {
    let firstDayOfWeek = weeks[i]?.dayslots[0].date;
    // console.log(firstDayOfWeek);

    result = result.map((w) => {
      if (w.dayslots[0]?.date.getTime() === firstDayOfWeek.getTime()) {
        return { ...w, dayslots: weeks[i].dayslots };
      } else return w;
    });
    // console.log(result);
  }

  return result;
};
