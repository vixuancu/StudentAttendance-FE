import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, Avatar, Dropdown, theme, Typography, Flex } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  BookOutlined,
  CalendarOutlined,
  CameraOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useAuthStore } from "@/stores/authStore";
import authService from "@/services/auth.service";
import { APP_NAME, APP_SHORT_NAME, ROLE_LABELS } from "@/config/constants";
import type { ItemType } from "antd/es/menu/interface";

const { Header, Sider, Content } = Layout;

// ── Sidebar menu items ──
const menuItems: ItemType[] = [
  { key: "/", icon: <DashboardOutlined />, label: "Tổng quan" },
  { key: "/students", icon: <TeamOutlined />, label: "Sinh viên" },
  { key: "/courses", icon: <BookOutlined />, label: "Môn tín chỉ" },
  { key: "/sessions", icon: <CalendarOutlined />, label: "Buổi học" },
  { key: "/attendance", icon: <CameraOutlined />, label: "Điểm danh" },
  { type: "divider" },
  { key: "/users", icon: <SettingOutlined />, label: "Quản trị" },
];

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const userMenuItems: ItemType[] = [
    {
      key: "info",
      label: (
        <div style={{ padding: "4px 0" }}>
          <div style={{ fontWeight: 600 }}>{user?.username}</div>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {user?.role ? ROLE_LABELS[user.role] : ""}
          </Typography.Text>
        </div>
      ),
      disabled: true,
    },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* ── Sidebar ── */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onBreakpoint={(broken) => setCollapsed(broken)}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 10,
        }}
      >
        {/* Logo */}
        <Flex
          align="center"
          justify="center"
          gap={8}
          style={{
            height: 64,
            padding: "0 16px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg, #0066B3, #00A3E0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              flexShrink: 0,
            }}
          >
            H
          </div>
          {!collapsed && (
            <Typography.Text
              strong
              style={{ color: "#fff", fontSize: 16, whiteSpace: "nowrap" }}
            >
              {APP_NAME}
            </Typography.Text>
          )}
        </Flex>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ borderRight: 0, marginTop: 4 }}
        />
      </Sider>

      {/* ── Main content area ── */}
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "margin-left 0.2s",
        }}
      >
        {/* Header */}
        <Header
          style={{
            padding: "0 24px",
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            position: "sticky",
            top: 0,
            zIndex: 9,
          }}
        >
          <Flex align="center" gap={16}>
            {collapsed ? (
              <MenuUnfoldOutlined
                onClick={() => setCollapsed(false)}
                style={{ fontSize: 18, cursor: "pointer" }}
              />
            ) : (
              <MenuFoldOutlined
                onClick={() => setCollapsed(true)}
                style={{ fontSize: 18, cursor: "pointer" }}
              />
            )}
            <Typography.Text type="secondary" style={{ fontSize: 13 }}>
              {APP_SHORT_NAME} – Hệ thống điểm danh khuôn mặt
            </Typography.Text>
          </Flex>

          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Flex
              align="center"
              gap={8}
              style={{ cursor: "pointer", padding: "4px 8px", borderRadius: 8 }}
            >
              <Avatar
                icon={<UserOutlined />}
                style={{ backgroundColor: "#0066B3" }}
              />
              {user?.username && (
                <Typography.Text strong>{user.username}</Typography.Text>
              )}
            </Flex>
          </Dropdown>
        </Header>

        {/* Page content */}
        <Content
          style={{
            margin: 24,
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;