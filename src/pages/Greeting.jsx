import React from "react";
import NavBar from "../components/NavBar/NavBar";
import MakeScheduleBy from "../components/MakeScheduleBy/MakeScheduleBy";
import NavBarLink from "../components/NavBarLink/NavBarLink";

const Greeting = () => {
  return (
    <>
      <NavBar>
        <NavBarLink to="/greeting">Главная</NavBarLink>
      </NavBar>
      <MakeScheduleBy />
    </>
  );
};

export default Greeting;
