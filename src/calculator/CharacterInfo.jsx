import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";

import StringUtils from "../utils/StringUtils";
import elements from "../data/elements";
import weapons from "../data/weapons";
import "./CharacterInfo.css";

const CharacterInfo = ({ defaultData, onData }) => {
  const [level, setLevel] = useState(defaultData.level);
  const [weaponType, setWeaponType] = useState(defaultData.weaponType);
  const [element, setElement] = useState(defaultData.element);

  // Event Handlers
  const updateData = updateAction => {
    updateAction();
    onData({ level, weaponType, element });
  };
  const onLevel = e => {
    updateData(() => setLevel(Number(e.target.value)));
  };
  const onElement = e => {
    updateData(() => setElement(e.target.value));
  };
  const onWeaponType = e => {
    updateData(() =>  setWeaponType(e.target.value));
  };

  // DOM Elements
  const elementTypeItems = elements.elements.map(element => {
    return <MenuItem key={element} value={element}>{StringUtils.capitalize(element)}</MenuItem>;
  });
  const weaponTypeItems = Object.keys(weapons).map(type => {
    return <MenuItem key={type} value={type}>{StringUtils.capitalize(type)}</MenuItem>;
  });

  return (
    <Paper className="characterInfo">
      <Typography variant="h5">Character Info</Typography>
      <TextField id="characterLevel" label="Level" type="number" onChange={onLevel}/>
      <FormControl>
        <InputLabel id="weaponTypeLabel">Weapon</InputLabel>
        <Select id="weaponType" labelId="weaponTypeLabel" value={weaponType} onChange={onWeaponType}>
          {weaponTypeItems}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="elementLabel">Element</InputLabel>
        <Select id="element" labelId="elementLabel" value={element} onChange={onElement}>
          {elementTypeItems}
        </Select>
      </FormControl>
    </Paper>
  );
};

export default CharacterInfo;
