import React, { useState } from "react";
import {
  createMuiTheme,
  CssBaseline,
  Link,
  ThemeProvider,
  Typography,
  useMediaQuery
} from "@material-ui/core";

import Calculator from "./Calculator";
import Welcome from "./Welcome";

import "./App.css";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [saveData, setSaveData] = useState({});
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode],
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
        <footer>
          <Typography>
            View on <Link href="https://github.com/knazir/genshin-calc">GitHub</Link>
          </Typography>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default App;
