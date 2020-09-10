import React, { useState } from 'react';

import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import scheduleViews from '../../constants/scheduleViews';

const DropDownMenu = (
  <Menu onClick={() => {}}>
    {scheduleViews.map(({ name, icon }) => (
      <Menu.Item key={name} icon={icon}>
        {name}
      </Menu.Item>
    ))}
  </Menu>
);

const DropDown: React.FC = () => {
  const [view] = useState(scheduleViews[0].name);

  return (
    <Dropdown.Button
      onClick={() => {}}
      overlay={DropDownMenu}
      icon={<DownOutlined />}
    >
      {view}
    </Dropdown.Button>
  );
};

export default DropDown;
