import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import React, { useContext, useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import { useHistory, useParams } from "react-router-dom";
import { PageHeaderContext } from '../../App';
import { CustomTable } from "../../components";
import { postMapper } from "../../services/helper";
import { getPostByUserId } from "../../services/postService";
import { getUserById } from '../../services/userService';

export function Post(props) {
  const { userId } = useParams();
  const [postData,setPostData] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const history = useHistory();
  const { setHeading } = useContext(PageHeaderContext);

  useEffect(()=> {
    (async () => {
        const { name } = await getUserById(userId)
        setHeading(`${name}'s post`);
    })();
  }, [])
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

  const gotoPostDetailsHandler = (postId) => {
    history.push(`/${userId}/post/${postId}`);
  };

  const columns = [
    {
      title: "Post",
      dataIndex: "title",
      key: "title",
      width: 150,
      ellipsis: {
        showTitle: false,
      },
      render: (title) => <a>{title}</a>,
      ...getColumnSearchProps("title"),
    },
    {
      title: "View Datails",
      dataIndex: "view-details",
      key: "view-details",
      width: 80,
      render: (postId) => (
        <Button
          type="link"
          size={"small"}
          onClick={() => gotoPostDetailsHandler(postId)}
        >
          Show
        </Button>
      ),
    },
  ];

  useEffect(() => {
    (async function () {
        let postData = await getPostByUserId(userId);
        postData = postMapper(postData);
        setPostData(postData);
      })();
  }, [userId]);

  return (
    <CustomTable
      columns={columns}
      data={postData}
    //   handleTableChange={handleTableChange}
    />
  );
}
