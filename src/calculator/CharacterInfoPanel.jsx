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

import characters from "../data/characters";
import weapons from "../data/weapons";

import StringUtils from "../utils/StringUtils";

const CharacterInfoPanel = ({ defaultData, onData }) => {
  // State
  const [baseCharacter, setBaseCharacter] = useState(defaultData.baseCharacter);
  const [weaponType, setWeaponType] = useState(defaultData.weaponType);
  const [level, setLevel] = useState(defaultData.level);

  // Effects
  useEffect(() => {
    onData({ baseCharacter, level, weaponType });
  }, [baseCharacter, weaponType, level]);

  // Event Handlers
  const onLevel = e => {
    const level = e.target.value === "" ? "" : Number(e.target.value);
    setLevel(level);
  };
  const onWeaponType = e => {
    setWeaponType(e.target.value);
  };
  const onBaseCharacter = e => {
    const charId = e.target.value;
    const character = characters[charId];

    setBaseCharacter(charId);

    if (!character) return;
    setWeaponType(character.weapon);

    let maxLevel = 0;
    const levels = Object.keys(characters[charId].baseStats);
    const maxLevelWithStats = levels.reduce((a, b) => Math.max(a, b), -Infinity);
    setLevel(maxLevelWithStats);
  }

  // DOM Elements
  const baseCharacterItems = [
    <MenuItem key="none" value="">None</MenuItem>,
    ... Object.entries(characters).map(([charId, charData]) => {
      return <MenuItem key={charId} value={charId}>{charData.name}</MenuItem>;
    })
  ];

  const weaponTypeItems = Object.entries(weapons).map(([wepId, wepName]) => {
    return <MenuItem key={wepId} value={wepId}>{StringUtils.capitalize(wepName)}</MenuItem>;
  });

  return (
    <Paper className="formPanel">
      <Typography variant="h5">Character Info</Typography>
      <FormControl>
        <InputLabel id="characterLabel">Character</InputLabel>
        <Select id="character" labelId="characterLabel" value={baseCharacter} onChange={onBaseCharacter}>
          {baseCharacterItems}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="weaponTypeLabel">Weapon</InputLabel>
        <Select id="weaponType" labelId="weaponTypeLabel" value={weaponType} onChange={onWeaponType}>
          {weaponTypeItems}
        </Select>
      </FormControl>
      <TextField id="characterLevel" label="Level" type="number" value={level} onChange={onLevel}/>
    </Paper>
  );
};

export default CharacterInfoPanel;
