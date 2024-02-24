import images from '~/assets/images';
import Menu from '~/components/Popper/Menu';
import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { clearStorage } from '~/components/authentication/AuthUtils';

const MENU_ITEMS = [
    {
        title: 'Thông tin cá nhân',
        to: '/thongtincanhan',
    },
    {
        title: 'Đổi mật khẩu',
        to: '/doimatkhau',
    },
    {
        title: 'Giao diện quản lý',
        to: '/admin',
    },
    {
        title: 'Đăng xuất',
        command: () => clearStorage(),
        to: '/',
    },
];

function Header() {
    return (
        <React.Fragment>
            <div className="col-12 grid align-items-center shadow-1">
                <div className="flex align-items-center justify-content-between col-12 p-0">
                    <div className="flex align-items-center p-0">
                        <img src={images.Logo} alt="Logo" height={100}></img>
                        <div className="md:hidden sm:hidden xs:hidden lg:flex lg:align-items-center mr-3">
                            <span className="p-input-icon-left mr-3">
                                <i className="pi pi-search" />
                                <InputText placeholder="Search..." value={''} onChange={(e) => {}} />
                            </span>
                            <div className="">
                                <Button icon="pi pi-search" onClick={() => {}} />
                            </div>
                        </div>
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
                    </div>

                    <div className="flex align-items-center p-0">
                        <Menu items={MENU_ITEMS}>
                            <div className="flex align-items-center p-2 cursor-pointer hover:surface-100 border-round">
                                <h3 className="text-800 mr-2 ">Hoàng Tiến Mạnh Đức</h3>
                                <Avatar icon="pi pi-user" size="large" shape="circle" className="bg-primary" />
                            </div>
                        </Menu>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Header;
