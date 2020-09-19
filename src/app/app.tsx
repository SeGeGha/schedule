import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import { ScheduleProvider } from '../components/Schedule/ScheduleContext';
import { getAllDataAsync } from '../store/dataReducer';

const App: React.FC = () => (
  <ScheduleProvider>
    <Header />
    <Provider store={store}>
      <Main />
    </Provider>
  </ScheduleProvider>
);

export default App;
store.dispatch(getAllDataAsync());
