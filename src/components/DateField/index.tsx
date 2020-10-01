import React, { useEffect, useState } from 'react';
import { formDate } from '../../utils';
import DateModal from '../DateModal';
import { ObjData } from '../../models';

type DateFieldProps = {
  record: ObjData,
  canEdit: boolean,
  accessFn: (obj: ObjData) => void,
};
const DateField: React.FC<DateFieldProps> = (props: DateFieldProps) => {
  const {
    record,
    canEdit,
    accessFn,
  } = props;
  const defaultDate = formDate(record.dateTime, record.timeZone);
  const [isVisible, toggleModal] = useState(false);
  const [currentDate, changeField] = useState(defaultDate);
  useEffect(() => {
    const nextValue = formDate(record.dateTime, record.timeZone);
    changeField(nextValue);
  }, [record.dateTime, record.timeZone]);
  return (
    <>
      <span
        className={canEdit ? 'field field-text' : ''}
        aria-hidden="true"
        onClick={() => {
          if (canEdit) {
            toggleModal(true);
          }
        }}
      >
        {currentDate}
      </span>
      <DateModal
        isVisible={isVisible}
        toggleModal={toggleModal}
        defaultData={record}
        accessFn={(objBack: ObjData) => {
          const newDate = formDate(objBack.dateTime, objBack.timeZone);
          changeField(newDate);
          accessFn({ ...record, ...objBack });
        }}
      />
    </>
  );
};

export default DateField;
