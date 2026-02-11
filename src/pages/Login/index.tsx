import {Form, Input, Button, Card, message} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import authService from "@/services/auth.service";
import type { LoginRequest } from "@/types";

const LoginPage = () => {
    const navigate = useNavigate();

    const onFinish = async (values: LoginRequest) => {
        try {
            await authService.login(values);
            message.success("Đăng nhập thành công");
            navigate("/");
        } catch  {
            // Error đã được xử lí bởi interceptor
        }
    };

      return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f0f2f5',
    }}>
      <Card title="Đăng nhập hệ thống" style={{ width: 400 }}>
        <Form onFinish={onFinish} autoComplete="off" layout="vertical">
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Nhập tên đăng nhập' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Nhập mật khẩu' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="large" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
export default LoginPage;