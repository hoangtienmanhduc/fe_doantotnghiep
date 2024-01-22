import Home from '~/pages/Home/Home';
import Lichtheotiendo from '~/pages/Lichtheotiendo/LichTheoTienDo';
import Ketquahoctap from '~/pages/Ketquahoctap/KetQuaHocTap';
import { DefaultLayoutSidebar, HeaderOnly } from '~/components/Layout/exportSidebarAndHeader';
import Thanhtoantructuyen from '~/pages/Thanhtoantructuyen/ThanhToanTrucTuyen';
import PhieuTongHop from '~/pages/Phieutonghop/PhieuTongHop';
import Ghichunhacnho from '~/pages/Ghichunhacnho/GhiChuNhacNho';
import Dangkyhocphan from '~/pages/Dangkyhocphan/DangKyHocPhan';
import Lichhoc from '~/pages/Lichhoc/LichHoc';
import Tracuucongno from '~/pages/Tracuucongno/TraCuuCongNo';
import Login from '~/pages/Login/Login';
import Chuongtrinhkhung from '~/pages/Chuongtrinhkhung/ChuongTrinhKhung';
import Doimatkhau from '~/pages/Doimatkhau/DoiMatKhau';
import Thongtincanhan from '~/pages/Thongtincanhan/ThongTinCaNhan';
import Capnhatthongtinsinhvien from '~/pages/Capnhatthongtinsinhvien/CapNhatThongTinSinhVien';

//public routes
const publicRoutes = [
    { path: '/home', component: Home },
    { path: '/', component: Login, layout: null },
    { path: '/lichtheotiendo', component: Lichtheotiendo },
    { path: '/capnhatthongtinsinhvien', component: Capnhatthongtinsinhvien },
    { path: '/doimatkhau', component: Doimatkhau },
    { path: '/ketquahoctap', component: Ketquahoctap, layout: HeaderOnly },
    { path: '/phieutonghop', component: PhieuTongHop, layout: DefaultLayoutSidebar },
    { path: '/thongtincanhan', component: Thongtincanhan, layout: DefaultLayoutSidebar },
    { path: '/lichhoc', component: Lichhoc, layout: DefaultLayoutSidebar },
    { path: '/thanhtoantructuyen', component: Thanhtoantructuyen, layout: DefaultLayoutSidebar },
    { path: '/ghichunhacnho', component: Ghichunhacnho, layout: DefaultLayoutSidebar },
    { path: '/chuongtrinhkhung', component: Chuongtrinhkhung, layout: DefaultLayoutSidebar },
    { path: '/dangkyhocphan', component: Dangkyhocphan },
    { path: '/tracuucongno', component: Tracuucongno, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
