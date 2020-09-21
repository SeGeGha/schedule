/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Table, Tag } from 'antd';
import dataSource from '../../mock';
import { ObjData } from '../../models';
import MainMenu from '../MainMenu';

const columns = [
  {
    title: 'Date & Time',
    dataIndex: 'dateTime',
    key: 'dateTime',
    fixed: 'left',
    // width: 130,
    // defaultSortOrder: 'descend',
    // sorter: (a: string, b: string) => (a > b ? 1 : -1),
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (type: string) => {
      const obj = type && JSON.parse(type);
      return obj && (
        <Tag color={obj.color}>
          {obj.name}
        </Tag>
      );
    },
    filters: [
      { text: 'codewars', value: 'codewars' },
      { text: 'js task', value: 'js task' },
    ],
    // filerMultiple: false,
    onFilter: (value: string, record: ObjData) => (record.type.indexOf(value) >= 0),
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
    render: (comment: string): string => {
      if (comment) {
        const jsonComm = JSON.parse(comment).length;
        if (jsonComm) {
          return String(jsonComm);
        }
      }
      return '';
    },
  },
  {
    title: 'Organizer',
    dataIndex: 'organizer',
    key: 'organizer',
  },
];

const TableSchedule: React.FC = (props: any) => {
  const { load } = props;
  const [selectedRowKeys, changeSel] = useState([] as string[]);
  return (
    <div>
      Table
      {selectedRowKeys.toString()}
      <MainMenu rows={selectedRowKeys} />
      <Table
        bordered
        pagination={{ pageSize: 20 }}
        loading={load}
        size="small"
        dataSource={dataSource}
        columns={columns as any}
        rowSelection={{
          selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
          ],
          onChange: (a1, a2) => {
            changeSel(a1 as string[]);
            window.console.log('onChange: list keys=', a1, 'list objects=', a2);
          },
        }}
      />
    </div>

  );
};

const mapSateToProps = (state: any) => ({
  load: state.data.loading,
});

export default connect(mapSateToProps)(TableSchedule);
