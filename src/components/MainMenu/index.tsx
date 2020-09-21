/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CloseOutlined, MenuOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { addOneDataAsync, delOneDataAsync, getAllDataAsync } from '../../store/dataReducer';
import { useConfigContext } from '../ConfigContext';
import store from '../../store';
import { ObjData } from '../../models';

interface MyProps {
  load: boolean;
  getDataBase: any;
  rows: ObjData[];
  // base: any[];
  // toEdit: any;
}

const MainMenu: React.FC<MyProps> = (props: MyProps) => {
  const {
    load,
    getDataBase,
    rows,
    // base,
    // toEdit,
  } = props;
  const { isMentor } = useConfigContext();
  const [isMenu, toggleMenu] = useState(false);
  return (
    <Space>
      <Button
        icon={isMenu ? <CloseOutlined /> : <MenuOutlined />}
        onClick={() => toggleMenu(!isMenu)}
      />
      {isMenu && (
        <Space>
          <Button
            icon={<SyncOutlined />}
            onClick={() => getDataBase()}
            loading={load}
          />
          <Button disabled={!rows.length}>
            Hide
          </Button>
          {isMentor && (
          <>
            <Button
              onClick={() => store.dispatch(addOneDataAsync({
                id: String(Date.now()),
                key: String(Date.now()),
                name: 'Mike',
                description: 'descr hhgdfhiooiuf ffgjklgkg ffee hgfrdfghj  hgffiiuyrfhj',
                descriptionUrl: 'descrUrl',
                type: '{"name": "codewars", "color": "brown"}',
                dateTime: '2020-11-03 20:00',
                timeZone: '+2',
                place: '{name: "Minsk", lat: 20, lon: 50}',
                comment: '[{"message": "Comment", "mane": "Anna"}]',
                organizer: '2',
              }))}
            >
              Add
            </Button>
            {/* <Button
              disabled={rows.length !== 1}
              type={isEdit ? 'primary' : 'default'}
              onClick={() => toEdit(!isEdit)}
            >
              Edit
            </Button> */}
            <Button
              disabled={!rows.length}
              onClick={() => {
                rows.forEach((item) => store.dispatch(delOneDataAsync(item)));
              }}
            >
              Delete
            </Button>
          </>
          )}
        </Space>
      )}
    </Space>
  );
};

const mapStateToProps = (state: any) => ({
  load: state.data.loading,
});
const mapDispatchToProps = {
  getDataBase: getAllDataAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
