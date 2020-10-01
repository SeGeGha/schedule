import React from 'react';
import { connect } from 'react-redux';

import { LIST_VIEW, TABLE_VIEW } from '../../constants/settings';
import { useConfigContext } from '../ConfigContext';

import './Main.scss';
import TableSchedule from '../TableSchedule';
import ListSchedule from '../ListSchedule';
import CalendarSchedule from '../CalendarSchedule';
import PageModal from '../PageModal';
import store from '../../store';
import { changeOneDataAsync } from '../../store/dataReducer';
import { AllStore, ObjData } from '../../models';

type MainProps = {
  record: ObjData,
};

const Main: React.FC<MainProps> = (props) => {
  const { record } = props;
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
        {currentView}
      </div>

      <PageModal
        isVisible={!!record}
        isEdit={isMentor}
        defaultData={record}
        accessFn={(newRecord: ObjData) => {
          store.dispatch(changeOneDataAsync({ ...newRecord }));
        }}
      />
    </main>
  );
};

const mapStateToProps = (state: AllStore) => {
  const { modal } = state;
  const { pageRecord } = modal;
  return {
    record: pageRecord,
  };
};

export default connect(mapStateToProps)(Main);
