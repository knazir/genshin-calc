import React, { useEffect, useState } from "react";
import {
  Divider,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";

import DamageUtils from "../utils/DamageUtils";

const EnemyInfoPanel = ({ defaultData, onData, character }) => {
  // State
  const [level, setLevel] = useState(defaultData.level);
  const [elementalRes, setElementalRes] = useState(defaultData.elementalRes);
  const [elementalResReduction, setElementalResReduction] = useState(defaultData.elementalResReduction);
  const [defenseReduction, setDefenseReduction] = useState(defaultData.defenseReduction);
  const [defense, setDefense] = useState(DamageUtils.getEnemyDefense(level));
  const [defenseMult, setDefenseMult] = useState(DamageUtils.getEnemyDefenseMultiplier(character.characterLevel, level, defenseReduction));
  const [resMult, setRestMult] = useState(DamageUtils.getEnemyResistanceMultiplier(elementalRes, elementalResReduction));

  // Effects
  useEffect(() => {
    setDefense(DamageUtils.getEnemyDefense(level));
  }, [level]);
  useEffect(() => {
    setDefenseMult(DamageUtils.getEnemyDefenseMultiplier(character.characterLevel, level, defenseReduction));
  }, [character, level, defenseReduction]);
  useEffect(() => {
    setRestMult(DamageUtils.getEnemyResistanceMultiplier(elementalRes, elementalResReduction));
  }, [elementalRes, elementalResReduction]);
  useEffect(() => {
    onData({ level, elementalRes, elementalResReduction, defenseReduction, defense, defenseMult, resMult });
  }, [level, elementalRes, elementalResReduction, defenseReduction, defense, defenseMult, resMult]);

  // Event Handlers
  const onLevel = e => {
    setLevel(e.target.value === "" ? "" : Number(e.target.value));
  };
  const onElementalRes = e => {
    setElementalRes(e.target.value === "" ? "" : Number(e.target.value));
  };
  const onElementalResReduction = e => {
    setElementalResReduction(e.target.value === "" ? "" : Number(e.target.value));
  };
  const onDefenseReduction = e => {
    setDefenseReduction(e.target.value === "" ? "" : Number(e.target.value));
  };

  return (
    <Paper className="formPanel">
      <Typography variant="h5">Enemy Info</Typography>
      <TextField id="enemyLevel" label="Level" type="number" value={level} onChange={onLevel}/>
      <TextField id="elementalRes" label="Elemental Resistance (%)" type="number" value={elementalRes} onChange={onElementalRes}/>
      <TextField id="elementalResReduction" label="Elemental Resistance Reduction (%)" type="number" value={elementalResReduction}
                 onChange={onElementalResReduction}/>
      <TextField id="defenseReduction" label="Defense Reduction (%)" type="number" value={defenseReduction}
                 onChange={onDefenseReduction}/>
       <Divider className="panelDivider"/>
       <TextField readOnly disabled id="enemyDefense" label="Defense" type="number" value={defense}/>
      <TextField readOnly disabled id="enemyDefenseMult" label="Defense Multiplier" type="number" value={defenseMult}/>
      <TextField readOnly disabled id="enemyResMult" label="Resistance Multiplier" type="number" value={resMult}/>
    </Paper>
  );
};

export default EnemyInfoPanel;
