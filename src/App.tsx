import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import router from '@/routes';

const App = () => {
  return (
    <ConfigProvider locale={viVN}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;