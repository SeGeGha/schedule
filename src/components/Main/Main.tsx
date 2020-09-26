import React from 'react';

import { LIST_VIEW, TABLE_VIEW } from '../../constants/settings';
import { useConfigContext } from '../ConfigContext';

import './Main.scss';
import TableSchedule from '../TableSchedule';
import ListSchedule from '../ListSchedule';
import CalendarSchedule from '../CalendarSchedule';

const Main: React.FC = () => {
  const { view, isMentor } = useConfigContext();
  let currentView;
  switch (view) {
    case TABLE_VIEW:
      currentView = <TableSchedule isMentor={isMentor} />;
      break;
    case LIST_VIEW:
      currentView = <ListSchedule isMentor={isMentor} />;
      break;
    default:
      currentView = <CalendarSchedule />;
  }

  return (
    <main>
      <div>
        mode=
        {isMentor ? 'mentor' : 'student'}
      </div>
      <div>
        {currentView}
      </div>
    </main>
  );
};

export default Main;
