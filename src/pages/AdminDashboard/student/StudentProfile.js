import { Avatar } from 'primereact/avatar';
import { Divider } from 'primereact/divider';
import React, { useCallback, useEffect, useState } from 'react';
import { contactList, infoList } from './StudentConstant';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { showNotification } from '~/components/notification/NotificationService';
import { changePassword } from '~/components/authentication/AuthEndPoint';
import { HTTP_STATUS_OK } from '~/utils/Constants';
import { Password } from 'primereact/password';

const StudentProfile = ({ data = {} }) => {
    const [activeTab, setActiveTab] = useState('info');
    const [passwordData, setPasswordData] = useState(null);

    const handleOnSubmitPassword = useCallback(async () => {
        if (!passwordData?.oldPassword) {
            showNotification('error', 'Lỗi', 'Mật khẩu cũ không được để trống !!');
            return;
        }

        if (!passwordData?.newPassword) {
            showNotification('error', 'Lỗi', 'Mật khẩu mới không được để trống !!');
            return;
        }

        if (!passwordData?.retypePassword) {
            showNotification('error', 'Lỗi', 'Vui lòng nhập lại mật khẩu mới để xác nhận !!');
            return;
        }

        if (passwordData?.newPassword !== passwordData?.retypePassword) {
            showNotification('error', 'Lỗi', 'Mật khẩu mới và xác nhận mật khẩu không trùng khớp !!');
            return;
        }
        const response = await changePassword({ ...passwordData, usernameOrEmail: data?.email });

        if (response === HTTP_STATUS_OK) {
            showNotification('success', 'Thành công', 'Cập nhật tài khoản thành công !!');
            setPasswordData({});
            return;
        }

        return;
    }, [data?.email, passwordData]);

    return (
        <React.Fragment>
            <div className="flex w-full align-items-start h-full">
                <div className="col-3 h-full">
                    <div className="col-12 surface-50 border-round-xl">
                        <h3 className="text-primary">Thông tin</h3>
                        <div
                            onClick={() => setActiveTab('info')}
                            className={`${activeTab === 'info' ? 'bg-primary' : ''} col-12 cursor-pointer`}
                        >
                            Thông tin cá nhân
                        </div>
                        <div
                            onClick={() => setActiveTab('account')}
                            className={`${activeTab === 'account' ? 'bg-primary' : ''} col-12 cursor-pointer`}
                        >
                            Tài khoản
                        </div>
                        <div
                            onClick={() => setActiveTab('bank')}
                            className={`${activeTab === 'bank' ? 'bg-primary' : ''} col-12 cursor-pointer`}
                        >
                            Liên kết ngân hàng
                        </div>
                        <div
                            onClick={() => setActiveTab('other')}
                            className={`${activeTab === 'other' ? 'bg-primary' : ''} col-12 cursor-pointer`}
                        >
                            Khác
                        </div>
                    </div>
                </div>
                <div className="col-9">
                    {activeTab === 'info' && (
                        <div className="col-12 surface-50 border-round-xl">
                            <h1 className="text-primary text-center">Thông tin sinh viên</h1>
                            <div className="w-full flex flex-column justify-content-center align-items-center">
                                <Avatar image={data?.avatar ? data?.avatar : ''} icon="pi pi-user" size="xlarge" />
                                <h3 className="mb-0">{data?.fullName}</h3>
                            </div>
                            <Divider />
                            <div className="w-full">
                                <h3 className="m-0 font-semibold text-white bg-primary p-2 border-round-md ">
                                    <i className="pi pi-user mr-2"></i>Thông tin cá nhân
                                </h3>
                                <div className="col-12 grid ml-0">
                                    {infoList.map((item, idx) => (
                                        <div key={idx} className="col-6">
                                            <span className="">
                                                <div className="flex align-items-center justify-content-between w-full mb-2">
                                                    <p className="m-0">{item?.label}</p>
                                                </div>
                                                <InputText value={data[item?.key] || ''} disabled className="col-12" />
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full">
                                <h3 className="m-0 font-semibold text-white bg-primary p-2 border-round-md ">
                                    <i className="pi pi-phone mr-2"></i>Thông tin liên hệ
                                </h3>
                                <div className="col-12 grid ml-0">
                                    {contactList.map((item, idx) => (
                                        <div key={idx} className="col-6">
                                            <span className="">
                                                <div className="flex align-items-center justify-content-between w-full mb-2">
                                                    <p className="m-0">{item?.label}</p>
                                                </div>
                                                <InputText value={data[item?.key] || ''} disabled className="col-12" />
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'account' && (
                        <div className="col-12 surface-50 border-round-xl">
                            <h1 className="text-primary text-center">Đổi mật khẩu</h1>
                            <div className="col-12 grid ml-0">
                                <div className="col-12">
                                    <span className="w-full">
                                        <div className="flex align-items-center justify-content-between w-full mb-2">
                                            <p className="m-0">Mật khẩu cũ</p>
                                        </div>
                                        <Password
                                            pt={{
                                                input: { className: 'w-full' },
                                            }}
                                            value={passwordData?.oldPassword || ''}
                                            onChange={(e) =>
                                                setPasswordData({ ...passwordData, oldPassword: e.target.value })
                                            }
                                            className="col-12"
                                        />
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 grid ml-0">
                                <div className="col-12">
                                    <span className="w-full">
                                        <div className="flex align-items-center justify-content-between w-full mb-2">
                                            <p className="m-0">Mật khẩu mới</p>
                                        </div>
                                        <Password
                                            pt={{
                                                input: { className: 'w-full' },
                                            }}
                                            value={passwordData?.newPassword || ''}
                                            onChange={(e) =>
                                                setPasswordData({ ...passwordData, newPassword: e.target.value })
                                            }
                                            className="col-12"
                                        />
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 grid ml-0">
                                <div className="col-12">
                                    <span className="w-full">
                                        <div className="flex align-items-center justify-content-between w-full mb-2">
                                            <p className="m-0">Nhập lại mật khẩu mới</p>
                                        </div>
                                        <Password
                                            pt={{
                                                input: { className: 'w-full' },
                                            }}
                                            value={passwordData?.retypePassword || ''}
                                            onChange={(e) =>
                                                setPasswordData({ ...passwordData, retypePassword: e.target.value })
                                            }
                                            className="col-12"
                                        />
                                    </span>
                                </div>
                            </div>
                            <hr />
                            <div className="col-12">
                                <Button
                                    className="col-12"
                                    label="Xác nhận"
                                    icon="pi pi-check"
                                    onClick={handleOnSubmitPassword}
                                />
                            </div>
                        </div>
                    )}
                    {activeTab === 'bank' && (
                        <div className="col-12 surface-50 border-round-xl">
                            <h2>Comming Soon</h2>
                        </div>
                    )}
                    {activeTab === 'other' && (
                        <div className="col-12 surface-50 border-round-xl">
                            <h2>Comming Soon</h2>
                        </div>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};

export default StudentProfile;
