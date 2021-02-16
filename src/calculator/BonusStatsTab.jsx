import React from "react";
import { GridList, GridListTile } from "@material-ui/core";

import StatsPanel from "./StatsPanel";
import SpecialStatsPanel from "./SpecialStatsPanel";

const BonusStatsTab = ({ miscStats, onMiscStats, specialStats, onSpecialStats }) => {
  return (
    <GridList cellHeight={300} spacing={10} cols={2}>
      <GridListTile cols={1}>
        <StatsPanel title="Miscellaneous Stats" defaultData={miscStats} onData={onMiscStats}/>
      </GridListTile>
      <GridListTile cols={1}>
        <SpecialStatsPanel defaultSpecialStats={specialStats} onSpecialStats={onSpecialStats}/>
      </GridListTile>
    </GridList>
  );
};

export default BonusStatsTab;
