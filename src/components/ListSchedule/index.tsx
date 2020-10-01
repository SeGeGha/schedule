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
  Space,
  Table,
  // Tag,
} from 'antd';
import { FileTextOutlined, FormOutlined } from '@ant-design/icons';
import {
  // formDate,
  parsingStr,
} from '../../utils';
import { defaultType } from '../../constants';
import store from '../../store';
import { changeOneDataAsync } from '../../store/dataReducer';
import { taskPage } from '../../store/modalReducer';
import DateField from '../DateField';
import TypeField from '../TypeField';
import InputField from '../InputField';
import MainMenu from '../MainMenu';
import { ObjData } from '../../models';

type ListProps = {
  load: boolean,
  isMentor: boolean,
  base: ObjData[],
  filter: ObjData[],
};

const columns1 = [
  {
    dataIndex: 'main',
    filters: [
      { text: 'js task', value: 'js task' },
    ] as ObjData[],
    onFilter: (value: string, record: ObjData) => (record.type.indexOf(value) >= 0),
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
    // if (isMentor) {
    const render = (text: unknown, record: ObjData) => {
      const parseType = parsingStr(record.type, defaultType);
      const parseUrl = parsingStr(record.descriptionUrl, [] as string[]);
      const parseComment = parsingStr(record.comment, [] as ObjData[]);
      const parsePlace = parsingStr(record.place, {} as ObjData);

      // const [newName, editName] = useState(record.name);
      // const [newDescr, editDescr] = useState(record.description);

      return (
        <Space direction="vertical" size="small">
          <div>
            <h3>
              Date &amp; Time:
            </h3>
            <DateField
              record={record}
              canEdit={isMentor}
              accessFn={(newRecord: ObjData) => {
                store.dispatch(changeOneDataAsync(newRecord));
              }}
            />
          </div>
          <div>
            <h3>
              Type:
            </h3>
            {parseType && (
              <TypeField
                canEdit={isMentor}
                record={record}
                accessFn={(newRecord: ObjData) => {
                  store.dispatch(changeOneDataAsync(newRecord));
                }}
              />
            )}
          </div>
          <div>
            <h3>
              Name:
            </h3>
            <InputField
              canEdit={isMentor}
              defaultValue={record.name}
              accessFn={(newValue: string) => {
                if (isMentor) {
                  store.dispatch(changeOneDataAsync({ ...record, name: newValue }));
                }
              }}
            />
          </div>
          <div>
            <h3>
              Description:
            </h3>
            <InputField
              canEdit={isMentor}
              defaultValue={record.description}
              accessFn={(newValue: string) => {
                if (isMentor) {
                  store.dispatch(changeOneDataAsync({ ...record, description: newValue }));
                }
              }}
            />
          </div>
          <div>
            <h3>
              Url:
            </h3>
            <hr />
            {parseUrl && !!parseUrl.length && parseUrl.map((itemUrl, index, allList) => (
              <div key={`${itemUrl}${String(index)}`}>
                {isMentor
                  ? (
                    <InputField
                      defaultValue={itemUrl}
                      canEdit={isMentor}
                      accessFn={(newValue) => {
                        const newAllList = [...allList];
                        newAllList[index] = newValue;
                        const newRecord = { ...record, descriptionUrl: JSON.stringify(newAllList) };
                        store.dispatch(changeOneDataAsync(newRecord));
                      }}
                    />
                  )
                  : (
                    <a href={itemUrl} target="_blank" rel="noreferrer">
                      {itemUrl}
                    </a>
                  )}
              </div>
            ))}
          </div>
          <div>
            <h3>
              Place:
            </h3>
            {(parsePlace && parsePlace.name) ? parsePlace.name : 'Online'}
            {(parsePlace && parsePlace.address) && `\n${parsePlace.address}`}
          </div>
          <div>
            <h3>
              Comment:
            </h3>
            {parseComment && parseComment.length && `Total: ${parseComment.length}`}
            {parseComment && parseComment.length && `\nFirst: ${parseComment[0].message}`}
          </div>
          <div>
            <h3>
              Organizer:
            </h3>
            {record.organizer}
          </div>
          <div>
            <Button
              icon={!isMentor ? (<FileTextOutlined />) : (<FormOutlined />)}
              onClick={() => {
                store.dispatch(taskPage(record));
              }}
            >
              {isMentor ? 'Edit' : 'Page'}
            </Button>
          </div>

        </Space>
      );
    };
    changeColumn([{ ...tmp, render, filters: filter }] as any[]);
    // } else {
    //   changeColumn([{ ...tmp, filters: filter }] as any[]);
    // }
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
