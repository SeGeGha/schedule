import React from 'react';
import {
  TableOutlined, ScheduleOutlined, ProfileOutlined,
} from '@ant-design/icons';

import { TABLE_VIEW, CALENDAR_VIEW, LIST_VIEW } from './settings';

const tableIcon = <TableOutlined />;
const calendarIcon = <ScheduleOutlined />;
const listIcon = <ProfileOutlined />;

export default [
  {
    name: TABLE_VIEW,
    icon: tableIcon,
  },
  {
    name: CALENDAR_VIEW,
    icon: calendarIcon,
  },
  {
    name: LIST_VIEW,
    icon: listIcon,
  },
];
