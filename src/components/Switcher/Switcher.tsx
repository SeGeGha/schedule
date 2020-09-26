import React from 'react';
import { Switch } from 'antd';
import { useConfigContext } from '../ConfigContext';
import './Switcher.scss';

const Switcher: React.FC = () => {
  const { isMentor, toggleModes } = useConfigContext();
  const onChange = () => toggleModes(!isMentor);

  return (
    <div className="switcher">
      <Switch
        checkedChildren="mentor"
        unCheckedChildren="student"
        onChange={onChange}
        checked={isMentor}
      />
    </div>
  );
};

export default Switcher;
