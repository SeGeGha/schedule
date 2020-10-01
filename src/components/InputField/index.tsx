import React, { useEffect, useState } from 'react';
import { Input } from 'antd';

type InputProps = {
  defaultValue:string,
  accessFn: (obj: string) => void,
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
            className="expand"
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
            className={canEdit ? 'field field-text ellipsis expand' : 'expand'}
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
