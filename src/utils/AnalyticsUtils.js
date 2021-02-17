import ReactGA from "react-ga";

class AnalyticsUtils {
  constructor() {
    try {
      ReactGA.initialize("G-SZJNJJP2JP");
    } catch {
      this._isDisabled = true;
    }
  }

  logEvent(params) {
    if (this._isDisabled) return;
    ReactGA.event(params);
  }

}

export default new AnalyticsUtils();
