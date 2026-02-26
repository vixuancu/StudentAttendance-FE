import { Typography, Card, Empty } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import { PageHeader } from "@/components/Common";

/**
 * Attendance Page Shell – Nghiệp vụ 6, 7, 8
 *
 * Trang này sẽ chứa:
 * - Chọn buổi học đang ACTIVE
 * - Camera feed (react-webcam)
 * - Dashboard realtime (danh sách SV + trạng thái)
 * - Xác nhận / chỉnh sửa điểm danh
 */
const AttendancePage = () => {
  return (
    <div>
      <PageHeader
        title="Điểm danh"
        subtitle="Điểm danh tự động bằng nhận diện khuôn mặt"
        breadcrumbs={[
          { title: "Tổng quan", path: "/" },
          { title: "Điểm danh" },
        ]}
      />

      <Card>
        <Empty
          image={<CameraOutlined style={{ fontSize: 64, color: "#d9d9d9" }} />}
          description={
            <div>
              <Typography.Title level={5} type="secondary">
                Chưa có buổi học nào đang hoạt động
              </Typography.Title>
              <Typography.Text type="secondary">
                Vui lòng kích hoạt buổi học tại trang "Buổi học" trước khi bắt
                đầu điểm danh.
              </Typography.Text>
            </div>
          }
        />
      </Card>

      {/* TODO: Khi có buổi ACTIVE:
        - Camera component (react-webcam)
        - Realtime attendance table
        - Summary stats (present / absent / late / unconfirmed)
        - Manual mark / confirm actions
        - Export Excel button
      */}
    </div>
  );
};

export default AttendancePage;
