/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CloseOutlined, MenuOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { getAllDataAsync } from '../../store/dataReducer';
import { useConfigContext } from '../ConfigContext';

interface MyProps {
  load: boolean;
  getDataBase: any;
  rows: string[];
}

const MainMenu: React.FC<MyProps> = (props: MyProps) => {
  const {
    load,
    getDataBase,
    rows,
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
            <Button>
              Add
            </Button>
            <Button disabled={rows.length !== 1}>
              Edit
            </Button>
            <Button disabled={rows.length !== 1}>
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
