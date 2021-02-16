import React from "react";
import { GridList, GridListTile } from "@material-ui/core";

import StatsPanel from "./StatsPanel";

const BaseStatsTab = ({ characterStats, onCharacterStats, weaponStats, onWeaponStats }) => {
  return (
    <GridList cellHeight={500} spacing={10} cols={2}>
      <GridListTile cols={1}>
        <StatsPanel title="Character" defaultData={characterStats} onData={onCharacterStats}
                    requiredStats={["atk", "def", "hp", "critRate", "critDamage", "energyRecharge"]}/>
      </GridListTile>
      <GridListTile cols={1}>
        <StatsPanel title="Weapon" defaultData={weaponStats} onData={onWeaponStats} requiredStats={["atk"]}/>
      </GridListTile>
    </GridList>
  );
};

export default BaseStatsTab;
