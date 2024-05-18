import styles from './Doimatkhau.module.scss';
import classNames from 'classnames/bind';
import { Password } from 'primereact/password';
import { useCallback, useState } from 'react';
import { showNotification } from '~/components/notification/NotificationService';
import { changePassword } from '~/components/authentication/AuthEndPoint';
import { getUsername } from '~/components/authentication/AuthUtils';
import { HTTP_STATUS_OK } from '~/utils/Constants';
import { Button } from 'primereact/button';

const cx = classNames.bind(styles);

function Doimatkhau() {
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
        const response = await changePassword({ ...passwordData, usernameOrEmail: getUsername() });

        if (response === HTTP_STATUS_OK) {
            showNotification('success', 'Thành công', 'Cập nhật tài khoản thành công !!');
            setPasswordData({});
            return;
        }

        return;
    }, [passwordData]);

    return (
        <div className={cx('wrapper')}>
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
                                onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
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
                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
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
                                onChange={(e) => setPasswordData({ ...passwordData, retypePassword: e.target.value })}
                                className="col-12"
                            />
                        </span>
                    </div>
                </div>
                <hr />
                <div className="col-12">
                    <Button className="col-12" label="Xác nhận" icon="pi pi-check" onClick={handleOnSubmitPassword} />
                </div>
            </div>
        </div>
    );
}

export default Doimatkhau;
