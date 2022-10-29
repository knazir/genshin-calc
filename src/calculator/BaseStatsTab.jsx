import React from "react";
import { GridList, GridListTile } from "@material-ui/core";

import characters from "../data/characters";
import weapons from "../data/weapons";

import StatsPanel from "./StatsPanel";

import StringUtils from "../utils/StringUtils";

const BaseStatsTab = ({ character, baseCharacterStats, characterStats, onCharacterStats, baseWeaponStats, weaponStats, onWeaponStats }) => {
  const hasBaseCharStats = Boolean(character.baseCharacter);
  const hasBaseWeaponStats = Boolean(character.baseWeapon);

  let numCols = 2;
  if (hasBaseCharStats) numCols++;
  if (hasBaseWeaponStats) numCols++;

  let additionalCharacterStatsTitle = "Character Stats";
  let baseCharacterStatsTitle = "Base Character Stats";
  if (hasBaseCharStats) {
    additionalCharacterStatsTitle = "Additional Character Stats";
    const charData = characters[character.baseCharacter];
    if (character.characterLevel) {
      baseCharacterStatsTitle += ` (${StringUtils.capitalize(charData.name)}, Level ${character.characterLevel})`;
    } else {
      baseCharacterStatsTitle += ` (${StringUtils.capitalize(charData.name)})`;
    }
  }

  let additionalWeaponStatsTitle = "Weapon Stats";
  let baseWeaponStatsTitle = "Base Weapon Stats";
  if (hasBaseWeaponStats) {
    additionalWeaponStatsTitle = "Additional Weapon Stats";
    const wepData = weapons[character.baseWeapon];
    if (character.weaponLevel) {
      baseWeaponStatsTitle += ` (${StringUtils.capitalize(wepData.name)}, Level ${character.weaponLevel})`;
    } else {
      baseWeaponStatsTitle += ` (${StringUtils.capitalize(wepData.name)})`;
    }
  }

  let requiredAdditionalCharStats = [];
  if (!hasBaseCharStats) {
    requiredAdditionalCharStats = ["atk", "def", "hp", "critRate", "critDamage", "energyRecharge"];
  }
  
  let requiredAdditionalWeaponStats = [];
  if (!hasBaseWeaponStats) {
    requiredAdditionalWeaponStats = ["atk"];
  }

  return (
    <GridList cellHeight={500} spacing={10} cols={numCols}>
      {
        hasBaseCharStats &&
        <GridListTile cols={1}>
          <StatsPanel title={baseCharacterStatsTitle} data={baseCharacterStats} readOnly/>
        </GridListTile>
      }
      <GridListTile cols={1}>
        <StatsPanel title={additionalCharacterStatsTitle} defaultData={characterStats} onData={onCharacterStats}
                    requiredStats={requiredAdditionalCharStats} clearEmptyStatsOnLoad={hasBaseCharStats}/>
      </GridListTile>
      {
        hasBaseWeaponStats &&
        <GridListTile cols={1}>
          <StatsPanel title={baseWeaponStatsTitle} data={baseWeaponStats} readOnly/>
        </GridListTile>
      }
      <GridListTile cols={1}>
        <StatsPanel title={additionalWeaponStatsTitle} defaultData={weaponStats} onData={onWeaponStats}
                    requiredStats={requiredAdditionalWeaponStats} clearEmptyStatsOnLoad={hasBaseWeaponStats}/>
        </GridListTile>
    </GridList>
  );
};

export default BaseStatsTab;
