import React from "react";
import { GridList, GridListTile } from "@material-ui/core";

import StatsPanel from "./StatsPanel";

import StringUtils from "../utils/StringUtils";

const BaseStatsTab = ({ character, baseCharacterStats, characterStats, onCharacterStats, weaponStats, onWeaponStats }) => {
  const hasBaseCharStats = Boolean(character.baseCharacter);
  const numCols = hasBaseCharStats ? 3 : 2;
  let baseStatsTitle = "Base Character Stats";
  if (hasBaseCharStats)
  {
    if (character.level) {
      baseStatsTitle += ` (${StringUtils.capitalize(character.baseCharacter)}, Level ${character.level})`;
    } else {
      baseStatsTitle += ` (${StringUtils.capitalize(character.baseCharacter)}`;
    }
  }

  return (
    <GridList cellHeight={500} spacing={10} cols={numCols}>
      {
        hasBaseCharStats &&
        <GridListTile cols={1}>
          <StatsPanel title={baseStatsTitle} data={baseCharacterStats} readOnly/>
        </GridListTile>
      }
      <GridListTile cols={1}>
        <StatsPanel title="Additional Base Stats" defaultData={characterStats} onData={onCharacterStats}/>
      </GridListTile>
      <GridListTile cols={1}>
        <StatsPanel title="Weapon" defaultData={weaponStats} onData={onWeaponStats} requiredStats={["atk"]}/>
      </GridListTile>
    </GridList>
  );
};

export default BaseStatsTab;
