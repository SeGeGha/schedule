import React from 'react';

import { LIST_VIEW, MENTOR_MODE, TABLE_VIEW } from '../../constants/settings';
import { useScheduleContext } from '../Schedule/ScheduleContext';

import './Main.scss';
import TableSchedule from '../TableSchedule';
import ListSchedule from '../ListSchedule';
import CalendarSchedule from '../CalendarSchedule';
import MainMenu from '../MainMenu';

const Main: React.FC = () => {
  const { view, mode } = useScheduleContext();
  const isMentor = mode === MENTOR_MODE;
  let currentView;
  switch (view) {
    case TABLE_VIEW:
      currentView = <TableSchedule />;
      break;
    case LIST_VIEW:
      currentView = <ListSchedule />;
      break;
    default:
      currentView = <CalendarSchedule />;
  }

  return (
    <main>
      <MainMenu />
      <div>
        {currentView}
      </div>
      <div>
        mode=
        {mode}
        {isMentor}
      </div>
    </main>
  );
};

export default Main;
