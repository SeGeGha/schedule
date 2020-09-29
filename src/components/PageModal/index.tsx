/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react';
import React, { useEffect, useState } from 'react';
// import moment from 'moment';
import {
  // Input,
  Modal, Tag,
} from 'antd';
import InputField from '../InputField';
import store from '../../store';
import { taskPage } from '../../store/modalReducer';
import DateField from '../DateField';
import { formDate, parsingStr } from '../../utils';
import TypeField from '../TypeField';
import { defaultType } from '../../constants';
import { ObjData } from '../../models';

type PageModalProps = {
  isVisible: boolean,
  accessFn: any,
  defaultData: ObjData|undefined,
  isEdit: boolean,
};

const PageModal1: React.FC<PageModalProps> = (props: PageModalProps) => {
  const {
    isVisible,
    accessFn,
    defaultData,
    isEdit,
  } = props;
  const [state, changes] = useState(defaultData);
  const [typeObj, changeType] = useState(parsingStr(defaultData && defaultData.type, defaultType) as ObjData);

  useEffect(() => {
    changes(defaultData);
    changeType(parsingStr(defaultData && defaultData.type, defaultType) as ObjData);
  }, [defaultData]);

  return (
    <>
      <Modal
        visible={isVisible}
        bodyStyle={{ minHeight: '50vh' }}
        width={1000}
        okText={isEdit ? 'Save' : 'Ok'}
        onOk={() => {
          window.console.log('state page ', state);
          if (isEdit) {
            accessFn(state);
          }
          store.dispatch(taskPage(undefined));
        }}
        onCancel={() => {
          store.dispatch(taskPage(undefined));
        }}
      >
        {state && (
          <>
            {JSON.stringify(defaultData)}
            <hr />
            {isEdit ? 'Edit' : 'Read'}
            <hr />
            <h3>
              Date &amp; Time:
            </h3>
            {
            isEdit
              ? (
                <DateField
                  record={state}
                  accessFn={(newRecord: ObjData) => {
                    changes(newRecord);
                  }}
                />
              )
              : formDate(state.dateTime, state.timeZone)
            }
            <hr />
            Type:
            {isEdit
              ? (
                <TypeField
                  record={state}
                  accessFn={(newRecord: ObjData) => {
                    changes(newRecord);
                  }}
                />
              )
              : (
                <Tag color={typeObj.color}>
                  {typeObj.name}
                </Tag>
              )}
            <hr />
            Name:
            <InputField
              canEdit={isEdit}
              defaultValue={state.name}
              accessFn={(value: any) => {
                changes({ ...state, name: value });
              }}
            />
            Description:
            <InputField
              canEdit={isEdit}
              defaultValue={state.description}
              accessFn={(value: any) => {
                changes({ ...state, description: value });
              }}
            />
          </>
        )}
      </Modal>
    </>
  );
};

export default PageModal1;
