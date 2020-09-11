import React, { useState, useContext } from 'react';

import config from '../../models/config';

interface ScheduleState {
  mode: string,
  view: string,
  toggleMode: (newMode: string) => void,
  changeView: (newView: string) => void,
}

const ScheduleContext = React.createContext({} as ScheduleState);

export const useScheduleContext = (): ScheduleState => useContext(ScheduleContext);

export const ScheduleProvider: React.FC = ({ children }) => {
  const [mode, setMode] = useState(config.mode);
  const [view, setView] = useState(config.view);

  const toggleMode = (newMode: string) => {
    config.mode = newMode;
    setMode(newMode);
  };
  const changeView = (newView: string) => {
    config.view = newView;
    setView(newView);
  };

  return (
    <ScheduleContext.Provider value={{
      mode,
      toggleMode,
      view,
      changeView,
    }}
    >
      { children }
    </ScheduleContext.Provider>
  );
};
