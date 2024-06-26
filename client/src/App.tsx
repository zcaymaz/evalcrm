import React, { useState, useEffect } from "react";
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import Routers from "./routers/routes";
import Login from "./pages/Login";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  path?: string
): MenuItem {
  return {
    label,
    key,
    icon,
    children,
    path,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<a href="/">Home</a>, "1", <PieChartOutlined />),
  getItem(<a href="/customeradd">Customer Add</a>, "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem(<a href="/customerdetail">Customer Detail</a>, "3"),
    getItem(<a href="/customerlist">Customer List</a>, "4"),
    getItem("Alex", "5"),
  ]),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [username, setUsername] = useState('');
  const [id, setId] = useState('');
  const isLogged = localStorage.getItem("token") ? true : false;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const payload = JSON.parse(jsonPayload);
      if (payload.username, payload.id) {
        setUsername(payload.username);
        setId(payload.id);
      }
    }
  }, []);

  return (
    <>
      {isLogged ? (
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <Menu
              theme="dark"
              defaultSelectedKeys={["1"]}
              mode="inline"
              items={items}
            />
          </Sider>
          <Layout>
            <Header style={{ padding: 0, background: "#dedede" }}>
              {username ? `Username: ${username}` : 'No username found'}  {id ? `id: ${id}` : 'No username found'}
            </Header>
            <Content style={{ margin: "0 16px" }}>
              <Routers />
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      ) : (
        <Login />
      )}
    </>
  );
};

export default App;
