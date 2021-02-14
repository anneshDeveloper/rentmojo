import { Table } from "antd";

export function CustomTable({ columns, data, handleTableChange, ...props }) {
  return (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{ x: "100%", y: "calc(100vh - 14rem)" }}
      pagination={{ position: ["bottomCenter"], /* hideOnSinglePage: true  */}}
      onChange={handleTableChange}
    />
  );
}

export default CustomTable;
