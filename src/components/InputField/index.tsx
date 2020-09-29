/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from 'react';
// import React from 'react';
import { Input } from 'antd';

type InputProps = {
  defaultValue: any,
  accessFn: any,
  canEdit: boolean,
};

const InputField: React.FC<InputProps> = (props: InputProps) => {
  const { defaultValue, accessFn, canEdit } = props;
  const [val, changeVal] = useState(defaultValue);
  const [isEdit, toggleEdit] = useState(false);

  useEffect(() => {
    changeVal(defaultValue);
  }, [defaultValue]);

  return (
    <>
      {(canEdit && isEdit)
        ? (
          <Input
            size="small"
            value={val}
            onChange={(e) => changeVal(e.target.value)}
            onPressEnter={() => {
              if (val !== defaultValue) {
                accessFn(val);
              }
              toggleEdit(false);
            }}
            onBlur={() => {
              if (val !== defaultValue) {
                accessFn(val);
              }
              toggleEdit(false);
            }}
          />
        )
        : (
          <div
            aria-hidden="true"
            className={canEdit ? 'field field-text' : ''}
            onClick={() => {
              toggleEdit(canEdit && true);
            }}
          >
            {val || '-'}
          </div>
        )}
    </>
  );
};

export default InputField;
