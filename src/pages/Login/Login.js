import images from '~/assets/images';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { authenticateUser } from '~/components/authentication/AuthEndPoint';
import { storeAllUserData } from '~/components/authentication/AuthUtils';
import { UserRoles } from '~/App';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}

function Login() {
    const [randomString, setRandomString] = useState(generateRandomString(4));
    const [inputValues, setInputValues] = useState({
        username: '',
        password: '',
        verificationCode: '',
    });

    const handleInputChange = (event, field) => {
        const value = event.target.value;
        setInputValues((prevValues) => ({ ...prevValues, [field]: value }));
    };

    useEffect(() => {
        regenerateString();
    }, []);

    //Random mã
    const regenerateString = () => {
        setRandomString(generateRandomString(4));
    };

    //Submit login
    const toast = useRef(null);
    const handleOnSubmit = useCallback(async () => {
        // Kiểm tra xem mã nhập có đúng không
        let isError = false;
        const isVerificationCodeMatched = inputValues.verificationCode === randomString;

        if (!inputValues?.username) {
            toast.current.show({ severity: 'info', summary: 'Info', detail: 'Username is required !!' });
            isError = true;
        }

        if (!inputValues?.password) {
            toast.current.show({ severity: 'info', summary: 'Info', detail: 'Password is required !!' });
            isError = true;
        }

        if (!isVerificationCodeMatched) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Verification Code is not match !!',
            });
            isError = true;
        }

        if (!isError) {
            await authenticateUser(inputValues)
                .then(async (data) => {
                    if (!!data && data?.userInfo && data?.userToken) {
                        storeAllUserData(data);

                        if (data?.userRole === UserRoles.ADMIN) {
                            window.location.assign('/admin');
                        } else if (data?.userRole === UserRoles.LECTURER) {
                            window.location.assign('/homelecturer');
                        } else {
                            window.location.assign('/');
                        }
                    } else {
                        toast.current.show({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'User is not found !!',
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [inputValues, randomString]);

    return (
        <React.Fragment>
            <div className="w-full shadow-1 mb-4">
                <div className="flex w-full justify-content-center">
                    <div>
                        <img src={images.Logo} alt="school-logo" height={100}></img>
                    </div>
                    <div className="flex flex-column justify-content-center align-items-center">
                        <h2 className="m-0 mb-2 text-primary" style={{ fontWeight: 'bold' }}>
                            TRƯỜNG ĐẠI HỌC ĐỨC THUẬN TP. HỒ CHÍ MINH
                        </h2>
                        <h3 className="m-0 text-red-500" style={{ fontWeight: 'bold' }}>
                            CỔNG THÔNG TIN SINH VIÊN
                        </h3>
                    </div>
                </div>
            </div>
            <div className="grid col-12 justify-content-around align-items-center">
                <div className="col-6 p-0">
                    <img src={images.Login} alt="login-main" className="w-full" />
                </div>
                <div className="col-6 p-0 flex justify-content-center">
                    <div className="col-8 p-0 surface-50 p-2 border-round flex flex-column justify-content-start align-items-start ">
                        <div className="col-12 text-center">
                            <p
                                className="text-primary"
                                style={{
                                    fontWeight: 'bold',
                                }}
                            >
                                CỔNG THÔNG TIN SINH VIÊN
                            </p>
                            <p
                                className="text-cyan-700"
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '18px',
                                }}
                            >
                                ĐĂNG NHẬP HỆ THỐNG
                            </p>
                        </div>
                        <div className="col-12 mb-3">
                            <span className="p-float-label">
                                <InputText
                                    id="username"
                                    className=" w-full"
                                    value={inputValues.username}
                                    onChange={(e) => handleInputChange(e, 'username')}
                                />
                                <label htmlFor="username">Mã sinh viên</label>
                            </span>
                        </div>
                        <div className="col-12 mb-3">
                            <span className="p-float-label">
                                <Password
                                    inputId="password"
                                    pt={{ input: { className: 'w-full' } }}
                                    className=" w-full"
                                    value={inputValues.password}
                                    onChange={(e) => handleInputChange(e, 'password')}
                                />
                                <label htmlFor="password">Mật khẩu</label>
                            </span>
                        </div>
                        <div className="col-12 flex justify-content-between">
                            <div className="flex align-items-center w-full">
                                <InputText
                                    id="username"
                                    placeholder="Nhập mã"
                                    className=" w-full mr-2"
                                    value={inputValues.verificationCode}
                                    onChange={(e) => handleInputChange(e, 'verificationCode')}
                                />
                                <div className="mr-3">
                                    <Button
                                        icon="pi pi-refresh"
                                        onClick={() => {
                                            regenerateString();
                                        }}
                                    />
                                </div>
                                <div className="surface-100 px-3">
                                    <p
                                        className="text-primary"
                                        style={{
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {randomString}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <Button className="w-full" label="ĐĂNG NHẬP" icon="pi pi-send" onClick={handleOnSubmit} />
                        </div>
                    </div>
                </div>
            </div>
            <Toast ref={toast} />
        </React.Fragment>
    );
}

export default Login;
