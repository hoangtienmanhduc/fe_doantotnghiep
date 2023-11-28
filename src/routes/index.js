import Home from '~/pages/Home';
import Lichtheotiendo from '~/pages/Lichtheotiendo';
import Ketquahoctap from '~/pages/Ketquahoctap';
import { DefaultLayoutSidebar, HeaderOnly } from '~/components/Layout';
import Thanhtoantructuyen from '~/pages/Thanhtoantructuyen';
import PhieuTongHop from '~/pages/Phieutonghop';
import Ghichunhacnho from '~/pages/Ghichunhacnho';
import Dangkyhocphan from '~/pages/Dangkyhocphan';
import Lichhoc from '~/pages/Lichhoc';
import Tracuucongno from '~/pages/Tracuucongno';
import Login from '~/pages/Login';
import Chuongtrinhkhung from '~/pages/Chuongtrinhkhung';
import Doimatkhau from '~/pages/Doimatkhau';
import Thongtincanhan from '~/pages/Thongtincanhan';
import Capnhatthongtinsinhvien from '~/pages/Capnhatthongtinsinhvien';

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
