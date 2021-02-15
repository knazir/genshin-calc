import React, { useState } from "react";
import {
  Paper,
  Typography
} from "@material-ui/core";

const StatPanel = ({ title }) => {
  // State
  const [stats, setState] = useState([]);

  return (
    <Paper className="statPanel formPanel">
      <Typography variant="h5">{title}</Typography>
    </Paper>
  );
};

export default StatPanel;
