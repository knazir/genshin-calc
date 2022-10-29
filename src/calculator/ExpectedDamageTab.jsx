import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@material-ui/core";

import DamageUtils from "../utils/DamageUtils";

import embonus from "../data/embonus";

import "./ExpectedDamageTab.css";

const ExpectedDamageTab = ({ character, enemy, skill, finalStats, defaultErBonuses, onErBonuses }) => {
  // State
  const [erBonuses, setErBonuses] = useState(defaultErBonuses);

  // Effects
  useEffect(() => {
    onErBonuses(erBonuses);
  }, [erBonuses]);

  // Event Handlers
  const onErBonus = (e, type) => {
    erBonuses[type] = e.target.value === "" ? "" : Number(e.target.value);
    const newBonuses = Object.assign({}, erBonuses);
    setErBonuses(newBonuses);
  };

  // DOM Nodes
  const reactionTypes = DamageUtils.getDamageTypes(skill.element, character.weaponType, skill.doesShatter) || [];
  const baseNonCrit = DamageUtils.getBaseNonCritDamage(finalStats.atk, skill.totalDamage, enemy.defenseMult);
  const baseCrit = DamageUtils.getBaseCritDamage(finalStats.atk, skill.totalDamage, enemy.defenseMult,
                                                 finalStats.critDamage);
  const baseAverage = DamageUtils.getAverageDamage(baseNonCrit, baseCrit, finalStats.critRate);
  const baseRow = (
    <TableRow>
      <TableCell component="th" scope="row">Base Damage</TableCell>
      <TableCell>0</TableCell>
      <TableCell>0</TableCell>
      <TableCell>0</TableCell>
      <TableCell>{baseNonCrit}</TableCell>
      <TableCell>{baseCrit}</TableCell>
      <TableCell>{baseAverage}</TableCell>
    </TableRow>
  );
  const reactionRows = reactionTypes.map(type => {
    const reactionMult = DamageUtils.getReactionMultiplier(type, skill.element);
    const elementalMasteryMult = DamageUtils.getElementalMasteryMultiplier(type, finalStats.elementalMastery);
    const elementalReactionMult = erBonuses[type] || 0;
    const elementalNonCrit = DamageUtils.getElementalReactionDamage(type, baseNonCrit, character.characterLevel, reactionMult,
                                                                    elementalMasteryMult, enemy.resMult,
                                                                    elementalReactionMult);
    const elementalCrit = DamageUtils.getElementalReactionDamage(type, baseCrit, character.characterLevel, reactionMult,
                                                                 elementalMasteryMult, enemy.resMult,
                                                                 elementalReactionMult);
    const elementalAverage = DamageUtils.getAverageDamage(elementalNonCrit, elementalCrit, finalStats.critRate);
    return (
      <TableRow key={type}>
        <TableCell component="th" scope="row">{embonus.names[type]}</TableCell>
        <TableCell>{reactionMult * 100}</TableCell>
        <TableCell>{elementalMasteryMult}</TableCell>
        <TableCell>
          <TextField id="erBonus" type="number" value={erBonuses[type]} onChange={e => onErBonus(e, type)}/>
        </TableCell>
        {
          type === "melt" || type === "vaporize"
            ?
              <>
                <TableCell>{elementalNonCrit}</TableCell>
                <TableCell>{elementalCrit}</TableCell>
                <TableCell>{elementalAverage}</TableCell>
              </>
            :
              <TableCell colSpan={3}>{elementalNonCrit}</TableCell>
        }
      </TableRow>
    );
  });

  return (
    <TableContainer className="expectedDamageTab" component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Damage Type</TableCell>
            <TableCell>Reaction Multiplier (%)</TableCell>
            <TableCell>Elemental Mastery Multiplier (%)</TableCell>
            <TableCell>Elemental Reaction Bonus (%)</TableCell>
            <TableCell>Non-Crit</TableCell>
            <TableCell>Crit</TableCell>
            <TableCell>Average</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {baseRow}
          {reactionRows}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpectedDamageTab;
