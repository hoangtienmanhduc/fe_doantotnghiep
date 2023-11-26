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

//public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login, layout: null },
    { path: '/lichtheotiendo', component: Lichtheotiendo },
    { path: '/ketquahoctap', component: Ketquahoctap, layout: HeaderOnly },
    { path: '/phieutonghop', component: PhieuTongHop, layout: DefaultLayoutSidebar },
    { path: '/lichhoc', component: Lichhoc, layout: DefaultLayoutSidebar },
    { path: '/thanhtoantructuyen', component: Thanhtoantructuyen, layout: DefaultLayoutSidebar },
    { path: '/ghichunhacnho', component: Ghichunhacnho, layout: DefaultLayoutSidebar },
    { path: '/dangkyhocphan', component: Dangkyhocphan },
    { path: '/tracuucongno', component: Tracuucongno, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
