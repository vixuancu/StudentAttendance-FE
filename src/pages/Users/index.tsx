import { Typography, Card, Empty } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { PageHeader } from "@/components/Common";

/**
 * Users Management Page – Quản trị tài khoản.
 * Chỉ ADMIN mới truy cập được.
 */
const UsersPage = () => {
  return (
    <div>
      <PageHeader
        title="Quản trị hệ thống"
        subtitle="Quản lý tài khoản người dùng, phân quyền"
      />

      <Card>
        <Empty
          image={
            <SettingOutlined style={{ fontSize: 64, color: "#d9d9d9" }} />
          }
          description={
            <Typography.Text type="secondary">
              Trang quản trị sẽ được xây dựng khi tích hợp backend.
            </Typography.Text>
          }
        />
      </Card>
    </div>
  );
};

export default UsersPage;
