import { SLOT_TIME_NUMBER } from "./consts";

export const groupOptions = [
  { value: "ПРО-430Б", name: "ПРО-430Б" },
  { value: "ПРО-431Б", name: "ПРО-431Б" },
  { value: "ПРО-432Б", name: "ПРО-432Б" },
  { value: "ПРО-433Б", name: "ПРО-433Б" },
];

export const teacherOptions = [
  { value: "de31fee9-3c39-440a-821d-ff6a7f72fee5", name: "Иванов И.В." },
  { value: "f760f174-c446-450d-a4c1-c4852c52b999", name: "Куценко Г.Д." },
  { value: "Грачев Г.Г.", name: "Грачев Г.Г." },
];

export const typeOptions = [
  { value: "lecture", name: "Лекция" },
  { value: "practice", name: "Практика" },
  { value: "laboratory", name: "Лабораторная" },
];

export const disciplineOptions = [
  { value: "d5bb972c-ddc2-419d-af7a-31557a77b644", name: "Программирование" },
  { value: "2ddfbeae-4312-4762-9f33-d1db952530bd", name: "Философия" },
];

// export const disciplineOptions = [];

export const auditoriumOptions = [
  { value: "13e482c2-0ce9-4db0-912e-9376df978561", name: "6-202" },
  { value: "3cf13fca-3eb9-45ad-8051-e16683645aaa", name: "6-417а" },
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
