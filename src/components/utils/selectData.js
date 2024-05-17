import { SLOT_TIME_NUMBER } from "./consts";

export const groupOptions = [
  { value: "ПРО-430Б", name: "ПРО-430Б" },
  { value: "ПРО-431Б", name: "ПРО-431Б" },
  { value: "ПРО-432Б", name: "ПРО-432Б" },
  { value: "ПРО-433Б", name: "ПРО-433Б" },
];

export const teacherOptions = [
  { value: "Иванов И.В.", name: "Иванов И. В." },
  { value: "Васильев В.В.", name: "Васильев В.В." },
  { value: "Грачев Г.Г.", name: "Грачев Г.Г." },
];

export const typeOptions = [
  { value: "lecture", name: "Лекция" },
  { value: "practice", name: "Практика" },
  { value: "laboratory", name: "Лабораторная" },
];

export const disciplineOptions = [
  { value: "Программирование", name: "Программирование" },
  { value: "Философия", name: "Философия" },
  {
    value: "Средства вычислительной техники",
    name: "Средства вычислительной техники",
  },
];

export const auditoriumOptions = [
  { value: "4-513", name: "4-513" },
  { value: "4-515", name: "4-515" },
];

export const dayOptions = [
  { value: "monday", name: "Пн" },
  { value: "tuesday", name: "Вт" },
  { value: "wednesday", name: "Ср" },
  { value: "thursday", name: "Чт" },
  { value: "friday", name: "Пт" },
  { value: "saturday", name: "Сб" },
];

export const timeOptions = Object.keys(SLOT_TIME_NUMBER).map((option) => ({
  value: option,
  name: `${option} пара ${SLOT_TIME_NUMBER[option]}`,
}));
