/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import React from 'react';
// import { Tag } from 'antd';
import { ObjData } from '../models';

const dataBase = [
  {
    id: '1',
    name: 'Mike',
    description: 'descr',
    descriptionUrl: 'descrUrl',
    type: '{"name": "ts task", "color": "red"}',
    dateTime: '2020-10-30 20:00',
    timeZone: '+2',
    place: '{name: "Minsk", lat: 20, lon: 50}',
    comment: '[{"message": "Comment1", "name": "Anna"},{"message": "Comment2",'
      + ' "name": "Serge"},{"message": "Comment3", "name": "Sasha"}]',
    organizer: '1',
  },
  {
    id: '2',
    name: 'Mike',
    description: 'descr',
    descriptionUrl: 'descrUrl',
    type: '{"name": "deadline", "color": "violet"}',
    dateTime: '2020-10-10 20:00',
    timeZone: '+2',
    place: '{"name": "Minsk", "lat": 20, "lon": 50}',
    comment: '[]',
    organizer: '1',
  },
  {
    id: '3',
    name: 'Mike',
    description: 'descr',
    descriptionUrl: 'descrUrl',
    type: '{"name": "js task", "color": "blue"}',
    dateTime: '2020-09-30 20:00',
    timeZone: '+2',
    place: '{"name": "Minsk", "lat": 20, "lon": 50}',
    comment: '',
    organizer: '1',
  },
  {
    id: '4',
    name: 'Mike',
    description: 'descr',
    descriptionUrl: 'descrUrl',
    type: '{"name": "codewars", "color": "green"}',
    dateTime: '2020-09-30 20:00',
    timeZone: '+2',
    place: '{name: "Minsk", lat: 20, lon: 50}',
    comment: '[{"message": "Comment", "mane": "Anna"}]',
    organizer: '1',
  },
];

function actualBase(base: ObjData[]) {
  const data = base
    .map((item) => ({ ...item, key: item.id }));
  data.sort((a: ObjData, b: ObjData) => (a.dateTime > b.dateTime ? 1 : -1));
  return data;
}

const dataSource = actualBase(dataBase);

export default dataSource;
