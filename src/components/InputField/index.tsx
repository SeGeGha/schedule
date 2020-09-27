/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from 'react';
// import React from 'react';
import { Input } from 'antd';

type InputProps = {
  defaultValue: any,
  enterFn: any,
};

const InputField: React.FC<InputProps> = (props: InputProps) => {
  const { defaultValue, enterFn } = props;
  const [val, changeVal] = useState(defaultValue);

  useEffect(() => {
    changeVal(defaultValue);
  }, [defaultValue]);

  return (
    <>
      <Input
        size="small"
        value={val}
        onChange={(e) => changeVal(e.target.value)}
        onPressEnter={() => {
          if (val !== defaultValue) {
            enterFn(val);
          }
        }}
        onBlur={() => {
          if (val !== defaultValue) {
            enterFn(val);
          }
        }}
      />
    </>
  );
};

export default InputField;
