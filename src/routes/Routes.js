import HomeLecturer from '~/pages/LecturerDashboard/HomeLecturer/HomeLecturer';
import DefaultLayoutLecturer from '~/components/Layout/DefaultLayoutLecturer';
import Kehoachgiangday from '~/pages/LecturerDashboard/Kehoachgiangday/KeHoachGiangDay';
import Lichthiketthuchocphan from '~/pages/LecturerDashboard/Lichthiketthuchocphan/LichThiKetThucHocPhan';
import Lichtrinhgiangday from '~/pages/LecturerDashboard/Lichtrinhgianday/LichTrinhGiangDay';
import Nhapdiemquatrinhhoctap from '~/pages/LecturerDashboard/Nhapdiemquatrinhhoctap/NhapDiemQuaTrinhHocTap';
import Quanlydiemquatrinhhoctap from '~/pages/LecturerDashboard/Quanlydiemquatrinhhoctap/QuanLyDiemQuaTrinhHocTap';
import Thongtinlophocphan from '~/pages/LecturerDashboard/Thongtinlophocphan';
import Tracuucongno from '~/pages/StudentDashboard/Tracuucongno/TraCuuCongNo';
import Home from '~/pages/StudentDashboard/Home/Home';
import Login from '~/pages/Login/Login';
import Lichtheotiendo from '~/pages/StudentDashboard/Lichtheotiendo/LichTheoTienDo';
import Capnhatthongtinsinhvien from '~/pages/StudentDashboard/Capnhatthongtinsinhvien/CapNhatThongTinSinhVien';
import Doimatkhau from '~/pages/StudentDashboard/Doimatkhau/DoiMatKhau';
import { DefaultLayoutSidebar, HeaderOnly } from '~/components/Layout/exportSidebarAndHeader';
import Ketquahoctap from '~/pages/StudentDashboard/Ketquahoctap/KetQuaHocTap';
import PhieuTongHop from '~/pages/StudentDashboard/Phieutonghop/PhieuTongHop';
import Thongtincanhan from '~/pages/StudentDashboard/Thongtincanhan/ThongTinCaNhan';
import Lichhoc from '~/pages/StudentDashboard/Lichhoc/LichHoc';
import Thanhtoantructuyen from '~/pages/StudentDashboard/Thanhtoantructuyen/ThanhToanTrucTuyen';
import Ghichunhacnho from '~/pages/StudentDashboard/Ghichunhacnho/GhiChuNhacNho';
import Chuongtrinhkhung from '~/pages/StudentDashboard/Chuongtrinhkhung/ChuongTrinhKhung';
import Dangkyhocphan from '~/pages/StudentDashboard/Dangkyhocphan/DangKyHocPhan';

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
    { path: '/homelecturer', component: HomeLecturer, layout: DefaultLayoutLecturer },
    { path: '/kehoachgiangday', component: Kehoachgiangday, layout: DefaultLayoutLecturer },
    { path: '/thongtinlophocphan', component: Thongtinlophocphan, layout: DefaultLayoutLecturer },
    { path: '/quanlydiemquatrinhhoctap', component: Quanlydiemquatrinhhoctap, layout: DefaultLayoutLecturer },
    { path: '/nhapdiemquatrinhhoctap', component: Nhapdiemquatrinhhoctap, layout: DefaultLayoutLecturer },
    { path: '/lichtrinhgiangday', component: Lichtrinhgiangday, layout: DefaultLayoutLecturer },
    { path: '/lichthiketthuchocphan', component: Lichthiketthuchocphan, layout: DefaultLayoutLecturer },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
