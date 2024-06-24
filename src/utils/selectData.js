import { SLOT_TIME_NUMBER } from "./consts";

export const typeOptions = [
  { value: "lecture", name: "Лекция" },
  { value: "practice", name: "Практика" },
  { value: "laboratory", name: "Лабораторная" },
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
