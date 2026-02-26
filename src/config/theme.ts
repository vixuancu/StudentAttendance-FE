/**
 * Ant Design 6 Theme Configuration
 * Tông màu chủ đạo: Xanh nước biển – Đại học Mở Hà Nội (HOU)
 */
import type { ThemeConfig } from "antd";

// ── Design Tokens ──
export const colors = {
  // HOU Primary Blue
  primary: "#0066B3",
  primaryLight: "#E6F4FF",
  primaryDark: "#004A82",

  // Sidebar
  siderBg: "#001529",
  siderMenuSelected: "#0066B3",

  // Semantic
  success: "#52c41a",
  warning: "#faad14",
  error: "#ff4d4f",
  info: "#0066B3",

  // Neutral
  textPrimary: "#1a1a2e",
  textSecondary: "#595959",
  border: "#d9d9d9",
  bgPage: "#f0f2f5",
  bgContainer: "#ffffff",
} as const;

export const houTheme: ThemeConfig = {
  token: {
    // Colors
    colorPrimary: colors.primary,
    colorSuccess: colors.success,
    colorWarning: colors.warning,
    colorError: colors.error,
    colorInfo: colors.info,

    // Typography
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: 14,

    // Border
    borderRadius: 8,

    // Layout
    colorBgLayout: colors.bgPage,
  },
  components: {
    Layout: {
      siderBg: colors.siderBg,
      headerBg: colors.bgContainer,
      bodyBg: colors.bgPage,
    },
    Menu: {
      darkItemBg: colors.siderBg,
      darkItemSelectedBg: colors.siderMenuSelected,
    },
    Button: {
      borderRadius: 6,
    },
    Card: {
      borderRadiusLG: 12,
    },
    Table: {
      borderRadius: 8,
      headerBg: colors.primaryLight,
    },
  },
};
