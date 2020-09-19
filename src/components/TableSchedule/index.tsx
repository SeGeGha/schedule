import React from 'react';
import { Table } from 'antd';
import { dataSource, columns } from '../../mock';

const TableSchedule: React.FC = () => {
  const x = 0;
  return (
    <div>
      Table
      {x}
      <Table
        dataSource={dataSource}
        columns={columns}
        rowSelection={{
          onChange: () => {
            window.console.log('a');
          },
        }}
      />
    </div>

  );
};

export default TableSchedule;
