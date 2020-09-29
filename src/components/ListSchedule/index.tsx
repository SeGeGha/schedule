/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Input,
  Space,
  Table,
  Tag,
} from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import MainMenu from '../MainMenu';
import {
  formDate,
  parsingStr,
} from '../../utils';
import { defaultType } from '../../constants';
// import DateModal from '../DateModal';
import store from '../../store';
import { changeOneDataAsync } from '../../store/dataReducer';
// import TypeModal from '../TypeModal';
import { taskPage } from '../../store/modalReducer';
import { ObjData } from '../../models';
import DateField from '../DateField';
import TypeField from '../TypeField';

type ListProps = {
  load: boolean,
  isMentor: boolean,
  base: ObjData[],
  filter: ObjData[],
};

const columns1 = [
  {
    // title: '',
    dataIndex: 'main',
    filters: [
      { text: 'codewars', value: 'codewars' },
      { text: 'js task', value: 'js task' },
    ] as ObjData[],
    onFilter: (value: string, record: ObjData) => (record.type.indexOf(value) >= 0),
    render: (text: unknown, record: ObjData) => {
      const parseType = parsingStr(record.type, defaultType, null);
      const parseUrl = parsingStr(record.descriptionUrl, [] as string[]);
      const parseComment = parsingStr(record.comment, []);

      return (
        <Space direction="vertical" size="small">
          <div>
            Date &amp; Time:
            {formDate(record.dateTime, record.timeZone)}
          </div>
          <div>
            Type:
            {parseType && (
              <Tag color={parseType.color}>
                {parseType.name}
              </Tag>
            )}
          </div>
          <div>
            Name:
            {record.name}
          </div>
          <div>
            Description:
            {record.description}
          </div>
          <div>
            Url:
            <hr />
            {parseUrl && parseUrl.map((item) => (
              <div key={item}>
                <a href={item} target="_blank" rel="noreferrer">
                  {item}
                </a>
              </div>
            ))}
          </div>
          <div>
            Count comments:
            {parseComment && parseComment.length}
          </div>
          <div>
            Organizer:
            {record.organizer}
          </div>
          <div>
            <Button
              icon={<FileTextOutlined />}
              onClick={() => {
                store.dispatch(taskPage(record));
              }}
            >
              Page
            </Button>
          </div>
        </Space>
      );
    },
  },
];

const ListSchedule: React.FC<ListProps> = (props: ListProps) => {
  const {
    load,
    base,
    isMentor,
    filter,
  } = props;
  const [selectedRowKeys, changeSel] = useState([] as ObjData[]);
  const [columns, changeColumn] = useState(columns1);

  useEffect(() => {
    const [tmp] = columns1;
    if (isMentor) {
      const render = (text: unknown, record: ObjData) => {
        const parseType = parsingStr(record.type, defaultType);
        const parseUrl = parsingStr(record.descriptionUrl, [''], ['']);
        const parseComment = parsingStr(record.comment, []);

        const [newName, editName] = useState(record.name);
        const [newDescr, editDescr] = useState(record.description);

        return (
          <Space direction="vertical" size="small">
            <div>
              Date &amp; Time:
              <DateField
                record={record}
                accessFn={(newRecord: ObjData) => {
                  store.dispatch(changeOneDataAsync(newRecord));
                }}
              />
            </div>
            <div>
              Type:
              {parseType && (
                <TypeField
                  record={record}
                  accessFn={(newRecord: ObjData) => {
                    store.dispatch(changeOneDataAsync(newRecord));
                  }}
                />
              )}
            </div>
            <div>
              Name:
              <Input
                size="small"
                value={newName}
                onChange={(e) => editName(e.target.value)}
                onPressEnter={() => {
                  const newRecord = { ...record, name: newName };
                  store.dispatch(changeOneDataAsync(newRecord));
                }}
              />
            </div>
            <div>
              Description:
              <Input
                size="small"
                value={newDescr}
                onChange={(e) => editDescr(e.target.value)}
                onPressEnter={() => {
                  const newRecord = { ...record, description: newDescr };
                  store.dispatch(changeOneDataAsync(newRecord));
                }}
              />
            </div>
            <div>
              Url:
              <hr />
              {parseUrl && parseUrl.length && parseUrl.map((itemUrl, index, allList) => {
                const [newUrl, editUrl] = useState(itemUrl);
                return (
                  <Input
                    key={itemUrl}
                    size="small"
                    value={newUrl}
                    onChange={(e) => editUrl(e.target.value)}
                    onPressEnter={() => {
                      const newAllList = [...allList];
                      newAllList[index] = newUrl;
                      const newRecord = { ...record, descriptionUrl: JSON.stringify(newAllList) };
                      store.dispatch(changeOneDataAsync(newRecord));
                    }}
                  />
                );
              })}
            </div>
            <div>
              Count comments:
              {parseComment && parseComment.length}
            </div>
            <div>
              Organizer:
              {record.organizer}
            </div>
            <div>
              <Button
                icon={<FileTextOutlined />}
                onClick={() => {
                  store.dispatch(taskPage(record));
                }}
              >
                Page
              </Button>
            </div>

          </Space>
        );
      };
      changeColumn([{ ...tmp, render, filters: filter }] as any[]);
    } else {
      changeColumn([{ ...tmp, filters: filter }] as any[]);
    }
  }, [isMentor, filter]);

  return (
    <div>
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
  filter: state.data.filterTypes,
});

export default connect(mapSateToProps)(ListSchedule);
