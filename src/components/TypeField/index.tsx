import React, { useEffect, useState } from 'react';
import { Tag } from 'antd';
import TypeModal from '../TypeModal';
import { parsingStr } from '../../utils';
import { defaultType } from '../../constants';
import { ObjData } from '../../models';

type TypeFieldProps = {
  record: ObjData,
  accessFn: (obj: ObjData) => void,
};
const TypeField: React.FC<TypeFieldProps> = (props: TypeFieldProps) => {
  const {
    record,
    accessFn,
  } = props;

  const [isVisibleType, toggleModal] = useState(false);
  const defaultObjType = parsingStr(record.type, defaultType);
  const [currentObjType, changeField] = useState(defaultObjType);

  useEffect(() => {
    changeField(parsingStr(record.type, defaultType));
  }, [record.type]);

  return currentObjType && (

    <>
      <Tag
        className="field field-tag"
        color={currentObjType.color}
        onClick={() => {
          toggleModal(true);
        }}
      >
        {currentObjType.name}
      </Tag>
      <TypeModal
        isVisible={isVisibleType}
        toggleModal={toggleModal}
        defaultData={record}
        accessFn={(objBack: ObjData) => {
          changeField(parsingStr(objBack.type, defaultType));
          accessFn({ ...record, ...objBack });
        }}
      />
    </>
  );
};

export default TypeField;
