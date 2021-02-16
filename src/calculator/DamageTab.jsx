import React from "react";
import { GridList, GridListTile } from "@material-ui/core";

import CharacterInfo from "./CharacterInfo";
import EnemyInfo from "./EnemyInfo";
import SkillInfo from "./SkillInfo";

const DamageTab = ({ character, onCharacter, enemy, onEnemy, skill, onSkill }) => {
  return (
    <GridList cellHeight={375} spacing={10} cols={3}>
      <GridListTile cols={1}>
        <CharacterInfo defaultData={character} onData={onCharacter}/>
      </GridListTile>
      <GridListTile cols={1}>
        <EnemyInfo defaultData={enemy} onData={onEnemy}/>
      </GridListTile>
      <GridListTile cols={1}>
        <SkillInfo defaultData={skill} onData={onSkill}/>
      </GridListTile>
    </GridList>
  );
};

export default DamageTab;
