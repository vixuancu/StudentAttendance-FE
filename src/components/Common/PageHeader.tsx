import type { ReactNode } from "react";
import { Typography, Flex, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  title: string;
  path?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  /** Action buttons on the right */
  extra?: ReactNode;
}

/**
 * PageHeader – tiêu đề trang chuẩn.
 * Dùng ở đầu mỗi page shell.
 */
const PageHeader = ({ title, subtitle, breadcrumbs, extra }: PageHeaderProps) => {
  return (
    <div style={{ marginBottom: 24 }}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb
          style={{ marginBottom: 8 }}
          items={breadcrumbs.map((item) => ({
            title: item.path ? <Link to={item.path}>{item.title}</Link> : item.title,
          }))}
        />
      )}
      <Flex justify="space-between" align="center" wrap="wrap" gap={12}>
        <div>
          <Typography.Title level={4} style={{ margin: 0 }}>
            {title}
          </Typography.Title>
          {subtitle && (
            <Typography.Text type="secondary">{subtitle}</Typography.Text>
          )}
        </div>
        {extra && <Flex gap={8}>{extra}</Flex>}
      </Flex>
    </div>
  );
};

export default PageHeader;
