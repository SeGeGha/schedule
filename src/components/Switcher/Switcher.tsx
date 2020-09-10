/* eslint-disable no-console */
import React from 'react';

import { Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

import './Switcher.scss';

const Switcher: React.FC = () => (
  <div className="switcher">
    <Switch
      checkedChildren={<CheckOutlined />}
      unCheckedChildren={<CloseOutlined />}
      onChange={() => console.log('change')}
    />
    Режим Ментора
  </div>
);

export default Switcher;
