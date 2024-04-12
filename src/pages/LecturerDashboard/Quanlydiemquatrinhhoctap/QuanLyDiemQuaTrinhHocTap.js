/* eslint-disable react/jsx-pascal-case */
import { Button, ButtonGroup } from '@mui/material';
import styles from '~/pages/LecturerDashboard/Quanlydiemquatrinhhoctap/Quanlydiemquatrinhhoctap.module.scss';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Quanlydiemquatrinhhoctap() {
    const navigate = useNavigate();
    const [showAdditionalDiv, setShowAdditionalDiv] = useState(false);
    const [randomString, setRandomString] = useState(generateRandomString(4));
    const [isErrorVisible, setIsErrorVisible] = useState(false);
    const [isVerificationCodeMatched, setIsVerificationCodeMatched] = useState(true);
    const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(true);

    const [inputValues, setInputValues] = useState({
        verificationCode: '',
    });

    useEffect(() => {
        regenerateString();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //Random mã
    function regenerateString() {
        setRandomString(generateRandomString(4));
    }

    const studentData = [
        {
            maSinhVien: '123456',
            hoTen: 'Hoàng Đức',
            giuaKi: '1',
            tk1: '2',
            tk2: '3',
            tk3: '4',
            tk4: '5',
            tk5: '6',
            th1: '7',
            th2: '8',
            th3: '9',
            th4: '10',
            th5: '1',
            ck: '2',
            tongKet: '3',
        },
        {
            maSinhVien: '123456',
            hoTen: 'Hoàng Đức',
            giuaKi: '1',
            tk1: '2',
            tk2: '3',
            tk3: '4',
            tk4: '5',
            tk5: '6',
            th1: '7',
            th2: '8',
            th3: '9',
            th4: '10',
            th5: '1',
            ck: '2',
            tongKet: '3',
        },
        // Thêm các sinh viên khác nếu cần
    ];

    const handleSubmit = () => {
        // Xử lý khi người dùng nhấn nút "Nộp điểm QTHT"
        setShowAdditionalDiv(true);
    };

    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomString = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }

        return randomString;
    }

    const handleInputChange = (event, field) => {
        const value = event.target.value;
        setInputValues((prevValues) => ({ ...prevValues, [field]: value }));
        setIsVerificationCodeMatched(value === randomString);
    };

    const checkAllFieldsFilled = () => {
        const values = Object.values(inputValues);
        return values.every((value) => value.trim() !== '');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div style={{ height: '10px', width: '100%' }}></div>
                <div className={cx('header')}>
                    <div style={{ marginLeft: '15px' }}>
                        <h2>QUẢN LÝ ĐIỂM QUÁ TRÌNH HỌC TẬP</h2>
                    </div>
                </div>
                <p style={{ textAlign: 'center' }}>
                    ___________________________________________________________________________________________________________________________________________________________________________________________________________
                </p>
                <div style={{ marginLeft: '750px', marginTop: '10px' }}>
                    <ButtonGroup style={{ width: '500px' }} variant="outlined" aria-label="Basic button group">
                        <Button>Quy định các tính điểm QTHT</Button>
                        <Button>
                            <a href="nhapdiemquatrinhhoctap" style={{ textDecoration: 'none' }}>
                                Nhập điểm QTHT
                            </a>
                        </Button>
                        <Button onClick={handleSubmit}>Nộp điểm QTHT</Button>
                        <Button>In bảng điểm QTHT</Button>
                        <Button>Quay lại</Button>
                    </ButtonGroup>
                </div>
                <div style={{ marginLeft: '15px' }}>
                    <div style={{ display: 'flex', marginTop: '15px', marginLeft: '100px' }}>
                        <p style={{ width: '180px' }}>Lớp học phần:</p>
                        <div
                            style={{
                                width: '830px',
                                height: '25px',
                                borderBottom: '1px dotted black',
                            }}
                        >
                            <p
                                style={{
                                    fontWeight: 'bold',
                                }}
                            >
                                123456789
                            </p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', marginTop: '10px', marginLeft: '100px' }}>
                        <p style={{ width: '180px' }}>Giảng viên:</p>
                        <div
                            style={{
                                width: '830px',
                                height: '25px',
                                borderBottom: '1px dotted black',
                            }}
                        >
                            <p
                                style={{
                                    fontWeight: 'bold',
                                }}
                            >
                                123456789
                            </p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', marginTop: '10px', marginLeft: '100px' }}>
                        <p style={{ width: '180px' }}>Công thức tính điểm QTHT:</p>
                        <div
                            style={{
                                width: '830px',
                                height: '25px',
                                borderBottom: '1px dotted black',
                            }}
                        >
                            <p
                                style={{
                                    fontWeight: 'bold',
                                }}
                            >
                                123456789
                            </p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', marginTop: '10px', marginLeft: '100px' }}>
                        <p style={{ width: '180px' }}>Cách tính điểm đánh giá:</p>
                        <div
                            style={{
                                width: '830px',
                                height: '25px',
                                borderBottom: '1px dotted black',
                            }}
                        >
                            <p
                                style={{
                                    fontWeight: 'bold',
                                }}
                            >
                                123456789
                            </p>
                        </div>
                    </div>
                    <p style={{ fontWeight: 'bold', marginTop: '15px' }}>Danh sách sinh viên</p>
                    <table style={{ marginTop: '10px' }} border="1" width={1230}>
                        <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                            <th style={{ height: '150px' }} rowspan="3">
                                STT
                            </th>
                            <th rowspan="3">Mã sinh viên</th>
                            <th rowspan="3">Họ và tên</th>
                            <th rowspan="3">Giữa kì</th>
                            <th colspan="5" style={{ height: '50px' }}>
                                Thường kì
                            </th>
                            <th colspan="5">Thực hành</th>
                            <th rowspan="3">Cuối kỳ</th>
                            <th rowspan="3">Điểm tổng kết</th>
                        </tr>
                        <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                            <th colspan="5">LT Hệ số 1</th>
                            <th style={{ width: '40px' }} rowspan="2">
                                1
                            </th>
                            <th style={{ width: '40px' }} rowspan="2">
                                2
                            </th>
                            <th style={{ width: '40px' }} rowspan="2">
                                3
                            </th>
                            <th style={{ width: '40px' }} rowspan="2">
                                4
                            </th>
                            <th style={{ width: '40px' }} rowspan="2">
                                5
                            </th>
                        </tr>
                        <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                            <th style={{ width: '40px', height: '50px' }} rowspan="1">
                                1
                            </th>
                            <th style={{ width: '40px', height: '50px' }} rowspan="1">
                                2
                            </th>
                            <th style={{ width: '40px', height: '50px' }} rowspan="1">
                                3
                            </th>
                            <th style={{ width: '40px', height: '50px' }} rowspan="1">
                                4
                            </th>
                            <th style={{ width: '40px', height: '50px' }} rowspan="1">
                                5
                            </th>
                        </tr>
                        <tbody>
                            {studentData.map((student, index) => (
                                <tr key={index}>
                                    <th style={{ height: '35px', width: '50px' }}>{index + 1}</th>
                                    <th style={{ width: '100px' }}>{student.maSinhVien}</th>
                                    <th style={{ width: '300px' }}>{student.hoTen}</th>
                                    <th style={{ width: '50px' }}>{student.giuaKi}</th>
                                    <th style={{ width: '40px' }}>{student.tk1}</th>
                                    <th style={{ width: '40px' }}>{student.tk2}</th>
                                    <th style={{ width: '40px' }}>{student.tk3}</th>
                                    <th style={{ width: '40px' }}>{student.tk4}</th>
                                    <th style={{ width: '40px' }}>{student.tk5}</th>
                                    <th style={{ width: '40px' }}>{student.th1}</th>
                                    <th style={{ width: '40px' }}>{student.th2}</th>
                                    <th style={{ width: '40px' }}>{student.th3}</th>
                                    <th style={{ width: '40px' }}>{student.th4}</th>
                                    <th style={{ width: '40px' }}>{student.th5}</th>
                                    <th style={{ width: '40px' }}>{student.ck}</th>
                                    <th style={{ width: '40px' }}>{student.tongKet}</th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {showAdditionalDiv && (
                        <div>
                            <div
                                style={{
                                    width: '1230px',
                                    height: '25px',
                                    borderBottom: '1px dotted black',
                                    marginTop: '20px',
                                }}
                            >
                                <p
                                    style={{
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Nộp điểm quá trình học tập
                                </p>
                            </div>
                            <p style={{ fontWeight: 'bold', marginTop: '20px' }}>Lưu ý:</p>
                            <div style={{ marginLeft: '35px', marginTop: '10px' }}>
                                <p>
                                    - Thầy/ cô vui lòng kiểm tra kỹ bảng điểm và chắc chắn đã hoàn tất việc nhập điểm
                                    trước khi tiến hành nộp điểm;
                                </p>
                                <p>
                                    - Sau khi nộp điểm, chức năng xử lý điểm quá trình học tập đối với lớp học phần sẽ
                                    bị khóa
                                </p>
                                <p>
                                    - Thầy/ cô sẽ không thể thay đổi chính sách tính điểm và các cột điểm sau khi nộp
                                    điểm;
                                </p>
                            </div>
                            <div style={{ marginLeft: '35px', marginTop: '10px', display: 'flex' }}>
                                <p style={{ fontWeight: 'bold' }}>Mã xác nhận:</p>
                                <div style={{ justifyContent: 'space-between' }}>
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
                                                height: '30px',
                                                border: 'none',
                                                fontSize: '20px',
                                                marginTop: '5px',
                                                color: 'red',
                                                marginLeft: '20px',
                                                width: '150px',
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
                                            width: '150px',
                                            height: '35px',
                                            backgroundColor: 'red',
                                            marginLeft: '20px',
                                            textAlign: 'center',
                                            marginTop: '5px',
                                        }}
                                    >
                                        <p
                                            style={{
                                                fontSize: '18px',
                                                fontWeight: 'bold',
                                                color: 'blue',
                                                textAlign: 'center',
                                            }}
                                        >
                                            {randomString}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginLeft: '135px', marginTop: '10px' }}>
                                <Button
                                    style={{
                                        width: '150px',
                                        height: '30px',
                                        backgroundColor: '#00BFFF',
                                        color: 'white',
                                    }}
                                    login
                                    onClick={() => {
                                        setIsAllFieldsFilled(checkAllFieldsFilled());

                                        // Kiểm tra xem mã nhập có đúng không
                                        const isVerificationCodeMatched = inputValues.verificationCode === randomString;
                                        setIsVerificationCodeMatched(isVerificationCodeMatched);

                                        // Hiển thị thông báo lỗi
                                        setIsErrorVisible(true);

                                        // Nếu mã nhập đúng và tất cả các trường đều được điền, thực hiện chuyển hướng
                                        if (isVerificationCodeMatched && checkAllFieldsFilled()) {
                                            // Thực hiện chuyển hướng
                                            navigate('/');
                                        }

                                        // Tự động ẩn thông báo sau 3 giây
                                        setTimeout(() => {
                                            setIsErrorVisible(false);
                                        }, 1000);
                                    }}
                                >
                                    Nhập điểm quá trình học tập
                                </Button>
                                {!isAllFieldsFilled && isErrorVisible && !isVerificationCodeMatched && (
                                    <p style={{ color: 'red', marginTop: '10px' }}>Vui lòng điền đầy đủ thông tin!</p>
                                )}

                                {!isVerificationCodeMatched && isErrorVisible && isAllFieldsFilled && (
                                    <p style={{ color: 'red', marginTop: '10px' }}>Mã xác minh không đúng!</p>
                                )}
                            </div>
                        </div>
                    )}
                    <div style={{ height: '15px', width: '100%' }}></div>
                </div>
            </div>
        </div>
    );
}

export default Quanlydiemquatrinhhoctap;
