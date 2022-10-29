import React, { useEffect, useState } from "react";
import {
  Divider,
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
import weaponTypes from "../data/weaponTypes";

import StringUtils from "../utils/StringUtils";

const CharacterInfoPanel = ({ defaultData, onData }) => {
  // State
  const [baseCharacter, setBaseCharacter] = useState(defaultData.baseCharacter);
  const [characterLevel, setCharacterLevel] = useState(defaultData.characterLevel);
  const [weaponType, setWeaponType] = useState(defaultData.weaponType);
  const [baseWeapon, setBaseWeapon] = useState(defaultData.baseWeapon);
  const [weaponLevel, setWeaponLevel] = useState(defaultData.weaponLevel);

  // Effects
  useEffect(() => {
    onData({ baseCharacter, characterLevel, weaponType, baseWeapon, weaponLevel });
  }, [baseCharacter, characterLevel, weaponType, baseWeapon, weaponLevel]);

  // Event Handlers
  const onBaseCharacter = e => {
    const charId = e.target.value;
    setBaseCharacter(charId);

    const character = characters[charId];
    if (!character) return;

    const newWeaponType = character.weapon;
    if (weaponType !== newWeaponType) {
      setBaseWeapon("");
    }
    setWeaponType(newWeaponType);

    let maxLevel = 0;
    const levels = Object.keys(characters[charId].baseStats);
    const maxLevelWithStats = levels.reduce((a, b) => Math.max(a, b), -Infinity);
    setCharacterLevel(maxLevelWithStats);
  }
  const onCharacterLevel = e => {
    const characterLevel = e.target.value === "" ? "" : Number(e.target.value);
    setCharacterLevel(characterLevel);
  };
  const onWeaponType = e => {
    const newWeaponType = e.target.value;
    if (weaponType !== newWeaponType) {
      setBaseWeapon("");
    }
    setWeaponType(newWeaponType);
  };
  const onBaseWeapon = e => {
    const wepId = e.target.value;

    setBaseWeapon(e.target.value);

    const weapon = weapons[wepId];
    if (!weapon) return;

    let maxLevel = 0;
    const levels = Object.keys(weapons[wepId].baseStats);
    const maxLevelWithStats = levels.reduce((a, b) => Math.max(a, b), -Infinity);
    setWeaponLevel(maxLevelWithStats);
  };
  const onWeaponLevel = e => {
    const weaponLevel = e.target.value === "" ? "" : Number(e.target.value);
    setWeaponLevel(weaponLevel);
  };

  // DOM Elements
  const baseCharacterItems = [
    <MenuItem key="none" value="">None</MenuItem>,
    ...Object.entries(characters).map(([charId, charData]) => {
      return <MenuItem key={charId} value={charId}>{charData.name}</MenuItem>;
    })
  ];
  const weaponTypeItems = Object.entries(weaponTypes).map(([wepTypeId, wepTypeName]) => {
    return <MenuItem key={wepTypeId} value={wepTypeId}>{StringUtils.capitalize(wepTypeName)}</MenuItem>;
  });
  const weaponItems = [
    <MenuItem key="none" value="">None</MenuItem>,
    ...Object.entries(weapons).filter(([wepId, wepData]) => {
      return !weaponType || wepData.type === weaponType;
    }).map(([wepId, wepData]) => {
      return <MenuItem key={wepId} value={wepId}>{StringUtils.capitalize(wepData.name)}</MenuItem>;
    })
  ];

  return (
    <Paper className="formPanel">
      <Typography variant="h5">Character</Typography>
      <FormControl>
        <InputLabel id="characterLabel">Character</InputLabel>
        <Select id="character" labelId="characterLabel" value={baseCharacter} onChange={onBaseCharacter}>
          {baseCharacterItems}
        </Select>
      </FormControl>
      <TextField id="characterLevel" label="Character Level" type="number" value={characterLevel} onChange={onCharacterLevel}/>
      <Divider className="panelDivider"/>
      <Typography variant="h5">Weapon</Typography>
      <FormControl>
        <InputLabel id="weaponTypeLabel">Weapon Type</InputLabel>
        <Select id="weaponType" labelId="weaponTypeLabel" value={weaponType} onChange={onWeaponType}>
          {weaponTypeItems}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="weaponLabel">Weapon</InputLabel>
        <Select id="weapon" labelId="weaponLabel" value={baseWeapon} onChange={onBaseWeapon}>
          {weaponItems}
        </Select>
      </FormControl>
      <TextField id="weaponLevel" label="Weapon Level" type="number" value={weaponLevel} onChange={onWeaponLevel}/>
    </Paper>
  );
};

export default CharacterInfoPanel;
