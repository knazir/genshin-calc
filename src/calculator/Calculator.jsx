import React, { useState } from "react";
import {
  Typography
} from "@material-ui/core";

import CharacterInfo from "./CharacterInfo";
import "./Calculator.css";

const Calculator = ({ data }) => {
  const [characterData, setCharacterData] = useState(data.character || {
    level: "",
    weaponType: "",
    element: ""
  });

  return (
    <div className="calculator">
      <Typography variant="h3" gutterBottom>Damage Calculator</Typography>
      <CharacterInfo defaultData={characterData} onData={setCharacterData}/>
    </div>
  );
};

export default Calculator;
