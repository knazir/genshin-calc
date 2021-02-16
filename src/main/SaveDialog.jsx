import React, { useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  TextField
} from "@material-ui/core";
import CopyIcon from "@material-ui/icons/AssignmentReturned";
import Alert from "@material-ui/lab/Alert";

const SaveDialog = ({ open, setOpen, saveData }) => {
  // State
  const [isCopiedAlertOpen, setIsCopiedAlertOpen] = useState(false);
  const saveDataText = JSON.stringify(saveData, null, 2);

  // Event Handlers
  const onCopyToClipboard = e => {
    saveDataTextareaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    setIsCopiedAlertOpen(true);
  };
  const onClose = () => {
    setIsCopiedAlertOpen(false);
    setOpen(false);
  };
  const onCopiedAlertClose = () => {
    setIsCopiedAlertOpen(false);
  };

  // DOM Elements
  const saveDataTextareaRef = useRef(null);

  if (!open) return null;
  return (
    <>
      <Dialog fullWidth open={open} onClose={onClose}>
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
          <Button variant="contained" onClick={onClose}>Ok</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={isCopiedAlertOpen} autoHideDuration={3000} onClose={onCopiedAlertClose}>
        <Alert onClose={onCopiedAlertClose} severity="success">
          Successfully copied data to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
};

export default SaveDialog;
