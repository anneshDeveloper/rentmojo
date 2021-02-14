import { createContext, useState } from 'react';
import { Row, Col, Button, Input, Space } from "antd";
import { Header } from "./components/header/Header";
import { HomePage, Post, PostDetails } from "./containers";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export const PageHeaderContext = createContext();

function App() {
  const [heading, setHeading] = useState('HomePage');

  return (
    <div className="App">
      <PageHeaderContext.Provider value={{heading, setHeading}}>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Header />
          <Router>
            <Switch>
              <Route exact path='/' component={HomePage}/>
              <Route exact path='/:userId' component={Post}/>
              <Route exact path='/:userId/post/:postId' component={PostDetails}/>
            </Switch>
          </Router>
        </Col>
      </Row>
      </PageHeaderContext.Provider>
    </div>
  );
}

export default App;
