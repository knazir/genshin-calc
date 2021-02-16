import React, { useEffect, useState } from "react";
import {
  createMuiTheme,
  CssBaseline,
  Link, Snackbar,
  ThemeProvider,
  Typography,
  useMediaQuery
} from "@material-ui/core";

import ReactUtils from "./utils/ReactUtils";

import Calculator from "./calculator/Calculator";
import Welcome from "./main/Welcome";

import "./App.css";
import Alert from "@material-ui/lab/Alert";

const App = () => {
  // State
  const [isLoaded, setIsLoaded] = useState(false);
  const [saveData, setSaveData] = useState({});
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Effects
  useEffect(() => {
    ReactUtils.registerSuccessHandler(onSuccess);
    ReactUtils.registerErrorHandler(onError);
  }, []);

  // Theme
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: "dark",
        },
      })
  );

  // Event Handlers
  const onSuccess = message => {
    setSuccessMessage(message);
    setIsSuccessOpen(true);
  };
  const onError = message => {
    setErrorMessage(message);
    setIsErrorOpen(true);
  };
  const loadApp = loadedSaveData => {
    setSaveData(Object.assign(saveData, loadedSaveData));
    setIsLoaded(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div className="app">
        {
          !isLoaded
            ? <Welcome loadApp={loadApp}/>
            : <Calculator data={saveData}/>
        }
        <div className="credits">
          <Typography>
            View on <Link href="https://github.com/knazir/genshin-calc" target="_blank">GitHub</Link>
          </Typography>
        </div>
      </div>
      <Snackbar open={isSuccessOpen} autoHideDuration={3000} onClose={() => setIsSuccessOpen(false)}>
        <Alert onClose={() => setIsSuccessOpen(false)} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={isErrorOpen} autoHideDuration={3000} onClose={() => setIsErrorOpen(false)}>
        <Alert onClose={() => setIsErrorOpen(false)} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default App;
