import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormGroup,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

import ReactUtils from "../utils/ReactUtils";

import stats from "../data/stats";

import "./SpecialStatsForm.css";

const SpecialStatForm = ({ defaultSpecialStat = {}, isCreationForm, onAdd, onDelete, onUpdate }) => {
  // Helpers
  const isValid = () => {
    return [finalStatType, percentChange, statGroup, statGroupType].indexOf("") === -1;
  };
  const getCurrentSpecialStat = (useNewUniqueId) => {
    let actualUniqueId = uniqueId;
    if (useNewUniqueId) actualUniqueId = ReactUtils.nextUniqueId("specialStat");
    return { uniqueId: actualUniqueId, finalStatType, percentChange, statGroup, statGroupType };
  };

  // State
  const [finalStatType, setFinalStatType] = useState(defaultSpecialStat.finalStatType || "");
  const [percentChange, setPercentChange] = useState(defaultSpecialStat.percentChange || "");
  const [statGroup, setStatGroup] = useState(defaultSpecialStat.statGroup || "");
  const [statGroupType, setStatGroupType] = useState(defaultSpecialStat.statGroupType || "");
  let defaultUniqueId = defaultSpecialStat.uniqueId;
  if (defaultUniqueId == null || isCreationForm) defaultUniqueId = -1;
  const [uniqueId, setUniqueId] = useState(defaultUniqueId);

  // Effects
  useEffect(() => {
    if (isCreationForm) return;
    const specialStat = getCurrentSpecialStat();
    if (!isValid()) return ReactUtils.onError("Please make sure all values are entered and valid.");
    onUpdate(specialStat);
  }, [finalStatType, percentChange, statGroup, statGroupType]);

  // Event Handlers
  const onFinalStatTypeSelect = e => {
    setFinalStatType(e.target.value);
  };
  const onPercentChange = e => {
    setPercentChange(e.target.value === "" ? "" : Number(e.target.value));
  };
  const onStatGroupSelect = e => {
    setStatGroup(e.target.value);
  };
  const onStatGroupTypeSelect = e => {
    setStatGroupType(e.target.value);
  };
  const onDeleteSpecialStat = () => {
    const currentSpecialStat = getCurrentSpecialStat();
    onDelete(currentSpecialStat);
  };
  const onNewSpecialStat = () => {
    const newSpecialStat = getCurrentSpecialStat(true);
    if (!isValid()) return ReactUtils.onError("Please make sure all values are entered and valid.");
    setFinalStatType("");
    setPercentChange("");
    setStatGroup("");
    setStatGroupType("");
    setUniqueId(-1);
    onAdd(newSpecialStat);
  };

  // DOM Elements
  const statTypeItems = Object.entries(stats).map(([type, name]) => {
    return <MenuItem key={type} value={type}>{name}</MenuItem>;
  });

  return (
    <FormGroup row className="newStatForm specialStatForm">
      {
        !isCreationForm &&
        <IconButton aria-label="delete" onClick={onDeleteSpecialStat}><DeleteIcon/></IconButton>
      }
      <Typography>Increase</Typography>
      <FormControl className="formSelect">
        <Select id="finalStatType" value={finalStatType} onChange={onFinalStatTypeSelect}>
          {statTypeItems}
        </Select>
      </FormControl>
      <Typography>by</Typography>
      <TextField id="percentChange" type="number" value={percentChange} onChange={onPercentChange}/>
      <Typography>% of</Typography>
      <FormControl className="formSelect">
        <Select id="statGroup" value={statGroup} onChange={onStatGroupSelect}>
          <MenuItem value="base">Base</MenuItem>
          <MenuItem value="artifact">Artifact</MenuItem>
          <MenuItem value="total">Total</MenuItem>
        </Select>
      </FormControl>
      <FormControl className="formSelect">
        <Select id="statGroupType" value={statGroupType} onChange={onStatGroupTypeSelect}>
          {statTypeItems}
        </Select>
      </FormControl>
      {
        isCreationForm &&
        <Button variant="contained" startIcon={<AddIcon/>} onClick={onNewSpecialStat}>
          Add
        </Button>
      }
    </FormGroup>
  );
};

export default SpecialStatForm;
