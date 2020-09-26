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
  Modal,
  Input,
  Table,
  Tag,
} from 'antd';
import { FormOutlined, FileTextOutlined } from '@ant-design/icons';
import MainMenu from '../MainMenu';
import store from '../../store';
import { ObjData } from '../../models';
import { changeOneDataAsync } from '../../store/dataReducer';
import {
  // createFilterTypes,
  // createUniqTypesObj,
  formDate,
  parsingStr,
  // uniqStr,
} from '../../utils';
import DateModal from '../DateModal';
import { defaultType } from '../../constants';
import TypeModal from '../TypeModal';

const columns1 = [
  {
    title: 'Date & Time',
    dataIndex: 'dateTime',
    fixed: 'left',
    editable: true,
    render: (text:string, record: any) => formDate(text, record.timeZone),
  },
  {
    title: 'Type',
    dataIndex: 'type',
    editable: true,
    render: (type: string) => {
      // const obj = type && JSON.parse(type);
      const obj = parsingStr(type, defaultType, null);
      return obj && (
        <Tag color={obj.color}>
          {obj.name}
        </Tag>
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
    editable: true,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    editable: true,
    ellipsis: true,
  },
  {
    title: 'Url',
    dataIndex: 'descriptionUrl',
    editable: true,
    render: (text: string) => {
      if (!text) {
        return null;
      }
      let link;
      try {
        const [link1] = JSON.parse(text);
        link = link1;
      } catch (e) {
        link = text;
      }
      return (
        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <a href={link} target="_blank" rel="noreferrer">
            {link}
          </a>
        </div>
      );
    },
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
    title: 'Organizer',
    dataIndex: 'organizer',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    editable: true,
    render: (text: unknown, record: any) => {
      const aa = 'tt';
      const [vv, vis] = useState(false);
      return (
        <>
          <Button
            icon={<FileTextOutlined />}
            onClick={() => {
              window.console.log(record);
              vis(true);
            }}
          >
            Page
          </Button>
          <Modal
            visible={vv}
            bodyStyle={{ minHeight: '50vh' }}
            width={1000}
            okText="Save"
            onOk={() => {
              window.console.log('saved');
              vis(false);
            }}
            onCancel={() => vis(false)}
          >
            modal read
            {aa}
            {JSON.stringify(record)}
            {JSON.stringify(record)}
            {JSON.stringify(record)}
            <hr />
            end
          </Modal>
        </>
      );
    },
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
    window.console.log(Date.now());
    if (isMentor) {
      const tmp = columns1.map((item) => {
        if (item.editable) {
          switch (item.dataIndex) {
            case 'dateTime':
              return {
                ...item,
                render: (text: string, record: any) => {
                  const currentDate = formDate(text, record.timeZone);
                  const [isVisible, toggleModal] = useState(false);
                  return (
                    <>
                      <a
                        href="#"
                        onClick={() => {
                          toggleModal(true);
                        }}
                      >
                        {currentDate}
                      </a>
                      <DateModal
                        isVisible={isVisible}
                        toggleModal={toggleModal}
                        defaultData={record}
                        accessFn={(obj: any) => store.dispatch(changeOneDataAsync({ ...record, ...obj }))}
                      />
                    </>
                  );
                },
              };
            case 'type':
              return {
                ...item,
                render: (type: string, record: any) => {
                  const [isVisibleType, toggleModalType] = useState(false);
                  const obj = parsingStr(type, defaultType);
                  return obj && (
                    <>
                      <Tag
                        color={obj.color}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          window.console.log('type', record.type);
                          toggleModalType(true);
                        }}
                      >
                        {obj.name}
                      </Tag>
                      <TypeModal
                        isVisible={isVisibleType}
                        toggleModal={toggleModalType}
                        defaultData={record}
                        accessFn={(success: any) => store.dispatch(changeOneDataAsync({ ...record, ...success }))}
                      />
                    </>
                  );
                },
              };
            case 'descriptionUrl':
              return {
                ...item,
                render: (text: string, record: any) => {
                  let parseJson: string[];
                  let link;
                  let isParsed = true;
                  try {
                    parseJson = JSON.parse(text);
                    const [link1] = parseJson;
                    link = link1;
                  } catch (e) {
                    link = '';
                    isParsed = false;
                  }
                  const [newText, editText] = useState(link);
                  return (
                    <>
                      <Input
                        size="small"
                        value={newText}
                        onChange={(e) => editText(e.target.value)}
                        onPressEnter={() => {
                          if (isParsed) {
                            parseJson[0] = newText;
                          } else {
                            parseJson = [newText];
                          }
                          const newRecord = { ...record, [item.dataIndex]: JSON.stringify(parseJson) };
                          store.dispatch(changeOneDataAsync(newRecord));
                        }}
                      />
                    </>
                  );
                },
              };
            case 'action':
              return {
                ...item,
                render: (text: unknown, record: any) => {
                  const aa = 'tt';
                  const [vv, vis] = useState(false);
                  return (
                    <>
                      <Button
                        icon={<FormOutlined />}
                        onClick={() => {
                          window.console.log(record);
                          vis(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Modal
                        visible={vv}
                        bodyStyle={{ minHeight: '50vh' }}
                        width={1000}
                        okText="Save"
                        onOk={() => {
                          window.console.log('saved');
                          vis(false);
                        }}
                        onCancel={() => vis(false)}
                      >
                        modal edit
                        {aa}
                        {JSON.stringify(record)}
                        {JSON.stringify(record)}
                        {JSON.stringify(record)}
                        <hr />
                        end
                      </Modal>
                    </>
                  );
                },
              };
            default:
              return {
                ...item,
                render: (text: string, record: any) => {
                  const [newText, editText] = useState(text);
                  return (
                    <>
                      <Input
                        size="small"
                        value={newText}
                        onChange={(e) => editText(e.target.value)}
                        onPressEnter={() => {
                          const newRecord = { ...record, [item.dataIndex]: newText };
                          store.dispatch(changeOneDataAsync(newRecord));
                        }}
                      />
                    </>
                  );
                },
              };
          }
        }
        return item;
      });
      changeColumn([...tmp] as any[]);
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

export default connect(mapSateToProps)(TableSchedule);
