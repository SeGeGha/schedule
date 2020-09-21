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

const MainMenu: React.FC = (props: any) => {
  const {
    load,
    getDataBase,
  } = props;
  const [isMenu, toggleMenu] = useState(false);
  const aa = 0;
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
          <Button>
            Add
          </Button>
          <Button>
            Edit
          </Button>
          <Button>
            Delede
          </Button>
          <Button>
            Hide
          </Button>
          menu
          {aa}
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
// export default connect(null, mapDispatchToProps)(MainMenu);
