import { Form, Input, Button, Card, message, Typography, Flex } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import authService from "@/services/auth.service";
import { APP_NAME, APP_DESCRIPTION } from "@/config/constants";
import type { LoginRequest } from "@/types";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: LoginRequest) => {
    try {
      await authService.login(values);
      message.success("Đăng nhập thành công");
      navigate("/");
    } catch {
      // Error đã được xử lí bởi interceptor
    }
  };

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #E6F4FF 0%, #f0f2f5 100%)",
      }}
    >
      <Card
        style={{
          width: 420,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          borderRadius: 16,
        }}
      >
        {/* Logo & title */}
        <Flex vertical align="center" style={{ marginBottom: 24 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #0066B3, #00A3E0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 24,
              marginBottom: 12,
            }}
          >
            H
          </div>
          <Typography.Title level={3} style={{ margin: 0 }}>
            {APP_NAME}
          </Typography.Title>
          <Typography.Text type="secondary">{APP_DESCRIPTION}</Typography.Text>
        </Flex>

        <Form
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Nhập tên đăng nhập" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Nhập mật khẩu" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        <Typography.Text
          type="secondary"
          style={{ display: "block", textAlign: "center", fontSize: 12 }}
        >
          Đại học Mở Hà Nội – Khoa CNTT
        </Typography.Text>
      </Card>
    </Flex>
  );
};

export default LoginPage;