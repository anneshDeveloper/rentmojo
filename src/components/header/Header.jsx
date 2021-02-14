import { useContext } from 'react';
import { Row, Col, Button, Input, Space } from "antd";
import { magenta } from "@ant-design/colors";
import { PageHeaderContext } from '../../App';

export function Header(props) {
  const { heading } = useContext(PageHeaderContext);
  return (
    <Row>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <div className="home-title p-5" style={{ background: magenta[6] }}>
          {heading}
        </div>
      </Col>
    </Row>
  );
}
