import React, { useEffect, useState } from "react";
import  {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography
} from "@material-ui/core";

import "./Welcome.css";

const Welcome = ({ loadApp }) => {
  const [error, setError] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [saveDataText, setSaveDataText] = useState(null);

  // Reset the error message on input
  useEffect(() => {
    setError("");
  }, [saveDataText]);

  const processSaveData = () => {
    try {
      const saveData = JSON.parse(saveDataText);
      setIsPopupVisible(false);
      loadApp(saveData);
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
    <div className="welcome">
      <Typography variant="h2" gutterBottom>Genshin Impact Damage Calculator</Typography>
      <div className="actionButtons">
        <Button variant="contained" color="primary" onClick={() => setIsPopupVisible(true)}>Load Save</Button>
        <Button variant="contained" onClick={loadApp}>Get Started</Button>
      </div>
      <Dialog open={isPopupVisible}>
        <DialogTitle id="save-data-title">Load Save Data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you have save data from previously using the app, copy-paste it below.
          </DialogContentText>
          <TextField autoFocus fullWidth multiline id="save-data" label="Save Data" margin="dense"
                     onChange={e => setSaveDataText(e.target.value)} onKeyDown={submitOnEnter}/>
          {error && <DialogContentText color="error">{error}</DialogContentText>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsPopupVisible(false)}>Cancel</Button>
          <Button onClick={processSaveData}>Load</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
};

export default Welcome;
