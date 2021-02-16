import React from "react";
import { GridList, GridListTile } from "@material-ui/core";

import StatsPanel from "./StatsPanel";

const TotalsTab = ({ baseStats, artifactsStats, finalStats }) => {
  return (
    <GridList cellHeight={500} spacing={10} cols={3}>
      <GridListTile cols={1}>
        <StatsPanel readOnly title="Base Stat Totals" data={baseStats}/>
      </GridListTile>
      <GridListTile cols={1}>
        <StatsPanel readOnly title="Artifact Totals" data={artifactsStats}/>
      </GridListTile>
      <GridListTile cols={1}>
        <StatsPanel readOnly title="Final Stats" data={finalStats}/>
      </GridListTile>
    </GridList>
  );
};

export default TotalsTab;
