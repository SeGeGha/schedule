import React from 'react';

import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import { ScheduleProvider } from '../components/Schedule/ScheduleContext';

const App: React.FC = () => (
  <ScheduleProvider>
    <Header />
    <Main />
  </ScheduleProvider>
);

export default App;
