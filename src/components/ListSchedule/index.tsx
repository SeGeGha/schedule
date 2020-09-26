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
  Modal,
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
import DateModal from '../DateModal';
import store from '../../store';
import { ObjData } from '../../models';
import { changeOneDataAsync } from '../../store/dataReducer';
import TypeModal from '../TypeModal';

type ListProps = {
  load: boolean,
  isMentor: boolean,
  base: ObjData[],
  // filter: ObjData[],
};

const columns1 = [
  {
    title: '',
    dataIndex: 'main',
    render: (text: unknown, record: ObjData) => {
      const parseType = parsingStr(record.type, defaultType, null);
      const parseUrl = parsingStr(record.descriptionUrl, [] as string[]);
      const parseComment = parsingStr(record.comment, []);
      const [vv, vis] = useState(false);

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
              {JSON.stringify(record)}
              <hr />
              end
            </Modal>

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
    // filter,
  } = props;
  const [selectedRowKeys, changeSel] = useState([] as ObjData[]);
  const [columns, changeColumn] = useState(columns1);

  // useEffect(() => {
  //   const index = columns.findIndex((item) => item.dataIndex === 'type');
  //   columns[index].filters = filter;
  // }, [filter, columns]);

  useEffect(() => {
    // window.console.log(Date.now());
    if (isMentor) {
      const [tmp] = columns1;
      tmp.render = (text: unknown, record: ObjData) => {
        const parseType = parsingStr(record.type, defaultType);
        const parseUrl = parsingStr(record.descriptionUrl, [''], ['']);
        const parseComment = parsingStr(record.comment, []);
        const [vv, vis] = useState(false);

        const currentDate = formDate(record.dateTime, record.timeZone);
        const [isVisibleDate, toggleDateModal] = useState(false);

        const [isVisibleType, toggleModalType] = useState(false);
        // const obj = parsingStr(type, defaultType);
        const [newName, editName] = useState(record.name);
        const [newDescr, editDescr] = useState(record.description);

        return (
          <Space direction="vertical" size="small">
            <div>
              Date &amp; Time:
              <a
                href="#"
                onClick={() => {
                  toggleDateModal(true);
                }}
              >
                {currentDate}
              </a>
              <DateModal
                isVisible={isVisibleDate}
                toggleModal={toggleDateModal}
                defaultData={record}
                accessFn={(obj: any) => store.dispatch(changeOneDataAsync({ ...record, ...obj }))}
              />
            </div>
            <div>
              Type:
              {parseType && (
              <Tag
                color={parseType.color}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  window.console.log('type', record.type);
                  toggleModalType(true);
                }}
              >
                {parseType.name}
              </Tag>
              )}
              <TypeModal
                isVisible={isVisibleType}
                toggleModal={toggleModalType}
                defaultData={record}
                accessFn={(success: any) => store.dispatch(changeOneDataAsync({ ...record, ...success }))}
              />
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
                {JSON.stringify(record)}
                <hr />
                end
              </Modal>

            </div>

          </Space>
        );
      };

      changeColumn([tmp] as any[]);
    } else {
      changeColumn([...columns1]);
    }
  }, [isMentor]);

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
});

export default connect(mapSateToProps)(ListSchedule);
