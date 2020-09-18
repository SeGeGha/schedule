import React from 'react';

import { Switch } from 'antd';
// import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

import { useScheduleContext } from '../Schedule/ScheduleContext';
import { MENTOR_MODE, STUDENT_MODE } from '../../constants/settings';

import './Switcher.scss';

const Switcher: React.FC = () => {
  const { mode, toggleMode } = useScheduleContext();
  const isChecked = (mode === MENTOR_MODE);

  const onChange = () => {
    const newMode = (mode === MENTOR_MODE) ? STUDENT_MODE : MENTOR_MODE;

    toggleMode(newMode);
  };
  const mentor = 'mentor';
  const student = 'student';

  return (
    <div className="switcher">
      <Switch
        checkedChildren={mentor}
        unCheckedChildren={student}
        onChange={onChange}
        checked={isChecked}
      />
    </div>
  );
};

export default Switcher;
