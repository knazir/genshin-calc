import React, { useEffect, useRef, useState } from "react";
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
import LinkIcon from "@material-ui/icons/Link";

import ReactUtils from "../utils/ReactUtils";

const SaveDialog = ({ open, setOpen, saveData }) => {
  // Helpers
  const getShareableLink = (saveData) => {
    const encodedData = btoa(JSON.stringify(saveData));
    const { protocol, host, pathname } = window.location;
    return `${protocol}//${host}${pathname}?data=${encodedData}`;
  };

  // State
  const [isCopyingLink, setIsCopyingLink] = useState(false);
  const saveDataText = JSON.stringify(saveData, null, 2);
  const shareableLink = getShareableLink(saveData);

  // Effects
  useEffect(() => {
    if (!isCopyingLink) return;
    shareableLinkTextareaRef.current.select();
    document.execCommand("copy");
    ReactUtils.onSuccess("Copied data to clipboard!");
    setIsCopyingLink(false);
  }, [isCopyingLink]);

  // Event Handlers
  const onCopySaveData = e => {
    saveDataTextareaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    ReactUtils.onSuccess("Copied data to clipboard!");
  };
  const onCopyLink = () => {
    setIsCopyingLink(true);
  };

  // DOM Elements
  const saveDataTextareaRef = useRef(null);
  const shareableLinkTextareaRef = useRef(null);
  const shareableLinkStyle = isCopyingLink ? null : { display: "none" };

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
           <TextField readOnly fullWidth id="link" label="Link" inputRef={shareableLinkTextareaRef}
                      style={shareableLinkStyle} value={shareableLink}/>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" startIcon={<CopyIcon/>} onClick={onCopySaveData}>Copy to Clipboard</Button>
          <Button variant="contained" startIcon={<LinkIcon/>} onClick={onCopyLink}>Copy Link to Clipboard</Button>
          <Button variant="contained" onClick={() => setOpen(false)}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SaveDialog;
