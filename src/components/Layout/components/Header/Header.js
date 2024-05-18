import images from '~/assets/images';
import React, { useMemo } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { clearStorage, getUserId, getUserRole } from '~/components/authentication/AuthUtils';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Menu, MenuItem } from '@mui/material';
import MenuUtils from '~/components/Popper/Menu';
import { UserRoles } from '~/App';
import { getUserInfo } from '~/api/user/UserService';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const buttonClickKeHoachGiangDay = (popupState) => {
    window.location.assign('/kehoachgiangday');
    popupState.close(); // Đóng popup sau khi click
};

const buttonClickLichTrinhGiangDay = (popupState) => {
    window.location.assign('/lichtrinhgiangday');
    popupState.close(); // Đóng popup sau khi click
};

const buttonClickLichThiKetThucHocPhan = (popupState) => {
    window.location.assign('/lichthiketthuchocphan');
    popupState.close(); // Đóng popup sau khi click
};
const QueryKey = 'User-Info';

function Header() {
    const MENU_ITEMS = useMemo(() => {
        let menuList = [
            {
                key: 'changepassword',
                title: 'Đổi mật khẩu',
                to: '/doimatkhau',
            },
            {
                key: 'manage',
                title: 'Giao diện quản lý',
                to: '/admin',
            },
            {
                key: 'logout',
                title: 'Đăng xuất',
                command: () => clearStorage(),
                to: '/',
            },
        ];

        if (getUserRole() !== UserRoles.ADMIN) {
            menuList = menuList.filter((item) => item?.key !== 'manage');
        }

        return menuList;
    }, []);

    const { data: userInfo } = useQuery([QueryKey, getUserId()], () => getUserInfo(getUserId(), getUserId()), {
        enabled: !!getUserId(),
    });
    return (
        <React.Fragment>
            <div className="col-12 grid align-items-center shadow-1">
                <div className="flex align-items-center justify-content-between col-12 p-0">
                    <div className="flex align-items-center p-0">
                        <img
                            className="cursor-pointer"
                            src={images.Logo}
                            alt="Logo"
                            height={100}
                            onClick={() => window.location.assign('/')}
                        ></img>
                        <div className="md:hidden sm:hidden xs:hidden lg:flex lg:align-items-center mr-3">
                            <span className="p-input-icon-left mr-3">
                                <InputText placeholder="Search..." value={''} onChange={(e) => {}} />
                            </span>
                            <div className="">
                                <Button icon="pi pi-search" onClick={() => {}} />
                            </div>
                        </div>
                        {getUserRole() === UserRoles.STUDENT && (
                            <div className="flex justify-content-between align-items-center">
                                <div className="p-2">
                                    <Button
                                        onClick={() => window.location.assign('/')}
                                        text
                                        icon="pi pi-home"
                                        label="Trang chủ"
                                    />
                                </div>
                                <div className="p-2">
                                    <Button text icon="pi pi-bell" iconPos="left" label="Tin tức" onClick={() => {}} />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex align-items-center p-0">
                        <MenuUtils items={MENU_ITEMS}>
                            <div className="flex align-items-center p-2 cursor-pointer hover:surface-100 border-round">
                                <h3 className="text-800 mr-2 ">
                                    {!!userInfo
                                        ? `${
                                              getUserRole() === UserRoles.LECTURER
                                                  ? 'GV.'
                                                  : getUserRole() === UserRoles.ADMIN
                                                  ? 'QL'
                                                  : ''
                                          } ${userInfo.fullName}`
                                        : '_'}
                                </h3>
                                <Avatar icon="pi pi-user" size="large" shape="circle" className="bg-primary" />
                            </div>
                        </MenuUtils>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Header;
