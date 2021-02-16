import React, { useEffect, useState } from "react";
import { Paper, Typography} from "@material-ui/core";

import SpecialStatForm from "./SpecialStatForm";

const SpecialStatsPanel = ({ defaultSpecialStats, onSpecialStats }) => {
  // State
  const [specialStats, setSpecialStats] = useState(defaultSpecialStats);

  // Effects
  useEffect(() => {
    if (onSpecialStats) onSpecialStats(specialStats);
  }, [specialStats]);

  // Event Handlers
  const onDeleteSpecialStat = specialStat => {
    const existingIndex = specialStats.findIndex(stat => specialStat.uniqueId === stat.uniqueId);
    if (existingIndex === -1) return;
    setSpecialStats([...specialStats.slice(0, existingIndex), ...specialStats.slice(existingIndex + 1)]);
  };
  const onUpdateSpecialStat = specialStat => {
    const existingIndex = specialStats.findIndex(stat => specialStat.uniqueId === stat.uniqueId);
    if (existingIndex === -1) return;
    setSpecialStats([
      ...specialStats.slice(0, existingIndex),
      specialStat,
      ...specialStats.slice(existingIndex + 1)
    ]);
  };
  const onAddSpecialStat = specialStat => {
    setSpecialStats([...specialStats, specialStat]);
  };

  // DOM Nodes
  const statForms = specialStats.map(specialStat => {
    return <SpecialStatForm key={specialStat.uniqueId} defaultSpecialStat={specialStat}
                            onDelete={onDeleteSpecialStat} onUpdate={onUpdateSpecialStat}/>
  });

  return (
    <Paper className="formPanel">
      <Typography variant="h5">Special Stats (Coming Soon)</Typography>
      <div className="appliedStats appliedSpecialStats">
        {statForms}
      </div>
      <SpecialStatForm isCreationForm onAdd={onAddSpecialStat}/>
    </Paper>
  );
};

export default SpecialStatsPanel;
