import React, { useRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@material-ui/core";
import CopyIcon from "@material-ui/icons/AssignmentReturned";

import ReactUtils from "../utils/ReactUtils";

const SaveDialog = ({ open, setOpen, saveData }) => {
  // State
  const saveDataText = JSON.stringify(saveData, null, 2);

  // Event Handlers
  const onCopyToClipboard = e => {
    saveDataTextareaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    ReactUtils.onSuccess("Successfully copied data to clipboard!");
  };

  // DOM Elements
  const saveDataTextareaRef = useRef(null);

  if (!open) return null;
  return (
    <>
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle id="saveDataTitle">Save Data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Copy-paste the output below to load your artifacts into the app next time.
          </DialogContentText>
          <TextField readOnly fullWidth multiline id="saveData" className="saveData" label="Save Data" margin="dense"
                     inputRef={saveDataTextareaRef} value={saveDataText}
                     inputProps={{ style: { fontFamily: "source-code-pro, monospace" } }}/>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" startIcon={<CopyIcon/>} onClick={onCopyToClipboard}>Copy to Clipboard</Button>
          <Button variant="contained" onClick={() => setOpen(false)}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SaveDialog;
