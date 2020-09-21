import React from 'react';

import { Dropdown, Button, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import scheduleViews from '../../constants/scheduleViews';
import { useConfigContext } from '../ConfigContext/index';

import './Dropdown.scss';

const DropDownMenu = (clickHandler: (id: string) => void) => (
  <Menu onClick={() => {}}>
    {scheduleViews.map(({ name, icon }) => (
      <Menu.Item key={name} icon={icon} onClick={({ key }) => clickHandler(key as string)}>
        {name}
      </Menu.Item>
    ))}
  </Menu>
);

const DropDown: React.FC = () => {
  const { view, changeView } = useConfigContext();

  return (
    <Dropdown overlay={DropDownMenu(changeView)} placement="bottomLeft">
      <Button>
        {view}
        {' '}
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default DropDown;
