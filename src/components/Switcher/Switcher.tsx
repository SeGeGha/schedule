import React from 'react';

import { Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

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

  return (
    <div className="switcher">
      <Switch
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        onChange={onChange}
        checked={isChecked}
      />
      Mentor mode
    </div>
  );
};

export default Switcher;
