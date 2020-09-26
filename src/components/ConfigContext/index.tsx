import React, { useState, useContext } from 'react';

import config from '../../config';
import { ScheduleState } from '../../models';

const ConfigContext = React.createContext({} as ScheduleState);

export const useConfigContext = (): ScheduleState => useContext(ConfigContext);

export const ConfigProvider: React.FC = ({ children }) => {
  // const [mode, setMode] = useState(config.mode);
  const [isMentor, setModes] = useState(config.isMentor);
  const [view, setView] = useState(config.view);

  // const toggleMode = (newMode: string) => {
  //   config.mode = newMode;
  //   setMode(newMode);
  // };

  const toggleModes = (newMode: boolean) => {
    config.isMentor = newMode;
    setModes(newMode);
  };
  const changeView = (newView: string) => {
    config.view = newView;
    setView(newView);
  };

  return (
    <ConfigContext.Provider value={{
      isMentor,
      toggleModes,
      // mode,
      // toggleMode,
      view,
      changeView,
    }}
    >
      { children }
    </ConfigContext.Provider>
  );
};
