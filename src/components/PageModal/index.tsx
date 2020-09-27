/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react';
import React, { useEffect, useState } from 'react';
// import moment from 'moment';
import {
  // Input,
  Modal,
} from 'antd';
import InputField from '../InputField';
import { ObjData } from '../../models';

type PageModalProps = {
  isVisible: boolean,
  toggleModal: any,
  accessFn: any,
  defaultData: any,
  isEdit: boolean,
};

const PageModal: React.FC<PageModalProps> = (props: PageModalProps) => {
  const {
    isVisible,
    toggleModal,
    accessFn,
    defaultData,
    isEdit,
  } = props;
  const [state, changes] = useState(defaultData as ObjData);
  // const [isClean, clean] = useState(isVisible);
  useEffect(() => {
    // clean(false);
    changes(defaultData);
    // window.console.log('page modal change', state.name);
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
          toggleModal(false);
        }}
        onCancel={() => {
          toggleModal(false);
        }}
      >
        {
          JSON.stringify(defaultData)
        }
        <hr />
        {isEdit ? 'Edit' : 'Read'}
        <hr />
        Name:
        {
        isEdit
          ? (
            <InputField
              defaultValue={state.name}
              enterFn={(value: any) => {
                changes({ ...state, name: value });
              }}
            />
          )
          : state.name
        }
        Description:
        {
        isEdit
          ? (
            <InputField
              defaultValue={state.description}
              enterFn={(value: any) => {
                changes({ ...state, description: value });
              }}
            />
          )
          : state.description
        }
      </Modal>
    </>
  );
};

export default PageModal;
