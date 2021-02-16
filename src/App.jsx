import React, { useState } from "react";
import {
  createMuiTheme,
  CssBaseline,
  Link,
  ThemeProvider,
  Typography,
  useMediaQuery
} from "@material-ui/core";

import Calculator from "./calculator/Calculator";
import Welcome from "./main/Welcome";

import "./App.css";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [saveData, setSaveData] = useState({});
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: "dark",
        },
      })
  );

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
    </ThemeProvider>
  );
};

export default App;
