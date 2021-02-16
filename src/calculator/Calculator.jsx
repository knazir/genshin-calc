import React, { useState } from "react";
import {
  Button,
  Tabs,
  Tab,
  Typography,
} from "@material-ui/core";

import ArtifactUtils from "../utils/ArtifactUtils";
import ArtifactsTab from "./ArtifactsTab";
import BaseStatsTab from "./BaseStatsTab";
import DamageTab from "./DamageTab";
import TotalsTab from "./TotalsTab";

import "./Calculator.css";
import SaveDialog from "../main/SaveDialog";
import BonusStatsTab from "./BonusStatsTab";

const Calculator = ({ data }) => {
  // State
  const [isSavePopupVisible, setIsSavePopupVisible] = useState(false);
  const [saveData, setSaveData] = useState({});
  const [tab, setTab] = useState(0);
  const [character, setCharacter] = useState(data.character || {
    level: 90,
    weaponType: "",
  });
  const [enemy, setEnemy] = useState(data.enemy || {
    level: 83,
    elementalRes: 10,
    elementalResReduction: 0,
    defenseReduction: 0
  });
  const [skill, setSkill] = useState(data.skill || {
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
  const [flowerStats, setFlowerStats] = useState(data.flowerStats || {
    hp: 0
  });
  const [featherStats, setFeatherStats] = useState(data.featherStats || {
    atk: 0
  });
  const [timepieceStats, setTimepieceStats] = useState(data.timepieceStats || {});
  const [gobletStats, setGobletStats] = useState(data.gobletStats || {});
  const [hatStats, setHatStats] = useState(data.hatStats || {});
  const [miscStats, setMiscStats] = useState(data.miscStats || {});
  const [specialStats, setSpecialStats] = useState(data.specialStats || []);

  // Aggregates
  const baseStats = ArtifactUtils.addStats(characterStats, weaponStats);
  const artifactsStats = ArtifactUtils.addStats(setEffectsStats, flowerStats, featherStats, timepieceStats, gobletStats,
                                                hatStats);

  // Event Handlers
  const onSave = () => {
    const saveData = {
      character, skill, characterStats, weaponStats, setEffectsStats, flowerStats, featherStats,
      timepieceStats, gobletStats, hatStats, miscStats, specialStats
    };
    setSaveData(saveData);
    setIsSavePopupVisible(true);
  };
  const onTab = (e, value) => {
    setTab(value);
  };

  // DOM Nodes
  const tabs = [
    <DamageTab  key="damage" character={character} onCharacter={setCharacter} enemy={enemy} onEnemy={setEnemy}
                skill={skill} onSkill={setSkill}/>,
    <BaseStatsTab key="baseStats" characterStats={characterStats} onCharacterStats={setCharacterStats}
                  weaponStats={weaponStats} onWeaponStats={setWeaponStats}/>,
    <ArtifactsTab key="artifacts" flowerStats={flowerStats} onFlowerStats={setFlowerStats} featherStats={featherStats}
                  onFeatherStats={setFeatherStats} timepieceStats={timepieceStats}
                  onTimepieceStats={setTimepieceStats} gobletStats={gobletStats} onGobletStats={setGobletStats}
                  hatStats={hatStats} onHatStats={setHatStats} setEffectsStats={setEffectsStats}
                  onSetEffectsStats={setSetEffectsStats}/>,
    <BonusStatsTab key="bonusStats" miscStats={miscStats} onMiscStats={setMiscStats} specialStats={specialStats}
                   onSpecialStats={setSpecialStats}/>,
    <TotalsTab key="totals" baseStats={baseStats} artifactsStats={artifactsStats}/>,
  ];

  // TODO: Break this up into separate components and create a "increase x by y percentage of z" component
  return (
    <div className="calculator">
      <header>
        <div className="headerLeft">
          <Typography variant="h4" gutterBottom>Genshin Impact Damage Calculator</Typography>
          <div className="headerActions">
            <Button variant="contained" onClick={onSave}>Save</Button>
          </div>
        </div>
        <Tabs variant="scrollable" scrollButtons="auto" value={tab} onChange={onTab}>
          <Tab label="Damage Info"/>
          <Tab label="Base Stats"/>
          <Tab label="Artifacts"/>
          <Tab label="Bonuses"/>
          <Tab label="Totals"/>
          <Tab label="Damage"/>
        </Tabs>
      </header>
      <div className="tabContent">
        {tabs[tab]}
      </div>
      <SaveDialog open={isSavePopupVisible} setOpen={setIsSavePopupVisible} saveData={saveData}/>
    </div>
  );
};

export default Calculator;
