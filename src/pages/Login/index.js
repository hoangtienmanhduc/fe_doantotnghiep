import images from '~/assets/images';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { authenticateUser } from '~/components/authentication/AuthEndPoint';
import { storeAllUserData } from '~/components/authentication/AuthUtils';
const cx = classNames.bind(styles);

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
    const navigate = useNavigate();
    const [randomString, setRandomString] = useState(generateRandomString(4));
    const [isErrorVisible, setIsErrorVisible] = useState(false);
    const [isVerificationCodeMatched, setIsVerificationCodeMatched] = useState(true);
    const [inputValues, setInputValues] = useState({
        username: '',
        password: '',
        verificationCode: '',
    });

    const handleInputChange = (event, field) => {
        const value = event.target.value;
        setInputValues((prevValues) => ({ ...prevValues, [field]: value }));
        setIsVerificationCodeMatched(value === randomString);
    };

    const checkAllFieldsFilled = () => {
        const values = Object.values(inputValues);
        return values.every((value) => value.trim() !== '');
    };

    const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(true);

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

                        window.location.assign('/');
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
        <div className={cx('wrapper')}>
            <div
                style={{
                    height: '110px',
                    display: 'flex',
                    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)',
                    textAlign: 'center',
                    justifyContent: 'center',
                }}
            >
                <div className={cx('logo')}>
                    <img src={images.Logo} alt="Logo"></img>
                </div>
                <div style={{ marginTop: '35px', textAlign: 'center' }}>
                    <p style={{ fontWeight: 'bold', fontSize: '18px', color: 'blue' }}>
                        TRƯỜNG ĐẠI HỌC ĐỨC THUẬN TP. HỒ CHÍ MINH
                    </p>
                    <p style={{ fontWeight: 'bold', fontSize: '18px', color: 'red' }}>CỔNG THÔNG TIN SINH VIÊN</p>
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div className={cx('logo2')}>
                    <img src={images.Login} alt="Login"></img>
                </div>
                <div
                    style={{
                        width: '300px',
                        height: '550px',
                        marginTop: '20px',
                        marginLeft: '500px',
                        borderRadius: '10px',
                        backgroundColor: 'rgb(230, 230, 250)',
                        border: '5px solid rgb(255,255,255)',
                        boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.3)',
                        textAlign: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <p
                        style={{
                            width: '150px',
                            fontWeight: 'bold',
                            fontSize: '18px',
                            marginTop: '35px',
                            marginLeft: '70px',
                            color: 'blue',
                        }}
                    >
                        CỔNG THÔNG TIN SINH VIÊN
                    </p>
                    <p
                        style={{
                            fontWeight: 'bold',
                            fontSize: '18px',
                            marginTop: '25px',
                            color: '#FF4500',
                        }}
                    >
                        ĐĂNG NHẬP HỆ THỐNG
                    </p>
                    <div className={cx('search')}>
                        <input
                            placeholder="Nhập mã sinh viên"
                            spellCheck={false}
                            value={inputValues.username}
                            onChange={(e) => handleInputChange(e, 'username')}
                        />
                    </div>
                    <div className={cx('search')}>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu"
                            spellCheck={false}
                            value={inputValues.password}
                            onChange={(e) => handleInputChange(e, 'password')}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px' }}>
                        <div className={cx('searchma')}>
                            <input
                                placeholder="Nhập mã"
                                spellCheck={false}
                                value={inputValues.verificationCode}
                                onChange={(e) => handleInputChange(e, 'verificationCode')}
                            />
                        </div>
                        <div>
                            <button
                                style={{
                                    height: '15px',
                                    border: 'none',
                                    fontSize: '20px',
                                    marginTop: '5px',
                                    color: 'red',
                                }}
                                onClick={() => {
                                    regenerateString();
                                }}
                            >
                                <FontAwesomeIcon icon={faRepeat} />
                            </button>
                        </div>

                        <div
                            style={{
                                width: '80px',
                                height: '35px',
                                backgroundColor: 'white',
                                marginRight: '20px',
                            }}
                        >
                            <p
                                style={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: 'blue',
                                }}
                            >
                                {randomString}
                            </p>
                        </div>
                    </div>
                    <Button
                        login
                        onClick={() => {
                            setIsAllFieldsFilled(checkAllFieldsFilled());

                            // Nếu mã nhập đúng và tất cả các trường đều được điền, thực hiện chuyển hướng
                            // Thực hiện chuyển hướng
                            handleOnSubmit();

                            // Tự động ẩn thông báo sau 3 giây
                            setTimeout(() => {
                                setIsErrorVisible(false);
                            }, 1000);
                        }}
                    >
                        Đăng nhập
                    </Button>

                    {/* {!isAllFieldsFilled && isErrorVisible && !isVerificationCodeMatched && (
                        <p style={{ color: 'red', marginTop: '10px' }}>Vui lòng điền đầy đủ thông tin!</p>
                    )}

                    {!isVerificationCodeMatched && isErrorVisible && isAllFieldsFilled && (
                        <p style={{ color: 'red', marginTop: '10px' }}>Mã xác minh không đúng!</p>
                    )} */}
                </div>
            </div>
            <Toast ref={toast} />
        </div>
    );
}

export default Login;
