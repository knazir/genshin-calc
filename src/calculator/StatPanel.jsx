import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import stats from "../data/stats";
import "./StatPanel.css";

const StatPanel = ({ defaultData, onData, readOnly, requiredStats = [], title }) => {
  // State
  let defaultAppliedStats = [];
  requiredStats.forEach(requiredStatType => {
    const existingIndex = defaultAppliedStats.findIndex(({ type }) => type === requiredStatType);
    const defaultValue = defaultData[requiredStatType] != null ? defaultData[requiredStatType] : 0;
    if (existingIndex === -1) defaultAppliedStats.push({ type: requiredStatType, value: defaultValue });
  });
  if (defaultData) {
    defaultAppliedStats = [
      ...defaultAppliedStats,
      ...Object.entries(defaultData).filter(([type, _]) => requiredStats.indexOf(type) === -1)
                                    .map(([type, value]) => { return { type, value }; })
    ];
  }
  const [appliedStats, setAppliedStats] = useState(defaultAppliedStats);
  const [newStatType, setNewStatType] = useState("");

  // Effects
  useEffect(() => {
    const statsObj = {};
    appliedStats.forEach(({ type, value }) => statsObj[type] = value);
    if (onData) onData(statsObj);
  }, [appliedStats, onData]);

  // Event Handlers
  const onStatChange = (e, typeToUpdate) => {
    const existingIndex = appliedStats.findIndex(({ type }) => type === typeToUpdate);
    if (existingIndex === -1) return;
    const updatedStat = { type: typeToUpdate, value: e.target.value === "" ? "" : Number(e.target.value) };
    setAppliedStats([
      ...appliedStats.slice(0, existingIndex),
      updatedStat,
      ...appliedStats.slice(existingIndex + 1)
    ]);
  };
  const onStatDelete = typeToDelete => {
    if (requiredStats.indexOf(typeToDelete) !== -1) return;
    const existingIndex = appliedStats.findIndex(({ type }) => type === typeToDelete);
    if (existingIndex === -1) return;
    setAppliedStats([...appliedStats.slice(0, existingIndex), ...appliedStats.slice(existingIndex + 1)]);
  };
  const onNewStatTypeSelect = e => {
    setNewStatType(e.target.value);
  };
  const onNewStatTypeAdd = () => {
    if (!newStatType || appliedStats.find(({ type }) => type === newStatType) != null) return;
    setAppliedStats([...appliedStats, { type: newStatType, value: 0 }]);
  };

  // DOM Elements
  const statInputs = appliedStats.map(({ type, value }) => {
    const name = stats[type];
    const canDeleteStat = requiredStats.indexOf(type) === -1;
    const inputProps = { style: { textAlign: "right" } };
    return (
      <FormGroup key={type} row className="statRow">
        <IconButton aria-label="delete" disabled={!canDeleteStat}
                    onClick={() => onStatDelete(type)}><DeleteIcon/></IconButton>
        <Typography className="statLabel">{name}</Typography>
        {
          readOnly
            ? <Typography>{value}</Typography>
            :  <TextField id={`${type}Input`} className="statInput" type="number" inputProps={inputProps} value={value}
                                                             onChange={e => onStatChange(e, type)}/>
        }
      </FormGroup>
    );
  });
  const statTypeItems = Object.entries(stats).map(([type, name]) => {
    return <MenuItem key={type} value={type}>{name}</MenuItem>;
  });

  return (
    <Paper className="statPanel formPanel">
      <Typography variant="h5">{title}</Typography>
      <div className="appliedStats">
        {statInputs}
      </div>
      {
        !readOnly &&
        <FormGroup row className="newStatForm">
          <FormControl className="newStatSelect">
            <InputLabel id="newStatTypeLabel">New Stat</InputLabel>
            <Select id="newStatType" labelId="newStatTypeLabel" value={newStatType} onChange={onNewStatTypeSelect}>
              {statTypeItems}
            </Select>
          </FormControl>
          <Button variant="contained" startIcon={<AddIcon/>} onClick={onNewStatTypeAdd}>Add</Button>
        </FormGroup>
      }
    </Paper>
  );
};

export default StatPanel;
