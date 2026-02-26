import { useState, useEffect } from "react";
import { Row, Col, Card, Typography, Spin } from "antd";
import {
  TeamOutlined,
  BookOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { PageHeader, StatCard } from "@/components/Common";
import dashboardService from "@/services/dashboard.service";
import type { DashboardStats } from "@/types";

const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await dashboardService.getStats();
        setStats(data);
      } catch {
        // API error handled by interceptor
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <PageHeader
        title="Tổng quan"
        subtitle="Thống kê hệ thống điểm danh khuôn mặt"
      />

      <Spin spinning={loading}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Tổng sinh viên"
              value={stats?.total_students ?? 0}
              icon={<TeamOutlined />}
              color="#0066B3"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Môn tín chỉ"
              value={stats?.total_courses ?? 0}
              icon={<BookOutlined />}
              color="#00A3E0"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Buổi học hôm nay"
              value={stats?.today_sessions ?? 0}
              icon={<CalendarOutlined />}
              color="#52c41a"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Tỷ lệ có mặt"
              value={stats?.attendance_rate ?? 0}
              suffix="%"
              icon={<CheckCircleOutlined />}
              color="#faad14"
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} lg={16}>
            <Card title="Hoạt động gần đây">
              <Typography.Text type="secondary">
                Biểu đồ thống kê sẽ hiển thị ở đây khi tích hợp backend.
              </Typography.Text>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="Buổi học hôm nay">
              <Typography.Text type="secondary">
                Danh sách buổi học hôm nay sẽ hiển thị tại đây.
              </Typography.Text>
            </Card>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default DashboardPage;