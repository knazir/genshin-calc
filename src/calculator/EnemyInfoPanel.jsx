import React, { useEffect, useState } from "react";
import {
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";

const EnemyInfoPanel = ({ defaultData, onData }) => {
  // State
  const [level, setLevel] = useState(defaultData.level);
  const [elementalRes, setElementalRes] = useState(defaultData.elementalRes);
  const [elementalResReduction, setElementalResReduction] = useState(defaultData.elementalResReduction);
  const [defenseReduction, setDefenseReduction] = useState(defaultData.defenseReduction);

  // Effects
  useEffect(() => {
    onData({ level, elementalRes, elementalResReduction, defenseReduction });
  }, [level, elementalRes, elementalResReduction, defenseReduction]);

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
    </Paper>
  );
};

export default EnemyInfoPanel;
