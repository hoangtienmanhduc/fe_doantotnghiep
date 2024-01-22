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
            { path: '/', component: Login, layout: null },
            { path: '/lecturer', component: AdminDashboard },
            { path: '/admin', component: AdminDashboard },
            { path: '/capnhatthongtinsinhvien', component: Capnhatthongtinsinhvien },
            { path: '/doimatkhau', component: Doimatkhau },
            { path: '/home', component: Home },
            { path: '/thongtincanhan', component: Thongtincanhan, layout: DefaultLayoutSidebar },
            { path: '/chuongtrinhkhung', component: Chuongtrinhkhung, layout: DefaultLayoutSidebar },
            { path: '/lichtheotiendo', component: Lichtheotiendo },
            { path: '/ketquahoctap', component: Ketquahoctap, layout: HeaderOnly },
            { path: '/phieutonghop', component: PhieuTongHop, layout: DefaultLayoutSidebar },
            { path: '/lichhoc', component: Lichhoc, layout: DefaultLayoutSidebar },
            { path: '/thanhtoantructuyen', component: Thanhtoantructuyen, layout: DefaultLayoutSidebar },
            { path: '/ghichunhacnho', component: Ghichunhacnho, layout: DefaultLayoutSidebar },
            { path: '/dangkyhocphan', component: Dangkyhocphan },
            { path: '/tracuucongno', component: Tracuucongno, layout: HeaderOnly },
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
