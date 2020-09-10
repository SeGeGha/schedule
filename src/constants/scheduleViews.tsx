import React from 'react';
import {
  TableOutlined, ScheduleOutlined, ProfileOutlined,
} from '@ant-design/icons';

const tableIcon = <TableOutlined />;
const calendarIcon = <ScheduleOutlined />;
const listIcon = <ProfileOutlined />;

export default [
  {
    name: 'Table View',
    icon: tableIcon,
  },
  {
    name: 'Calendar View',
    icon: calendarIcon,
  },
  {
    name: 'List View',
    icon: listIcon,
  },
];
