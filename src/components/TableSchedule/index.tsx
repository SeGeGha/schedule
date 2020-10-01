/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  // Input,
  Table,
  // Tag,
} from 'antd';
import { FormOutlined, FileTextOutlined } from '@ant-design/icons';
import MainMenu from '../MainMenu';
import store from '../../store';
import { ObjData } from '../../models';
import { changeOneDataAsync } from '../../store/dataReducer';
import {
  parsingStr,
} from '../../utils';
import { defaultType } from '../../constants';
// import TypeModal from '../TypeModal';
import InputField from '../InputField';
import { taskPage } from '../../store/modalReducer';
import DateField from '../DateField';
import TypeField from '../TypeField';

const columns1 = [
  {
    title: 'Type',
    dataIndex: 'type',
    filters: [
      { text: 'codewars', value: 'codewars' },
      { text: 'js task', value: 'js task' },
    ] as ObjData[],
    onFilter: (value: string, record: ObjData) => (record.type.indexOf(value) >= 0),
  },
];

type TableProps = {
  load: boolean,
  isMentor: boolean,
  base: any,
  filter: ObjData[],
};

const TableSchedule: React.FC<TableProps> = (props: TableProps) => {
  const {
    load,
    base,
    isMentor,
    filter,
  } = props;
  const [selectedRowKeys, changeSel] = useState([] as ObjData[]);
  const [columns, changeColumn] = useState(columns1);

  useEffect(() => {
    const index = columns.findIndex((item) => item.dataIndex === 'type');
    columns[index].filters = filter;
  }, [filter, columns]);

  useEffect(() => {
    const tmp = [
      {
        title: 'Date & Time',
        dataIndex: 'dateTime',
        fixed: 'left',
        render: (text: string, record: any) => (
          <>
            <DateField
              canEdit={isMentor}
              record={record}
              accessFn={(newRecord: ObjData) => {
                store.dispatch(changeOneDataAsync(newRecord));
              }}
            />
          </>
        ),
      },
      {
        title: 'Type',
        dataIndex: 'type',
        render: (type: string, record: any) => {
          const obj = parsingStr(type, defaultType);
          return obj && (
            <>
              <TypeField
                record={record}
                canEdit={isMentor}
                accessFn={(newRecord: ObjData) => {
                  store.dispatch(changeOneDataAsync(newRecord));
                }}
              />
            </>
          );
        },
        filters: [
          { text: 'codewars', value: 'codewars' },
          { text: 'js task', value: 'js task' },
        ] as ObjData[],
        onFilter: (value: string, record: ObjData) => (record.type.indexOf(value) >= 0),
      },
      {
        title: 'name',
        dataIndex: 'name',
        render: (text: string, record: any) => (
          <>
            <InputField
              canEdit={isMentor}
              defaultValue={text}
              accessFn={(value: any) => {
                const newRecord = { ...record, name: value };
                store.dispatch(changeOneDataAsync(newRecord));
              }}
            />
          </>
        ),
      },
      {
        title: 'Description',
        dataIndex: 'description',
        ellipsis: true,
        render: (text: string, record: any) => (
          <>
            <InputField
              canEdit={isMentor}
              defaultValue={text}
              accessFn={(value: any) => {
                const newRecord = { ...record, description: value };
                store.dispatch(changeOneDataAsync(newRecord));
              }}
            />
          </>
        ),
      },
      {
        title: 'Url',
        dataIndex: 'descriptionUrl',
        ellipsis: true,
        render: (text: string, record: any) => {
          const parseUrl = parsingStr(text, [] as string[]);
          return parseUrl && (
            isMentor
              ? (
                <InputField
                  defaultValue={parseUrl[0] || ''}
                  canEdit={isMentor}
                  accessFn={(newValue) => {
                    parseUrl[0] = newValue;
                    const newRecord = { ...record, descriptionUrl: JSON.stringify(parseUrl) };
                    store.dispatch(changeOneDataAsync(newRecord));
                  }}
                />
              )
              : !!parseUrl.length && (
                <a href={parseUrl[0]} target="_blank" rel="noreferrer">
                  {parseUrl[0]}
                </a>
              )
          );
        },
      },
      {
        title: 'Place',
        dataIndex: 'place',
        render: (place: string) => {
          const placeObj = parsingStr(place, {} as ObjData);
          window.console.log(placeObj);
          return (placeObj && placeObj.name) ? placeObj.name : 'Online';
        },
      },
      {
        title: 'Organizer',
        dataIndex: 'organizer',
      },
      {
        title: 'Comment',
        dataIndex: 'comment',
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
        title: 'Action',
        dataIndex: 'action',
        editable: true,
        render: (text: unknown, record: any) => (
          <Button
            icon={!isMentor ? (<FileTextOutlined />) : (<FormOutlined />)}
            onClick={() => {
              store.dispatch(taskPage(record));
            }}
          >
            {isMentor ? 'Edit' : 'Page'}
          </Button>
        ),
      },
    ];
    changeColumn([...tmp] as any[]);
  }, [isMentor, base]);

  return (
    <div>
      {JSON.stringify(selectedRowKeys.map((t: ObjData) => t.id))}
      <MainMenu
        rows={selectedRowKeys}
        changeSel={changeSel}
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
            // window.console.log('onChange: list keys=', a1, 'list objects=', a2);
          },
        }}
      />
    </div>
  );
};

const mapSateToProps = (state: any) => ({
  load: state.data.loading,
  base: state.data.dataBase,
  filter: state.data.filterTypes,
});

export default connect(mapSateToProps)(TableSchedule);
