/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import moment from 'moment';
import {
  Modal,
  DatePicker,
  InputNumber,
} from 'antd';

type DateModalProps = {
  isVisible: boolean,
  toggleModal: any,
  accessFn: any,
  defaultData: any,
};

const DateModal: React.FC<DateModalProps> = (props: DateModalProps) => {
  const {
    isVisible,
    toggleModal,
    accessFn,
    defaultData,
  } = props;
  const { dateTime, timeZone } = defaultData;
  const [state, changes] = useState({ dateTime, timeZone });
  return (
    <Modal
      visible={isVisible}
      onOk={() => {
        accessFn(state);
        toggleModal(false);
      }}
      onCancel={() => {
        toggleModal(false);
      }}
    >
      Date
      <DatePicker
        showTime={{ format: 'HH:mm' }}
        format="YYYY-MM-DD HH:mm"
        value={moment(state.dateTime, 'YYYY-MM-DD HH:mm')}
        onChange={(val, str) => changes({ ...state, dateTime: str })}
      />
      <hr />
      Time zone ( current:
      {String(new Date().getTimezoneOffset() / 60)}
      ):
      <InputNumber
        value={Number(state.timeZone)}
        min={-12}
        max={12}
        onChange={(val) => changes({ ...state, timeZone: String(val as number) })}
      />
    </Modal>
  );
};

export default DateModal;
