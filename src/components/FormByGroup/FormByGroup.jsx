import React, { useState } from "react";
import MyForm from "../UI/FormWrapper/FormWrapper";
import Select from "../UI/Select/Select";
import FormWrapper from "../UI/FormWrapper/FormWrapper";

const FormByGroup = () => {
  const [group, setGroup] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [curricilium, setCurricilium] = useState("");

  return (
    <FormWrapper title={"Расписание группы"}>
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
      <label>Учебная группа</label>
      <Select
        onChange={setGroup}
        defaultValue={"Группа"}
        options={[
          { value: "ПРО-430Б", name: "ПРО-430Б" },
          { value: "ПРО-431Б", name: "ПРО-431Б" },
          { value: "ПРО-432Б", name: "ПРО-432Б" },
          { value: "ПРО-433Б", name: "ПРО-433Б" },
        ]}
      />
    </FormWrapper>
  );
};

export default FormByGroup;
