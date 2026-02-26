import { Card, Statistic, type StatisticProps } from "antd";
import type { ReactNode } from "react";

interface StatCardProps extends StatisticProps {
  icon?: ReactNode;
  color?: string;
}

/**
 * StatCard – card thống kê cho Dashboard.
 */
const StatCard = ({ icon, color = "#0066B3", ...rest }: StatCardProps) => {
  return (
    <Card hoverable style={{ borderTop: `3px solid ${color}` }}>
      <Statistic
        {...rest}
        prefix={
          icon ? (
            <span
              style={{
                color,
                fontSize: 24,
                marginRight: 8,
                display: "inline-flex",
              }}
            >
              {icon}
            </span>
          ) : undefined
        }
      />
    </Card>
  );
};

export default StatCard;
