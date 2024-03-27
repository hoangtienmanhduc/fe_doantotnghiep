import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultLayout, DefaultLayoutSidebar, HeaderOnly } from './components/Layout/exportSidebarAndHeader';
import { Fragment } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Lichtheotiendo from './pages/Lichtheotiendo/LichTheoTienDo';
import Ketquahoctap from './pages/Ketquahoctap/KetQuaHocTap';
import PhieuTongHop from './pages/Phieutonghop/PhieuTongHop';
import Lichhoc from './pages/Lichhoc/LichHoc';
import Thanhtoantructuyen from './pages/Thanhtoantructuyen/ThanhToanTrucTuyen';
import Dangkyhocphan from './pages/Dangkyhocphan/DangKyHocPhan';
import Ghichunhacnho from './pages/Ghichunhacnho/GhiChuNhacNho';
import Tracuucongno from './pages/Tracuucongno/TraCuuCongNo';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import { PrimeReactProvider } from 'primereact/api';

import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primeicons/primeicons.css';
import './custom.css';
import Chuongtrinhkhung from '~/pages/Chuongtrinhkhung/ChuongTrinhKhung';
import Doimatkhau from '~/pages/Doimatkhau/DoiMatKhau';
import Thongtincanhan from '~/pages/Thongtincanhan/ThongTinCaNhan';
import Capnhatthongtinsinhvien from '~/pages/Capnhatthongtinsinhvien/CapNhatThongTinSinhVien';
import { getAccessToken } from './components/authentication/AuthUtils';
import StudentInformation from './pages/AdminDashboard/student/StudentInformation';
export const UserRoles = {
    ADMIN: 'Admin',
    LECTURER: 'Lecturer',
    STUDENT: 'Student',
};

function App() {
    const queryClientProvider = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                refetchInterval: false,
                refetchIntervalInBackground: false,
                retry: false,
                retryOnMount: true,
                keepPreviousData: true,
            },
        },
    });

    const routes = useMemo(() => {
        return [
            { path: '/', component: !getAccessToken() ? Login : Home, layout: !getAccessToken() && null },
            {
                path: '/lecturer',
                component: !getAccessToken() ? Login : AdminDashboard,
                layout: !getAccessToken() && null,
            },
            {
                path: '/admin',
                component: !getAccessToken() ? Login : AdminDashboard,
                layout: !getAccessToken() && null,
            },
            {
                path: '/admin/student/:id',
                component: !getAccessToken() ? Login : StudentInformation,
                layout: !getAccessToken() && null,
            },
            {
                path: '/capnhatthongtinsinhvien',
                component: !getAccessToken() ? Login : Capnhatthongtinsinhvien,
                layout: !getAccessToken() && null,
            },
            {
                path: '/doimatkhau',
                component: !getAccessToken() ? Login : Doimatkhau,
                layout: !getAccessToken() && null,
            },
            {
                path: '/thongtincanhan',
                component: !getAccessToken() ? Login : Thongtincanhan,
                layout: !getAccessToken() ? null : DefaultLayoutSidebar,
            },
            {
                path: '/chuongtrinhkhung',
                component: !getAccessToken() ? Login : Chuongtrinhkhung,
                layout: !getAccessToken() ? null : DefaultLayoutSidebar,
            },
            {
                path: '/lichtheotiendo',
                component: !getAccessToken() ? Login : Lichtheotiendo,
                layout: !getAccessToken() ? null : DefaultLayoutSidebar,
            },
            {
                path: '/ketquahoctap',
                component: !getAccessToken() ? Login : Ketquahoctap,
                layout: !getAccessToken() ? null : HeaderOnly,
            },
            {
                path: '/phieutonghop',
                component: !getAccessToken() ? Login : PhieuTongHop,
                layout: !getAccessToken() ? null : DefaultLayoutSidebar,
            },
            {
                path: '/lichhoc',
                component: !getAccessToken() ? Login : Lichhoc,
                layout: !getAccessToken() ? null : DefaultLayoutSidebar,
            },
            {
                path: '/thanhtoantructuyen',
                component: !getAccessToken() ? Login : Thanhtoantructuyen,
                layout: !getAccessToken() ? null : DefaultLayoutSidebar,
            },
            {
                path: '/ghichunhacnho',
                component: !getAccessToken() ? Login : Ghichunhacnho,
                layout: !getAccessToken() ? null : DefaultLayoutSidebar,
            },
            {
                path: '/dangkyhocphan',
                component: !getAccessToken() ? Login : Dangkyhocphan,
                layout: !getAccessToken() && null,
            },
            {
                path: '/tracuucongno',
                component: !getAccessToken() ? Login : Tracuucongno,
                layout: !getAccessToken() ? null : HeaderOnly,
            },
        ];
    }, []);

    return (
        <QueryClientProvider client={queryClientProvider}>
            <PrimeReactProvider>
                <Router>
                    <div className="App">
                        <Routes>
                            {routes?.length > 0 &&
                                routes.map((route, index) => {
                                    let Layout = DefaultLayout;

                                    if (route.layout) {
                                        Layout = route.layout;
                                    } else if (route.layout === null) {
                                        Layout = Fragment;
                                    }
                                    const Page = route.component;

                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            }
                                        />
                                    );
                                })}
                        </Routes>
                    </div>
                </Router>
            </PrimeReactProvider>
        </QueryClientProvider>
    );
}

export default App;
