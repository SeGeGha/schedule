import React, { useState } from 'react';

import { Dropdown, Button, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import scheduleViews from '../../constants/scheduleViews';

import './Dropdown.scss';

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
    <Dropdown overlay={DropDownMenu} placement="bottomLeft">
      <Button>
        {view}
        {' '}
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default DropDown;
