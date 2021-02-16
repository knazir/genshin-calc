import React from "react";
import { GridList, GridListTile } from "@material-ui/core";

import StatsPanel from "./StatsPanel";

const ArtifactsTab = ({ flowerStats, onFlowerStats, featherStats, onFeatherStats, timepieceStats, onTimepieceStats,
                        gobletStats, onGobletStats, hatStats, onHatStats, setEffectsStats, onSetEffectsStats }) => {
  return (
    <GridList cellHeight={400} spacing={10} cols={3}>
      <GridListTile cols={1}>
        <StatsPanel title="Flower" defaultData={flowerStats} onData={onFlowerStats} requiredStats={["hp"]}/>
      </GridListTile>
      <GridListTile cols={1}>
        <StatsPanel title="Feather" defaultData={featherStats} onData={onFeatherStats} requiredStats={["atk"]}/>
      </GridListTile>
      <GridListTile cols={1}>
        <StatsPanel title="Timepiece" defaultData={timepieceStats} onData={onTimepieceStats}/>
      </GridListTile>
      <GridListTile cols={1}>
        <StatsPanel title="Goblet" defaultData={gobletStats} onData={onGobletStats}/>
      </GridListTile>
      <GridListTile cols={1}>
        <StatsPanel title="Hat" defaultData={hatStats} onData={onHatStats}/>
      </GridListTile>
      <GridListTile cols={1}>
        <StatsPanel title="Set Effects" defaultData={setEffectsStats} onData={onSetEffectsStats}/>
      </GridListTile>
    </GridList>
  );
};

export default ArtifactsTab;
