import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";

import StringUtils from "../utils/StringUtils";
import weapons from "../data/weapons";
import "./CharacterInfo.css";

const CharacterInfo = ({ defaultData, onData }) => {
  // State
  const [level, setLevel] = useState(defaultData.level);
  const [weaponType, setWeaponType] = useState(defaultData.weaponType);

  // Effects
  useEffect(() => {
    onData({ level, weaponType });
  }, [level, weaponType, onData]);

  // Event Handlers
  const onLevel = e => {
    setLevel(e.target.value === "" ? "" : Number(e.target.value));
  };
  const onWeaponType = e => {
    setWeaponType(e.target.value);
  };

  // DOM Elements
  const weaponTypeItems = Object.keys(weapons).map(type => {
    return <MenuItem key={type} value={type}>{StringUtils.capitalize(type)}</MenuItem>;
  });

  return (
    <Paper className="characterInfo formPanel">
      <Typography variant="h5">Character Info</Typography>
      <TextField id="characterLevel" label="Level" type="number" value={level} onChange={onLevel}/>
      <FormControl>
        <InputLabel id="weaponTypeLabel">Weapon</InputLabel>
        <Select id="weaponType" labelId="weaponTypeLabel" value={weaponType} onChange={onWeaponType}>
          {weaponTypeItems}
        </Select>
      </FormControl>
    </Paper>
  );
};

export default CharacterInfo;
