import React, { useState } from "react";
import  {
  Button,
  Typography
} from "@material-ui/core";

import "./Welcome.css";
import LoadDialog from "./LoadDialog";

const Welcome = ({ loadApp }) => {
  // State
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  return (
    <>
      <div className="welcome">
        <Typography variant="h2" gutterBottom>Genshin Impact Damage Calculator</Typography>
        <div className="actionButtons">
          <Button variant="contained" color="primary" onClick={() => setIsPopupVisible(true)}>Load Save</Button>
          <Button variant="contained" onClick={loadApp}>Get Started</Button>
        </div>
      </div>
      <LoadDialog open={isPopupVisible} setOpen={setIsPopupVisible} onSaveDataSubmit={loadApp}/>
    </>
  );
};

export default Welcome;
