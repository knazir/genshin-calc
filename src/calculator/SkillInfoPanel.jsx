import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";

import elements from "../data/elements";

import DamageUtils from "../utils/DamageUtils";
import StringUtils from "../utils/StringUtils";

const SkillInfoPanel = ({ defaultData, onData, elementalBonus }) => {
  // State
  const [damage, setDamage] = useState(defaultData.damage);
  const [bonusDamage, setBonusDamage] = useState(defaultData.bonusDamage);
  const [element, setElement] = useState(defaultData.element);
  const [doesShatter, setDoesShatter] = useState(defaultData.doesShatter);
  const [doesApplyElementalBonus, setDoesApplyElementalBonus] = useState(defaultData.doesApplyElementalBonus);
  const [totalDamage, setTotalDamage] = useState(DamageUtils.getTotalSkillDamage(damage, bonusDamage, elementalBonus,
                                                                                 doesApplyElementalBonus));

  // Effects
  useEffect(() => {
   setTotalDamage(DamageUtils.getTotalSkillDamage(damage, bonusDamage, elementalBonus, doesApplyElementalBonus));
  }, [damage, bonusDamage, elementalBonus, doesApplyElementalBonus]);
  useEffect(() => {
    onData({ damage, bonusDamage, element, doesShatter, doesApplyElementalBonus, totalDamage });
  }, [damage, bonusDamage, element, doesShatter, doesApplyElementalBonus, totalDamage]);

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
  const elementItems = Object.entries(elements).map(([elId, elName]) => {
    return <MenuItem key={elId} value={elId}>{StringUtils.capitalize(elName)}</MenuItem>;
  });
  const doesShatterCheckbox = <Checkbox checked={doesShatter} onChange={onDoesShatter}/>;
  const doesApplyElementalBonusCheckbox = <Checkbox checked={doesApplyElementalBonus}
                                                    onChange={onDoesApplyElementalBonus}/>;

  return (
    <Paper className="formPanel">
      <Typography variant="h5">Skill Info</Typography>
      <TextField id="skillDamage" label="Damage (%)" type="number" value={damage} onChange={onDamage}/>
      <TextField id="bonusDamage" label="Bonus Damage (%)" type="number" value={bonusDamage} onChange={onBonusDamage}/>
      <FormControl>
        <InputLabel id="elementLabel">Element</InputLabel>
        <Select id="element" labelId="elementLabel" value={element} onChange={onElement}>
          {elementItems}
        </Select>
      </FormControl>
      <FormControlLabel control={doesShatterCheckbox} label="Damage Shatters"/>
      <FormControlLabel control={doesApplyElementalBonusCheckbox} label="Apply Elemental Bonus"/>
      <Divider className="panelDivider"/>
      <TextField readOnly disabled id="totalDamage" label="Total Damage (%)" type="number" value={totalDamage}/>
    </Paper>
  );
};

export default SkillInfoPanel;
