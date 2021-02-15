import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";

import StringUtils from "../utils/StringUtils";
import elements from "../data/elements";
import "./SkillInfo.css";

const SkillInfo = ({ defaultData, onData }) => {
  // State
  const [damage, setDamage] = useState(defaultData.damage);
  const [bonusDamage, setBonusDamage] = useState(defaultData.bonusDamage);
  const [element, setElement] = useState(defaultData.element);
  const [doesShatter, setDoesShatter] = useState(defaultData.doesShatter);
  const [doesApplyElementalBonus, setDoesApplyElementalBonus] = useState(defaultData.doesApplyElementalBonus);

  // Effects
  useEffect(() => {
    onData({ damage, bonusDamage, element, doesShatter, doesApplyElementalBonus });
  }, [damage, bonusDamage, element, doesShatter, doesApplyElementalBonus, onData]);

  // Event Handlers
  const onDamage = e => {
    setDamage(e.target.value === "" ? "" : Number(e.target.value));
  };
  const onBonusDamage = e => {
    setBonusDamage(e.target.value === "" ? "" : Number(e.target.value));
  };
  const onElement = e => {
    setElement(e.target.value);
  };
  const onDoesShatter = e => {
    setDoesShatter(e.target.checked);
  };
  const onDoesApplyElementalBonus = e => {
    setDoesApplyElementalBonus(e.target.checked);
  };

  // DOM Elements
  const elementTypeItems = elements.elements.map(element => {
    return <MenuItem key={element} value={element}>{StringUtils.capitalize(element)}</MenuItem>;
  });
  const doesShatterCheckbox = <Checkbox checked={doesShatter} onChange={onDoesShatter}/>;
  const doesApplyElementalBonusCheckbox = <Checkbox checked={doesApplyElementalBonus}
                                                    onChange={onDoesApplyElementalBonus}/>;

  return (
    <Paper className="skillInfo">
      <Typography variant="h5">Skill Info</Typography>
      <TextField id="skillDamage" label="Damage (%)" type="number" value={damage} onChange={onDamage}/>
      <TextField id="skillDamage" label="Bonus Damage (%)" type="number" value={bonusDamage} onChange={onBonusDamage}/>
      <FormControl>
        <InputLabel id="elementLabel">Element</InputLabel>
        <Select id="element" labelId="elementLabel" value={element} onChange={onElement}>
          {elementTypeItems}
        </Select>
      </FormControl>
      <FormControlLabel control={doesShatterCheckbox} label="Damage Shatters"/>
      <FormControlLabel control={doesApplyElementalBonusCheckbox} label="Apply Elemental Bonus"/>
    </Paper>
  );
};

export default SkillInfo;
