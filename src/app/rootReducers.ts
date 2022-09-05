import mediaRunningReducer from "./mediaRunning/mediaRunning";
import accountReducer from "./account/reducers";

const rootReducers = {
  mediaRunning: mediaRunningReducer,
  account: accountReducer,
};

export default rootReducers;
