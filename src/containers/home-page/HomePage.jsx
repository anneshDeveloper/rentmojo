import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import isEqual from "lodash.isequal";
import React, { useContext, useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import { useHistory } from "react-router-dom";
import { PageHeaderContext } from '../../App';
import { CustomTable } from "../../components";
import { userMapper } from "../../services/helper";
import { getAllUser } from "../../services/userService";

export function HomePage(props) {
  const [usersData, setUsersData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });
  const [filter, setFilter] = useState({});
  const history = useHistory();
  const { setHeading } = useContext(PageHeaderContext);

  useEffect(() => {
    setHeading('HomePage');
  }, []);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const gotoPostHandler = (userId) => {
    history.push(`/${userId}`);  
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => <a>{name}</a>,
      width: 80,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      width: 150,
      ellipsis: {
        showTitle: false,
      },
      render: (company) => <a>{company}</a>,
      ...getColumnSearchProps("company"),
    },
    {
      title: "Post",
      dataIndex: "post",
      key: "post",
      width: 80,
      render: (userId) => (
        <Button
          type="link"
          size={"small"}
          onClick={() => gotoPostHandler(userId)}
        >
          Post
        </Button>
      ),
    },
  ];

  const handleTableChange = (thisPagination, filters) => {
    const pager = { ...pagination };
    // if filters not changed, don't update pagination.current
    const filtersChanged = !isEqual(filters, filter);
    if (!filtersChanged) {
      pager.current = thisPagination.current;
    }
    setPagination(pager);
    setFilter(filters);
  };

  useEffect(() => {
    (async function () {
      let userData = await getAllUser();
      userData = userMapper(userData);
      setUsersData(userData);
    })();
  }, []);

  const onSearch = () => {};
  return (
        <CustomTable
          columns={columns}
          data={usersData}
          handleTableChange={handleTableChange}
        />
  );
}
