import React, { useEffect, useState } from "react";
import {
  Button,
  Tabs,
  Tab,
  Typography,
} from "@material-ui/core";

import characters from "../data/characters";
import weapons from "../data/weapons";

import ArtifactUtils from "../utils/ArtifactUtils";
import ArtifactsTab from "./ArtifactsTab";
import BaseStatsTab from "./BaseStatsTab";
import BonusStatsTab from "./BonusStatsTab";
import DamageInfoTab from "./DamageInfoTab";
import ExpectedDamageTab from "./ExpectedDamageTab";
import SaveDialog from "../main/SaveDialog";
import TotalsTab from "./TotalsTab";

import AnalyticsUtils from "../utils/AnalyticsUtils";
import DamageUtils from "../utils/DamageUtils";

import "./Calculator.css";

const getBaseCharacterStatsByLevel = ({ baseCharacter, characterLevel }) => {
  let permanentBaseCharacterStats = {
    critRate: 5,
    critDamage: 50,
    energyRecharge: 100
  };

  if (!baseCharacter || characterLevel === "") {
    return permanentBaseCharacterStats;
  }

  // Find nearest matching level (floor) to provide
  let baseCharacterStats = {};
  if (characterLevel === 0) characterLevel = 1;
  baseCharacterStats = {};
  for (const [specifiedLevel, baseStats] of Object.entries(characters[baseCharacter].baseStats)) {
    if (specifiedLevel <= characterLevel) {
      baseCharacterStats = baseStats;
    } else {
      break;
    }
  }
  return ArtifactUtils.filterEmptyStats(
    ArtifactUtils.addStats(permanentBaseCharacterStats, baseCharacterStats)
  );
};

const getBaseWeaponStatsByLevel = ({ baseWeapon, weaponLevel }) => {
  let baseWeaponStats = {};

  if (!baseWeapon || weaponLevel === "") {
    return baseWeaponStats;
  }

  // Find nearest matching level (floor) to provide
  if (weaponLevel === 0) weaponLevel = 1;
  for (const [specifiedLevel, baseStats] of Object.entries(weapons[baseWeapon].baseStats)) {
    if (specifiedLevel <= weaponLevel) {
      baseWeaponStats = baseStats;
    } else {
      break;
    }
  }

  return ArtifactUtils.filterEmptyStats(baseWeaponStats);
};

const Calculator = ({ data }) => {
  // State
  const [isSavePopupVisible, setIsSavePopupVisible] = useState(false);
  const [saveData, setSaveData] = useState({});
  const [tab, setTab] = useState(0);
  const [character, setCharacter] = useState(data.character || {
    baseCharacter: "",
    characterLevel: "",
    weaponType: "",
    baseWeapon: "",
    weaponLevel: ""
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
  const [characterStats, setCharacterStats] = useState(data.characterStats || {});
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
  const [erBonuses, setErBonuses] = useState(data.erBonuses || DamageUtils.getDefaultErBonuses());
  const [baseStats, setBaseStats] = useState({});
  const [artifactsStats, setArtifactsStats] = useState({});
  const [finalStats, setFinalStats] = useState({});

  // Effects
  useEffect(() => {
    const baseCharacterStats = getBaseCharacterStatsByLevel(character);
    const baseWeaponStats = getBaseWeaponStatsByLevel(character);
    setBaseStats(ArtifactUtils.addStats(baseCharacterStats, characterStats, weaponStats, baseWeaponStats));
    setArtifactsStats(ArtifactUtils.addStats(flowerStats, featherStats, timepieceStats, gobletStats, hatStats,
                                             setEffectsStats));
  }, [
    character, characterStats, weaponStats, flowerStats, featherStats, timepieceStats, gobletStats, hatStats,
    setEffectsStats, miscStats, specialStats
  ]);
  useEffect(() => {
    setFinalStats(ArtifactUtils.getFinalStats(characterStats, weaponStats, baseStats, artifactsStats, miscStats,
                                              specialStats));
  }, [character, characterStats, weaponStats, baseStats, artifactsStats, miscStats, specialStats]);

  // Event Handlers
  const onSave = () => {
    const saveData = {
      character, skill, characterStats, weaponStats, setEffectsStats, flowerStats, featherStats,
      timepieceStats, gobletStats, hatStats, miscStats, specialStats, erBonuses
    };
    setSaveData(saveData);
    setIsSavePopupVisible(true);
    AnalyticsUtils.logEvent({
      category: "User",
      action: "Save",
      label: btoa(JSON.stringify(saveData, null, 2))
    });
  };
  const onTab = (e, value) => {
    AnalyticsUtils.logEvent({
      category: "Navigation",
      action: "Tab Switch",
      label: tabNames[value]
    });
    setTab(value);
  };

  // DOM Nodes
  const tabNames = ["Damage Info", "Base Stats", "Artifacts", "Bonuses", "Totals", "Damage"];
  const tabs = tabNames.map(name => <Tab key={name} label={name}/>);
  const tabPanels = [
    <DamageInfoTab key="damage" character={character} onCharacter={setCharacter} enemy={enemy} onEnemy={setEnemy}
                   skill={skill} onSkill={setSkill} elementalBonus={finalStats.elementalBonus}/>,
    <BaseStatsTab key="baseStats" character={character} baseCharacterStats={getBaseCharacterStatsByLevel(character)}
                  characterStats={characterStats} onCharacterStats={setCharacterStats}
                  baseWeaponStats={getBaseWeaponStatsByLevel(character)} weaponStats={weaponStats} onWeaponStats={setWeaponStats}/>,
    <ArtifactsTab key="artifacts" flowerStats={flowerStats} onFlowerStats={setFlowerStats} featherStats={featherStats}
                  onFeatherStats={setFeatherStats} timepieceStats={timepieceStats}
                  onTimepieceStats={setTimepieceStats} gobletStats={gobletStats} onGobletStats={setGobletStats}
                  hatStats={hatStats} onHatStats={setHatStats} setEffectsStats={setEffectsStats}
                  onSetEffectsStats={setSetEffectsStats}/>,
    <BonusStatsTab key="bonusStats" miscStats={miscStats} onMiscStats={setMiscStats} specialStats={specialStats}
                   onSpecialStats={setSpecialStats}/>,
    <TotalsTab key="totals" baseStats={baseStats} artifactsStats={artifactsStats} finalStats={finalStats}/>,
    <ExpectedDamageTab character={character} enemy={enemy} skill={skill} finalStats={finalStats}
                       defaultErBonuses={erBonuses} onErBonuses={setErBonuses}/>
  ];

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
          {tabs}
        </Tabs>
      </header>
      <div className="tabContent">
        {tabPanels[tab]}
      </div>
      <SaveDialog open={isSavePopupVisible} setOpen={setIsSavePopupVisible} saveData={saveData}/>
    </div>
  );
};

export default Calculator;
