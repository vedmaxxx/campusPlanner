import { SUBJECT_TYPES } from "./consts";

export default function mapScheduleToAPIFormat(schedule, scheduleOptions) {
  const getDateString = (d) => {
    const date = new Date(d);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  };

  const newSchedule = {
    // id: crypto.randomUUID(),
    scheduleId: "be399d0f-bdd0-4530-9997-fa1efef56af6",
    groupId: scheduleOptions.group,
    semesterNumber: Number(scheduleOptions.semester),
    weeks: schedule.weeks.map((week) => ({
      id: week.id,
      weekNumber: week.number,
      classOfWeeks: week.dayslots.map((dayslot) => ({
        id: dayslot.id,
        dayOfWeek: dayslot.date.getDay(),
        date: getDateString(dayslot.date),
        scheduledClasses: dayslot.slots.map((slot) => ({
          id: slot.id,
          classType: Object.keys(SUBJECT_TYPES).indexOf(slot.type),
          classNumber: slot.number,
          subject: slot.discipline,
          teacher: slot.teacher,
          auditorium: slot.auditorium,
        })),
      })),
    })),
  };
  // console.log(JSON.stringify(newSchedule));
  return newSchedule;
}
