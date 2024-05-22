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

export const insertWeeksInEmptySlots = (schedule) => {
  console.log(schedule);
  const emptyWeeks = generateWeeks(schedule.semester, schedule.weeksNumber);
  if (schedule.weeks.length === 0) {
    schedule.weeks = emptyWeeks;
  } else {
    // сортируем недели по номеру
    // schedule.weeks.sort((a, b) => a.number - b.number);

    // находим первый и последний дни входящего расписания
    let firstDayOfFirstWeek = schedule.weeks[0].dayslots[0];
    let lastWeekIndex = schedule.weeks.length - 1;
    let lastDayOfLastWeek =
      schedule.weeks[lastWeekIndex].dayslots[
        schedule.weeks[lastWeekIndex].dayslots.length - 1
      ];

    firstDayOfFirstWeek = new Date(firstDayOfFirstWeek.date);
    lastDayOfLastWeek = new Date(lastDayOfLastWeek.date);

    let emptyWeekIndex = emptyWeeks.length - 1;
    let dayslotIndex = emptyWeeks[emptyWeekIndex].dayslots.length - 1;

    console.log("Первый день пришедшего расписания:", firstDayOfFirstWeek);
    console.log("Последний день пришедшего расписания:", lastDayOfLastWeek);

    console.log(
      "Первый день сформированного семестра:",
      emptyWeeks[0].dayslots[0].date
    );
    console.log(
      "Последний день сформированного расписания:",
      emptyWeeks[emptyWeekIndex].dayslots[dayslotIndex].date
    );

    // если расписание начинается раньше - скип
    if (
      firstDayOfFirstWeek.getTime() < emptyWeeks[0].dayslots[0].date.getTime()
    ) {
      console.log("Даты расписания некорректны");
      console.log("Начало семестра ", firstDayOfFirstWeek);
      return;
    }
    // если расписание кончается позже - скип
    if (
      lastDayOfLastWeek.getTime() >
      emptyWeeks[emptyWeekIndex].dayslots[dayslotIndex].date.getTime()
    ) {
      console.log("Даты расписания некорректны");
      console.log("Начало семестра ", lastDayOfLastWeek);
      return;
    }

    let weeks = [];

    for (let i = 0; i < schedule.weeks.length; i++) {
      let firstDayOfWeek = schedule.weeks[i].dayslots[0].date;
      weeks = emptyWeeks.map((week) => {
        if (week.dayslots[0].date.getTime() === firstDayOfWeek.getTime()) {
          console.log("равен");
          const newWeek = { ...week, dayslots: schedule.weeks[i].dayslots };

          return newWeek;
        } else return week;
      });

      // tempWeek.dayslots = schedule.weeks[i].dayslots;
    }
    return weeks;
  }

  return emptyWeeks;
};
