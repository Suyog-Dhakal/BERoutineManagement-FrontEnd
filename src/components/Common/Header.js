import React, { useState } from "react"
import { Anchor, Drawer, Button } from "antd"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Link as Links } from "react-router-dom"
import "./common.css"

const { Link } = Anchor

function AppHeader() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  return (
    <div className="container-fluid">
      <div className="header">
        <div className="logo" />
        <Router>
          <Links to="/">
            <h1 style={{ textAlign: "left" }}>BE Routine Management</h1>
          </Links>
        </Router>
        {/* <a href="https://localhost:3000/">
          
        </a> */}

        {/* <h1 style={{textAlign: 'left'}}>BE Routine Management</h1> */}
        <div className="mobileHidden">
          <Anchor targetOffset="65">
            <Link href="#hero" title="Home" />
            <Link href="#about" title="About" />
            <Link href="#feature" title="Features" />
            <Link href="#faq" title="FAQ" />
            <Link href="#contact" title="Contact" />

            <div className="b">
              <Router>
                <Links to="/login">
                  <Button className="btn" type="primary" size="large">
                    Login
                  </Button>
                </Links>
              </Router>
            </div>
          </Anchor>
        </div>

        <div className="mobileVisible">
          <Button type="primary" onClick={showDrawer}>
            <i className="fas fa-bars"></i>
          </Button>

          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <Anchor targetOffset="65">
              <Link href="#hero" title="Home" />
              <Link href="#about" title="About" />
              <Link href="#feature" title="Features" />
              <Link href="#faq" title="FAQ" />
              <Link href="#contact" title="Contact" />
              <div className="btnHolder">
                <Button type="primary" size="large">
                  Login
                </Button>
              </div>
            </Anchor>
          </Drawer>
        </div>
      </div>
    </div>
  )
}

export default AppHeader