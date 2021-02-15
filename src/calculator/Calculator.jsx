import React, { useState } from "react";
import {
  GridList,
  GridListTile,
  Tabs,
  Tab,
  Typography
} from "@material-ui/core";

import ArtifactUtils from "../utils/ArtifactUtils";
import CharacterInfo from "./CharacterInfo";
import SkillInfo from "./SkillInfo";
import StatPanel from "./StatPanel";
import "./Calculator.css";

const Calculator = ({ data }) => {
  // State
  const [tab, setTab] = useState(0);
  const [characterData, setCharacterData] = useState(data.character || {
    level: 0,
    weaponType: "",
  });
  const [skillData, setSkillData] = useState(data.skill || {
    damage: 0,
    bonusDamage: 0,
    element: "",
    doesShatter: false,
    doesApplyElementalBonus: true
  });
  const [characterStats, setCharacterStats] = useState(data.characterStats || {
    critRate: 5,
    critDamage: 50,
    energyRecharge: 100
  });
  const [weaponStats, setWeaponStats] = useState(data.weaponStats || {});
  const [setEffectsStats, setSetEffectsStats] = useState(data.setEffectsStats || {});
  const [flowerStats, setFlowerStats] = useState(data.flowerStats || {});
  const [featherStats, setFeatherStats] = useState(data.featherStats || {});
  const [timepieceStats, setTimepieceStats] = useState(data.timepieceStats || {});
  const [gobletStats, setGobletStats] = useState(data.gobletStats || {});
  const [hatStats, setHatStats] = useState(data.hatStats || {});
  const [miscStats, setMiscStats] = useState(data.miscStats || {});

  // Aggregates
  const baseStats = ArtifactUtils.addStats(characterStats, weaponStats);
  const artifactsStats = ArtifactUtils.addStats(setEffectsStats, flowerStats, featherStats, timepieceStats, gobletStats,
                                                hatStats);

  // Event Handlers
  const onTab = (e, value) => {
    setTab(value);
  };

  // TODO: Break this up into separate components and get the EnemyInfo component done
  return (
    <div className="calculator">
      <header>
        <Typography variant="h3" gutterBottom>Damage Calculator</Typography>
        <Tabs value={tab} onChange={onTab}>
          <Tab label="Character Info"/>
          <Tab label="Base Stats"/>
          <Tab label="Artifacts"/>
          <Tab label="Totals"/>
          <Tab label="Damage"/>
        </Tabs>
      </header>
      <div className="tabContent">
        {
          tab === 0 &&
          <>
            <GridList cellHeight={375} spacing={10} cols={3}>
              <GridListTile cols={1}>
                <CharacterInfo defaultData={characterData} onData={setCharacterData}/>
              </GridListTile>
              <GridListTile cols={1}>
                <StatPanel readOnly title="Enemy Info"/>
              </GridListTile>
              <GridListTile cols={1}>
                <SkillInfo defaultData={skillData} onData={setSkillData}/>
              </GridListTile>
            </GridList>
          </>
        }
        {
          tab === 1 &&
          <>
            <GridList cellHeight={300} spacing={10} cols={3}>
              <GridListTile cols={1}>
                <StatPanel title="Character" defaultData={characterStats} onData={setCharacterStats}/>
              </GridListTile>
              <GridListTile cols={1}>
                <StatPanel title="Weapon" defaultData={weaponStats} onData={setWeaponStats}/>
              </GridListTile>
            </GridList>
          </>
        }
        {
          tab === 2 &&
          <>
            <GridList cellHeight={300} spacing={10} cols={3}>
              <GridListTile cols={1}>
                <StatPanel title="Flower" defaultData={flowerStats} onData={setFlowerStats}/>
              </GridListTile>
              <GridListTile cols={1}>
                <StatPanel title="Feather" defaultData={featherStats} onData={setFeatherStats}/>
              </GridListTile>
              <GridListTile cols={1}>
                <StatPanel title="Timepiece" defaultData={timepieceStats} onData={setTimepieceStats}/>
              </GridListTile>
              <GridListTile cols={1}>
                <StatPanel title="Goblet" defaultData={gobletStats} onData={setGobletStats}/>
              </GridListTile>
              <GridListTile cols={1}>
                <StatPanel title="Hat" defaultData={hatStats} onData={setHatStats}/>
              </GridListTile>
              <GridListTile cols={1}>
                <StatPanel title="Set Effects" defaultData={setEffectsStats} onData={setSetEffectsStats}/>
              </GridListTile>
              <GridListTile cols={1}>
                <StatPanel title="Misc" defaultData={miscStats} onData={setMiscStats}/>
              </GridListTile>
            </GridList>
          </>
        }
        {
          tab === 3 &&
          <>
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
          </>
        }
        {
          tab === 4 &&
          <>
          </>
        }
      </div>
    </div>
  );
};

export default Calculator;
