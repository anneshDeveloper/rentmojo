import {
  DeleteOutlined
} from "@ant-design/icons";
import { Button, Card, Col, List, Row, Tooltip } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageHeaderContext } from "../../App";
import { getCommentByPostId } from "../../services/commentService";
import { getPostByPostId } from "../../services/postService";
import { useHistory } from 'react-router-dom';
import {  deletePostByPostId } from '../../services/postService';

export function PostDetails(props) {
  const { userId, postId } = useParams();
  const [postData, setPostData] = useState({});
  const [commentData, setCommentData] = useState([]);
  const [showComment, setShowComment] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const { setHeading } = useContext(PageHeaderContext);
  const [isDeleting, setDeleting] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setHeading("Post Details");
  }, []);

  useEffect(() => {
    (async function () {
      let postData = await getPostByPostId(userId);
      setPostData(postData);
    })();
  }, [postId]);

  const viewCommentHandler = async () => {
    if (showComment) {
      setShowComment(false);
      return;
    }
    setIsCommentLoading(true);
    let commentData = await getCommentByPostId(postId);
    setCommentData(commentData);
    setIsCommentLoading(false);
    setShowComment(true);
  };

  const onPostDelete = async () => {
    setDeleting(true);
    const res = await deletePostByPostId(postData.id);
    if(res) {
        setDeleting(false);
        history.goBack();
    }
  }

  return (
    <>
      {Object.keys(postData).length > 0 && (
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Card
              className="w-100"
              title={`Title: ${postData.title}`}
              bordered={false}
              style={{ width: 300 }}
              actions={[
                <Button
                  type="primary"
                  shape="round"
                  size={"large"}
                  onClick={() => viewCommentHandler()}
                  loading={isCommentLoading}
                >
                  {showComment ? "Hide Comments" : "View Comments"}
                </Button>,
                <Tooltip title="Delete">
                  <Button
                    type="primary"
                    danger
                    shape="round"
                    icon={<DeleteOutlined />}
                    size={"large"}
                    loading={isDeleting}
                    onClick={onPostDelete}
                  />
                </Tooltip>,
              ]}
            >
              {postData.body}

              {showComment && Object.keys(commentData).length > 0 && (
                <List
                  size="small"
                  className="mt-5"
                  loading={isCommentLoading}
                  header={<div>Comments</div>}
                  bordered
                  dataSource={commentData}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={<a>{item.email}</a>}
                        description={<a>{item.name}</a>}
                      />
                      {item.body}
                    </List.Item>
                  )}
                />
              )}
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}
