import React, {useEffect, useState} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@material-ui/core";

import AnalyticsUtils from "../utils/AnalyticsUtils";

const LoadDialog = ({ open, setOpen, onSaveDataSubmit }) => {
  // State
  const [error, setError] = useState("");
  const [saveDataText, setSaveDataText] = useState("");

  // Effects
  useEffect(() => {
    setError("");
  }, [saveDataText]);

  // Event Handlers
  const processSaveData = () => {
    try {
      const saveData = JSON.parse(saveDataText);
      setOpen(false);
      onSaveDataSubmit(saveData);
      AnalyticsUtils.logEvent({
        category: "User",
        action: "Load",
        label: btoa(JSON.stringify(saveData, null, 2))
      });
    } catch {
      setError("Could not parse save data, please check that it is correctly formatted.");
    }
  };
  const submitOnEnter = e => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    processSaveData();
  };

  return (
    <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
      <DialogTitle id="saveDataTitle">Load Save Data</DialogTitle>
      <DialogContent>
        <DialogContentText>
          If you have save data from previously using the app, copy-paste it below.
        </DialogContentText>
        <TextField autoFocus fullWidth multiline id="saveData" label="Save Data" margin="dense"
                   onChange={e => setSaveDataText(e.target.value)} onKeyDown={submitOnEnter}/>
        {error && <DialogContentText color="error">{error}</DialogContentText>}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={processSaveData}>Load</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoadDialog;
