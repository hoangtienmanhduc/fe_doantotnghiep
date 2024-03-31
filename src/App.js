import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultLayout, DefaultLayoutSidebar, HeaderOnly } from './components/Layout/exportSidebarAndHeader';
import { Fragment } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { PrimeReactProvider } from 'primereact/api';

import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primeicons/primeicons.css';
import './custom.css';
import { getAccessToken } from './components/authentication/AuthUtils';
import Login from './pages/Login/Login';
import Home from './pages/StudentDashboard/Home/Home';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import StudentInformation from './pages/AdminDashboard/student/StudentInformation';
import Capnhatthongtinsinhvien from './pages/StudentDashboard/Capnhatthongtinsinhvien/CapNhatThongTinSinhVien';
import Doimatkhau from './pages/StudentDashboard/Doimatkhau/DoiMatKhau';
import Thongtincanhan from './pages/StudentDashboard/Thongtincanhan/ThongTinCaNhan';
import Chuongtrinhkhung from './pages/StudentDashboard/Chuongtrinhkhung/ChuongTrinhKhung';
import Lichtheotiendo from './pages/StudentDashboard/Lichtheotiendo/LichTheoTienDo';
import Ketquahoctap from './pages/StudentDashboard/Ketquahoctap/KetQuaHocTap';
import PhieuTongHop from './pages/StudentDashboard/Phieutonghop/PhieuTongHop';
import Lichhoc from './pages/StudentDashboard/Lichhoc/LichHoc';
import Thanhtoantructuyen from './pages/StudentDashboard/Thanhtoantructuyen/ThanhToanTrucTuyen';
import Ghichunhacnho from './pages/StudentDashboard/Ghichunhacnho/GhiChuNhacNho';
import Dangkyhocphan from './pages/StudentDashboard/Dangkyhocphan/DangKyHocPhan';
import Tracuucongno from './pages/StudentDashboard/Tracuucongno/TraCuuCongNo';
import HomeLecturer from './pages/LecturerDashboard/HomeLecturer';
import HeaderLecturer from './components/Layout/components/HeaderLecturer';
import DefaultLayoutLecturer from './components/Layout/DefaultLayoutLecturer';
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
            {
                path: '/homelecturer',
                component: !getAccessToken() ? Login : HomeLecturer,
                layout: !getAccessToken() ? null : DefaultLayoutLecturer,
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
