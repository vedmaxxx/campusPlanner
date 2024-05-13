import React, { useState } from "react";
import FormWrapper from "../UI/FormWrapper/FormWrapper";
import Select from "../UI/Select/Select";

const FormByTeacher = () => {
  const [teacher, setTeacher] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [curricilium, setCurricilium] = useState("");

  return (
    <FormWrapper title={"Расписание преподавателя"}>
      <label>ФИО преподавателя</label>
      <Select
        onChange={setTeacher}
        defaultValue={"Преподаватель"}
        options={[{ value: "Иванов И.И.", name: "Иванов И.И." }]}
      />
      <label>Учебный план</label>
      <Select
        onChange={setCurricilium}
        defaultValue={"Номер учебного плана"}
        options={[
          { value: "38.03.05 БИ БА 3 2021", name: "38.03.05 БИ БА 3 2021" },
          {
            value: "38.03.06 БП БА 3 2021",
            name: "38.03.06 БП БА 3 2021",
          },
        ]}
      />
      <label>Факультет</label>
      <Select
        onChange={setFaculty}
        defaultValue={"Факультет"}
        options={[
          { value: "ИИМРТ", name: "ИИМРТ" },
          { value: "ФАДЭТ", name: "ФАДЭТ" },
        ]}
      />
      <label>Кафедра</label>
      <Select
        onChange={setDepartment}
        defaultValue={"Кафедра"}
        options={[
          { value: "ВМиК", name: "ВМиК" },
          { value: "ИИиМО", name: "ИИиМО" },
        ]}
      />
    </FormWrapper>
  );
};

export default FormByTeacher;
