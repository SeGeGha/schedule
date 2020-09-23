/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  CloseOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  MenuOutlined,
  PlusOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import {
  Affix,
  Button,
  Popconfirm,
  Space,
} from 'antd';
import {
  addOneDataAsync,
  delOneDataAsync,
  getAllDataAsync,
} from '../../store/dataReducer';
import { useConfigContext } from '../ConfigContext';
import store from '../../store';
import { ObjData } from '../../models';

interface MyProps {
  load: boolean;
  getDataBase: any;
  rows: ObjData[];
  changeSel: any;
  // base: any[];
  // toEdit: any;
}

const MainMenu: React.FC<MyProps> = (props: MyProps) => {
  const {
    load,
    getDataBase,
    rows,
    changeSel,
    // base,
    // toEdit,
  } = props;
  const { isMentor } = useConfigContext();
  const [isMenu, toggleMenu] = useState(false);
  // const [top, setTop] = useState(10);
  return (
    <Affix offsetTop={10}>
      <Space>
        <Button
          icon={isMenu ? <CloseOutlined /> : <MenuOutlined />}
          onClick={() => toggleMenu(!isMenu)}
        />
        {isMenu && (
          <Space>
            <Button
              icon={<SyncOutlined spin={load} />}
              onClick={() => getDataBase()}
            // loading={load}
            />
            <Button
              icon={<EyeInvisibleOutlined />}
              disabled={!rows.length}
            >
              Hide
            </Button>
            {isMentor && (
              <>
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => store.dispatch(addOneDataAsync({
                    id: String(Date.now()),
                    key: String(Date.now()),
                    name: 'Mike',
                    description: 'descr hhgdfhiooiuf ffgjklgkg ffee hgfrdfghj  hgffiiuyrfhj',
                    descriptionUrl: '["https://google.com", "https://mail.google.com"]',
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
                <Popconfirm
                  disabled={!rows.length}
                  title="Sure to delete ?"
                  okText="Yes"
                  cancelText="No"
                  placement="bottom"
                  onConfirm={() => {
                    rows.forEach((item) => store.dispatch(delOneDataAsync(item)));
                    changeSel([]);
                  }}
                >
                  <Button
                    icon={<DeleteOutlined />}
                    disabled={!rows.length}
                  >
                    Delete
                  </Button>
                </Popconfirm>
              </>
            )}
          </Space>
        )}
      </Space>
    </Affix>
  );
};

const mapStateToProps = (state: any) => ({
  load: state.data.loading,
});
const mapDispatchToProps = {
  getDataBase: getAllDataAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
