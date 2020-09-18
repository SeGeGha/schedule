import React from 'react';

// import DropDown from '../Dropdown/Dropdown';
import { useScheduleContext } from '../Schedule/ScheduleContext';

import './Main.scss';

const Main: React.FC = () => {
  const { view, mode } = useScheduleContext();
  return (
    <main>
      <div>
        view=
        {view}
      </div>
      <div>
        mode=
        {mode}
      </div>
    </main>
  );
};

export default Main;
