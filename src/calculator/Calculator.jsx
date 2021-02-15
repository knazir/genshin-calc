import React, { useState } from "react";
import {
  Typography
} from "@material-ui/core";

import CharacterInfo from "./CharacterInfo";
import SkillInfo from "./SkillInfo";
import "./Calculator.css";

const Calculator = ({ data }) => {
  const [characterData, setCharacterData] = useState(data.character || {
    level: 0,
    weaponType: "",
  });
  const [skillData, setSkillData] = useState(data.skill || {
    damage: 0,
    bonusDamage: 0,
    element: "",
    doesShatter: false,
    doesApplyElementalBonus: true
  });

  return (
    <div className="calculator">
      <Typography variant="h3" gutterBottom>Damage Calculator</Typography>
      <div className="characterPanels">
        <CharacterInfo defaultData={characterData} onData={setCharacterData}/>
        <SkillInfo defaultData={skillData} onData={setSkillData}/>
      </div>
    </div>
  );
};

export default Calculator;
