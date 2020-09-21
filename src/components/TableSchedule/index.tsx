/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Table, Tag } from 'antd';
// import dataSource from '../../mock';
import { ObjData } from '../../models';
import MainMenu from '../MainMenu';

const columns1 = [
  {
    title: 'Date & Time',
    dataIndex: 'dateTime',
    // key: 'dateTime',
    fixed: 'left',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    // key: 'type',
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
    onFilter: (value: string, record: ObjData) => (record.type.indexOf(value) >= 0),
  },
  {
    title: 'name',
    dataIndex: 'name',
    editable: true,
    // key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    editable: true,
    ellipsis: true,
    // key: 'description',
  },
  {
    title: 'Url',
    dataIndex: 'descriptionUrl',
    // key: 'description',
  },
  {
    title: 'Comment',
    dataIndex: 'comment',
    // key: 'comment',
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
    // key: 'organizer',
  },
];

type TableProps = {
  load: boolean,
  isMentor: boolean,
  base: any,
};

const TableSchedule: React.FC<TableProps> = (props: TableProps) => {
  const { load, base, isMentor } = props;
  const [selectedRowKeys, changeSel] = useState([] as ObjData[]);
  // const [isEditing, toggleEdit] = useState(false);
  const [columns, changeColumn] = useState(columns1);
  // const [dataBase, changeBase] = useState(dataSource);
  useEffect(() => {
    window.console.log(Date.now());
    if (isMentor) {
      changeColumn([...columns1, {
        title: 'Act',
        dataIndex: 'act',
        render: (text: unknown, record: any) => (
          <Button
            onClick={() => window.console.log(record)}
          >
            Edit
          </Button>
        ),
        // render: () => 'ok',
      }] as any[]);
    } else {
      changeColumn([...columns1]);
    }
  }, [isMentor]);
  // const columns = { ...columns1 };

  return (
    <div>
      base
      <hr />
      {JSON.stringify(base.map((t: ObjData) => `${t.id} `))}
      <hr />
      Table
      {isMentor ? 'mentor' : 'student'}
      selected
      <hr />
      {JSON.stringify(selectedRowKeys.map((t: ObjData) => t.id))}
      <MainMenu
        rows={selectedRowKeys}
        // base={dataBase}
        // toEdit={changeBase}
      />
      <Table
        bordered
        pagination={{ pageSize: 10 }}
        loading={load}
        size="small"
        dataSource={base}
        columns={columns as any}
        rowSelection={{
          selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
          ],
          onChange: (a1, a2) => {
            changeSel(a2 as ObjData[]);
            window.console.log('onChange: list keys=', a1, 'list objects=', a2);
          },
        }}
      />
    </div>

  );
};

const mapSateToProps = (state: any) => ({
  load: state.data.loading,
  base: state.data.dataBase,
});

export default connect(mapSateToProps)(TableSchedule);
