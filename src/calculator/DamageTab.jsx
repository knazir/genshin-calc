import React from "react";
import { GridList, GridListTile } from "@material-ui/core";

import CharacterInfoPanel from "./CharacterInfoPanel";
import EnemyInfoPanel from "./EnemyInfoPanel";
import SkillInfoPanel from "./SkillInfoPanel";

const DamageTab = ({ character, onCharacter, enemy, onEnemy, skill, onSkill }) => {
  return (
    <GridList cellHeight={500} spacing={10} cols={3}>
      <GridListTile cols={1}>
        <CharacterInfoPanel defaultData={character} onData={onCharacter}/>
      </GridListTile>
      <GridListTile cols={1}>
        <EnemyInfoPanel defaultData={enemy} onData={onEnemy} character={character}/>
      </GridListTile>
      <GridListTile cols={1}>
        <SkillInfoPanel defaultData={skill} onData={onSkill}/>
      </GridListTile>
    </GridList>
  );
};

export default DamageTab;
