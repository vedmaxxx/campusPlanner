import { makeAutoObservable } from "mobx";

class GlobalScheduleStore {
  schedulesList = [];

  constructor() {
    makeAutoObservable(this);
    this.schedulesList = [
      {
        id: crypto.randomUUID(),
        curricilium: 1,
        semester: 2,
        group: "ПРО-430Б",
        weeksNumber: 21,
        weeks: [
          {
            id: 1,
            number: 1,
            dayslots: [
              {
                id: 1,
                day: "monday",
                date: new Date(2024, 1, 5),
                slots: [
                  {
                    id: 0,
                    number: 1,
                    type: "practice",
                    discipline: "Программирование",
                    auditorium: "6-204",
                    teacher: "Иванов И.И.",
                  },
                  {
                    id: 1,
                    number: 2,
                    type: "lecture",
                    discipline: "Философия",
                    auditorium: "6-202",
                    teacher: "",
                  },
                  {
                    id: 2,
                    number: 3,
                    type: "practice",
                    discipline: "Программирование",
                    auditorium: "6-204",
                    teacher: "",
                  },
                ],
              },
              {
                id: 2,
                day: "tuesday",
                date: new Date(2024, 1, 6),
                slots: [
                  {
                    id: 5,
                    number: 1,
                    type: "practice",
                    discipline: "Программирование",
                    auditorium: "6-204",
                    teacher: "",
                  },
                  {
                    id: 6,
                    number: 2,
                    type: "lecture",
                    discipline: "Философия",
                    auditorium: "6-202",
                    teacher: "",
                  },
                  {
                    id: 7,
                    number: 3,
                    type: "practice",
                    discipline: "Программирование",
                    auditorium: "6-204",
                    teacher: "",
                  },
                ],
              },
              {
                id: 3,
                day: "wednesday",
                date: new Date(2024, 1, 7),
                slots: [],
              },
              {
                id: 4,
                day: "thursday",
                date: new Date(2024, 1, 8),
                slots: [],
              },
              {
                id: 5,
                day: "friday",
                date: new Date(2024, 1, 9),
                slots: [],
              },
              {
                id: 6,
                day: "saturday",
                date: new Date(2024, 1, 10),
                slots: [],
              },
            ],
          },
          {
            id: 1,
            number: 2,
            dayslots: [
              {
                id: 1,
                day: "monday",
                date: new Date(2024, 3, 29),
                slots: [
                  {
                    id: 0,
                    number: 1,
                    type: "practice",
                    discipline: "Программирование",
                    auditorium: "6-204",
                    teacher: "Иванов И.И.",
                  },
                  {
                    id: 1,
                    number: 2,
                    type: "lecture",
                    discipline: "Философия",
                    auditorium: "6-202",
                    teacher: "",
                  },
                  {
                    id: 2,
                    number: 3,
                    type: "practice",
                    discipline: "Программирование",
                    auditorium: "6-204",
                    teacher: "",
                  },
                ],
              },
              {
                id: 2,
                day: "tuesday",
                date: new Date(2024, 3, 30),
                slots: [
                  {
                    id: 5,
                    number: 1,
                    type: "practice",
                    discipline: "Программирование",
                    auditorium: "6-204",
                    teacher: "",
                  },
                  {
                    id: 6,
                    number: 2,
                    type: "lecture",
                    discipline: "Философия",
                    auditorium: "6-202",
                    teacher: "",
                  },
                  {
                    id: 7,
                    number: 3,
                    type: "practice",
                    discipline: "Программирование",
                    auditorium: "6-204",
                    teacher: "",
                  },
                ],
              },
              {
                id: 3,
                day: "wednesday",
                date: new Date(2024, 4, 1),
                slots: [],
              },
              {
                id: 4,
                day: "thursday",
                date: new Date(2024, 4, 2),
                slots: [],
              },
              {
                id: 5,
                day: "friday",
                date: new Date(2024, 4, 3),
                slots: [],
              },
              {
                id: 6,
                day: "saturday",
                date: new Date(2024, 4, 4),
                slots: [],
              },
            ],
          },

          {
            id: 3,
            number: 3,
            dayslots: [
              {
                id: 1,
                day: "monday",
                date: new Date(2024, 4, 6),
                slots: [
                  {
                    id: 1,
                    number: 2,
                    day: "monday",
                    type: "lecture",
                    discipline: "Философия",
                    auditorium: "6-202",
                    teacher: "",
                  },
                  {
                    id: 2,
                    number: 3,
                    day: "monday",
                    type: "practice",
                    discipline: "Программирование",
                    auditorium: "6-204",
                    teacher: "",
                  },
                ],
              },
              {
                id: 2,
                day: "tuesday",
                date: new Date(2024, 4, 7),
                slots: [
                  {
                    id: 5,
                    number: 1,
                    day: "monday",
                    type: "practice",
                    discipline: "Программирование",
                    auditorium: "6-204",
                    teacher: "",
                  },
                  {
                    id: 6,
                    number: 2,
                    day: "monday",
                    type: "lecture",
                    discipline: "Философия",
                    auditorium: "6-202",
                    teacher: "",
                  },
                  {
                    id: 7,
                    number: 3,
                    day: "monday",
                    type: "practice",
                    discipline: "Программирование",
                    auditorium: "6-204",

                    teacher: "",
                  },
                ],
              },
              {
                id: 3,
                slots: [],
                day: "wednesday",
                date: new Date(2024, 4, 8),
              },
              {
                id: 4,
                slots: [],
                day: "thursday",
                date: new Date(2024, 4, 9),
              },
              {
                id: 5,
                slots: [],
                day: "friday",
                date: new Date(2024, 4, 10),
              },
              {
                id: 6,
                slots: [],
                day: "saturday",
                date: new Date(2024, 4, 11),
              },
            ],
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        curricilium: 1,
        semester: 1,
        group: "ПРО-433Б",
        weeksNumber: 21,
      },
    ];
  }

  setSchedulesList = (list) => {
    this.schedulesList = list;
  };

  findScheduleByGroup = (group, semester, curricilium) => {
    const sched = this.schedulesList.find(
      (schedule) =>
        schedule.group === group &&
        schedule.semester === semester &&
        schedule.curricilium === curricilium
    );
    console.log(sched);
    return sched;
  };
}

export default new GlobalScheduleStore();
