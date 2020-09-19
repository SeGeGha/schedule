/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const dataBase = [
  {
    id: '1',
    name: 'Mike',
    description: 'descr',
    descriptionUrl: 'descrUrl',
    type: 'type',
    dateTime: '2020-10-30 20:00',
    timeZone: '+2',
    place: '{name: "Minsk", lat: 20, lon: 50}',
    comment: '[{"message": "Comment", "mane": "Anna"}]',
    organizer: '1',
  },
  {
    id: '2',
    name: 'Mike',
    description: 'descr',
    descriptionUrl: 'descrUrl',
    type: 'type',
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
    type: 'type',
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
    type: 'type',
    dateTime: '2020-09-30 20:00',
    timeZone: '+2',
    place: '{name: "Minsk", lat: 20, lon: 50}',
    comment: '[{"message": "Comment", "mane": "Anna"}]',
    organizer: '1',
  },
];

const dataSource = dataBase.map((item) => ({ ...item, key: item.id }));

const columns = [
  {
    title: 'Date & Time',
    dataIndex: 'dateTime',
    key: 'dateTime',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Url',
    dataIndex: 'descriptionUrl',
    key: 'description',
  },
  {
    title: 'Comment',
    dataIndex: 'comment',
    key: 'comment',
    render: (comment: string): string => ((comment && JSON.parse(comment).length) ? 'Y' : ''),
  },
  {
    title: 'Organizer',
    dataIndex: 'organizer',
    key: 'organizer',
  },
];

export {
  dataSource,
  columns,
};
