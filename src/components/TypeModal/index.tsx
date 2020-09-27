/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { connect } from 'react-redux';
// import moment from 'moment';
import {
  Modal,
  Input,
  Tag,
  Select,
  Space,
} from 'antd';
import { parsingStr } from '../../utils';
import { ObjData } from '../../models';

const { Option } = Select;

type DateModalProps = {
  isVisible: boolean,
  toggleModal: any,
  accessFn: any,
  defaultData: any,
  listTypes: ObjData[],
};

const TypeModal: React.FC<DateModalProps> = (props: DateModalProps) => {
  const {
    isVisible,
    toggleModal,
    accessFn,
    defaultData,
    listTypes,
  } = props;
  const { type } = defaultData;
  const { name, color } = parsingStr(type as string, { name: 'name', color: 'white' }) || { name: 'name', color: 'white' };
  const [state, changes] = useState({ name, color } as ObjData);
  return (
    <Modal
      visible={isVisible}
      okText="Save"
      onOk={() => {
        accessFn({ type: JSON.stringify(state) });
        toggleModal(false);
      }}
      onCancel={() => {
        toggleModal(false);
      }}
    >
      <h4>
        Select type:
      </h4>
      <hr />
      <Select
        style={{ width: 200 }}
        onChange={(val: number) => {
          const newState = listTypes[val];
          changes({ ...newState });
        }}
      >
        {listTypes.map((typeObj, index) => (
          <Option
            value={index}
            key={`${Date.now()}${String(index)}`}
          >
            <Tag color={typeObj.color}>
              {typeObj.name}
            </Tag>
          </Option>
        ))}
      </Select>
      <h4>
        Custom type:
      </h4>
      Name:
      <hr />
      <Input
        value={state.name}
        onChange={(e) => changes({ ...state, name: e.target.value })}
      />
      <hr />
      Color:
      <hr />
      <Space>
        Select color:
        <input
          type="color"
          onChange={(e) => window.console.log(e.target.value)}
        />
      </Space>
      <hr />
      <Input
        value={state.color}
        onChange={(e) => changes({ ...state, color: e.target.value })}
      />
      <hr />
      <Space>
        Result example:
        <Tag color={state.color}>
          {state.name}
        </Tag>
      </Space>
    </Modal>
  );
};

const mapStateToProps = (state: any) => ({
  listTypes: state.data.uniqTypesObj,
});

export default connect(mapStateToProps)(TypeModal);
