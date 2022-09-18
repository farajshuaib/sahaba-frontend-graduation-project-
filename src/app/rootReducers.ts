import mediaRunningReducer from "./mediaRunning/mediaRunning";
import accountReducer from "./account/reducers";
import  generalReducers  from "./general/reducers";

const rootReducers = {
  mediaRunning: mediaRunningReducer,
  account: accountReducer,
  general: generalReducers
};

export default rootReducers;
