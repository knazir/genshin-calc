import React from "react";
import { GridList, GridListTile } from "@material-ui/core";

import StatPanel from "./StatPanel";

const ArtifactsTab = ({ flowerStats, onFlowerStats, featherStats, onFeatherStats, timepieceStats, onTimepieceStats,
                        gobletStats, onGobletStats, hatStats, onHatStats, setEffectsStats, onSetEffectsStats,
                        miscStats, onMiscStats }) => {
  return (
    <GridList cellHeight={300} spacing={10} cols={3}>
      <GridListTile cols={1}>
        <StatPanel title="Flower" defaultData={flowerStats} onData={onFlowerStats} requiredStats={["hp"]}/>
      </GridListTile>
      <GridListTile cols={1}>
        <StatPanel title="Feather" defaultData={featherStats} onData={onFeatherStats} requiredStats={["atk"]}/>
      </GridListTile>
      <GridListTile cols={1}>
        <StatPanel title="Timepiece" defaultData={timepieceStats} onData={onTimepieceStats}/>
      </GridListTile>
      <GridListTile cols={1}>
        <StatPanel title="Goblet" defaultData={gobletStats} onData={onGobletStats}/>
      </GridListTile>
      <GridListTile cols={1}>
        <StatPanel title="Hat" defaultData={hatStats} onData={onHatStats}/>
      </GridListTile>
      <GridListTile cols={1}>
        <StatPanel title="Set Effects" defaultData={setEffectsStats} onData={onSetEffectsStats}/>
      </GridListTile>
      <GridListTile cols={1}>
        <StatPanel title="Miscellaneous Stats" defaultData={miscStats} onData={onMiscStats}/>
      </GridListTile>
    </GridList>
  );
};

export default ArtifactsTab;
