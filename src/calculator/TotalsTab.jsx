import React from "react";
import { GridList, GridListTile } from "@material-ui/core";

import StatPanel from "./StatPanel";

const TotalsTab = ({ baseStats, artifactsStats }) => {
  return (
    <GridList cellHeight={300} spacing={10} cols={3}>
      <GridListTile cols={1}>
        <StatPanel readOnly title="Base Stat Totals" data={baseStats}/>
      </GridListTile>
      <GridListTile cols={1}>
        <StatPanel readOnly title="Artifact Totals" data={artifactsStats}/>
      </GridListTile>
      <GridListTile cols={1}>
        <StatPanel readOnly title="Final Stats" data={artifactsStats}/>
      </GridListTile>
    </GridList>
  );
};

export default TotalsTab;
