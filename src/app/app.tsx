import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import { ConfigProvider } from '../components/ConfigContext';
import { getAllDataAsync } from '../store/dataReducer';

const App: React.FC = () => (
  <ConfigProvider>
    <Header />
    <Provider store={store}>
      <Main />
    </Provider>
  </ConfigProvider>
);

export default App;
store.dispatch(getAllDataAsync());
