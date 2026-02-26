import { RouterProvider } from "react-router-dom";
import { ConfigProvider, App as AntApp } from "antd";
import viVN from "antd/locale/vi_VN";
import { houTheme } from "@/config/theme";
import router from "@/routes";

const App = () => {
  return (
    <ConfigProvider locale={viVN} theme={houTheme}>
      <AntApp>
        <RouterProvider router={router} />
      </AntApp>
    </ConfigProvider>
  );
};

export default App;