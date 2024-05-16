import React, { useState } from "react";
import FormWrapper from "../UI/FormWrapper/FormWrapper";
import Select from "../UI/Select/Select";

const FormByAuditorium = () => {
  const [auditorium, setAuditorium] = useState("");

  return (
    <FormWrapper title={"Расписание аудитории"}>
      <label>Номер аудитории</label>
      <Select
        onChange={setAuditorium}
        defaultValue={"Аудитория"}
        options={[{ value: "Иванов И.И.", name: "Иванов И.И." }]}
      />
    </FormWrapper>
  );
};

export default FormByAuditorium;
