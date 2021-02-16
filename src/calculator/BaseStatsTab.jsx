import React from "react";
import { GridList, GridListTile } from "@material-ui/core";

import StatPanel from "./StatPanel";

const BaseStatsTab = ({ characterStats, onCharacterStats, weaponStats, onWeaponStats }) => {
  return (
    <GridList cellHeight={500} spacing={10} cols={3}>
      <GridListTile cols={1}>
        <StatPanel title="Character" defaultData={characterStats} onData={onCharacterStats}
                   requiredStats={["atk", "def", "hp", "critRate", "critDamage", "energyRecharge"]}/>
      </GridListTile>
      <GridListTile cols={1}>
        <StatPanel title="Weapon" defaultData={weaponStats} onData={onWeaponStats} requiredStats={["atk"]}/>
      </GridListTile>
    </GridList>
  );
};

export default BaseStatsTab;
