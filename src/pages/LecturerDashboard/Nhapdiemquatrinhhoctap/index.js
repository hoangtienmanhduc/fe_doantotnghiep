/* eslint-disable react/jsx-pascal-case */
import styles from '~/pages/LecturerDashboard/Nhapdiemquatrinhhoctap/Nhapdiemquatrinhhoctap.module.scss';
import classNames from 'classnames/bind';
import React, { useState } from 'react';

const cx = classNames.bind(styles);

function Nhapdiemquatrinhhoctap() {
    const [editableData, setEditableData] = useState({
        giuaKi: '',
        tk1: '',
        tk2: '',
        tk3: '',
        tk4: '',
        tk5: '',
        th1: '',
        th2: '',
        th3: '',
        th4: '',
        th5: '',
        ck: '',
        tongKet: '',
    });

    const handleInputChange = (e, columnName) => {
        const { value } = e.target;
        setEditableData((prevData) => ({
            ...prevData,
            [columnName]: value,
        }));
    };

    const saveScores = () => {
        // Thực hiện lưu điểm ở đây, ví dụ:
        console.log('Điểm đã nhập:', editableData);
        // Hoặc gửi điểm lên server, hoặc lưu vào local storage, hoặc thực hiện các xử lý khác tùy ý
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div style={{ height: '10px', width: '100%' }}></div>
                <div className={cx('header')}>
                    <div style={{ marginLeft: '15px' }}>
                        <h2>NHẬP ĐIỂM QUÁ TRÌNH HỌC TẬP</h2>
                    </div>
                </div>
                <p style={{ textAlign: 'center' }}>
                    ___________________________________________________________________________________________________________________________________________________________________________________________________________
                </p>
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
                    <div style={{ display: 'flex', marginLeft: '910px', marginTop: '10px' }}>
                        <button className={cx('button')} onClick={saveScores}>
                            Lưu điểm QTHT
                        </button>
                        <button style={{ backgroundColor: 'white' }} className={cx('button')}>
                            <a href="quanlydiemquatrinhhoctap" style={{ textDecoration: 'none' }}>
                                Kết thúc nhập điểm
                            </a>
                        </button>
                    </div>
                    <table style={{ marginTop: '20px' }} border="1" width={1230}>
                        <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                            <th style={{ height: '150px' }} rowspan="3">
                                STT
                            </th>
                            <th rowspan="3">Mã sinh viên</th>
                            <th rowspan="3">Họ và tên</th>
                            <th rowspan="3" style={{ width: '60px' }}>
                                Giữa kì
                            </th>
                            <th colspan="5" style={{ height: '50px' }}>
                                Thường kì
                            </th>
                            <th colspan="5">Thực hành</th>
                            <th rowspan="3" style={{ width: '60px' }}>
                                Cuối kỳ
                            </th>
                            <th rowspan="3" style={{ width: '60px' }}>
                                Điểm tổng kết
                            </th>
                        </tr>
                        <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                            <th colspan="5">LT Hệ số 1</th>
                            <th style={{ width: '60px' }} rowspan="2">
                                1
                            </th>
                            <th style={{ width: '60px' }} rowspan="2">
                                2
                            </th>
                            <th style={{ width: '60px' }} rowspan="2">
                                3
                            </th>
                            <th style={{ width: '60px' }} rowspan="2">
                                4
                            </th>
                            <th style={{ width: '60px' }} rowspan="2">
                                5
                            </th>
                        </tr>
                        <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                            <th style={{ width: '60px', height: '50px' }} rowspan="1">
                                1
                            </th>
                            <th style={{ width: '60px', height: '50px' }} rowspan="1">
                                2
                            </th>
                            <th style={{ width: '60px', height: '50px' }} rowspan="1">
                                3
                            </th>
                            <th style={{ width: '60px', height: '50px' }} rowspan="1">
                                4
                            </th>
                            <th style={{ width: '60px', height: '50px' }} rowspan="1">
                                5
                            </th>
                        </tr>
                        <tr>
                            <th style={{ height: '35px', width: '50px' }}>1</th>
                            <th style={{ width: '100px' }}>123456789</th>
                            <th style={{ width: '300px' }}>Hoàng Tiến Mạnh Đức</th>
                            <th style={{ width: '40px' }}>
                                <input
                                    style={{
                                        width: '60px',
                                        textAlign: 'center',
                                        height: '30px',
                                        border: 'none',
                                    }}
                                    type="text"
                                    value={editableData.giuaKi}
                                    onChange={(e) => handleInputChange(e, 'giuaKi')}
                                />
                            </th>
                            <th style={{ width: '40px' }}>
                                <input
                                    style={{
                                        width: '60px',
                                        textAlign: 'center',
                                        height: '30px',
                                        border: 'none',
                                    }}
                                    type="text"
                                    value={editableData.tk1}
                                    onChange={(e) => handleInputChange(e, 'tk1')}
                                />
                            </th>
                            <th style={{ width: '40px' }}>
                                <input
                                    style={{
                                        width: '60px',
                                        textAlign: 'center',
                                        height: '30px',
                                        border: 'none',
                                    }}
                                    type="text"
                                    value={editableData.tk2}
                                    onChange={(e) => handleInputChange(e, 'tk2')}
                                />
                            </th>
                            <th style={{ width: '40px' }}>
                                <input
                                    style={{
                                        width: '60px',
                                        textAlign: 'center',
                                        height: '30px',
                                        border: 'none',
                                    }}
                                    type="text"
                                    value={editableData.tk3}
                                    onChange={(e) => handleInputChange(e, 'tk3')}
                                />
                            </th>
                            <th style={{ width: '40px' }}>
                                <input
                                    style={{
                                        width: '60px',
                                        textAlign: 'center',
                                        height: '30px',
                                        border: 'none',
                                    }}
                                    type="text"
                                    value={editableData.tk4}
                                    onChange={(e) => handleInputChange(e, 'tk4')}
                                />
                            </th>
                            <th style={{ width: '40px' }}>
                                <input
                                    style={{
                                        width: '60px',
                                        textAlign: 'center',
                                        height: '30px',
                                        border: 'none',
                                    }}
                                    type="text"
                                    value={editableData.tk5}
                                    onChange={(e) => handleInputChange(e, 'tk5')}
                                />
                            </th>
                            <th style={{ width: '40px' }}>
                                <input
                                    style={{
                                        width: '60px',
                                        textAlign: 'center',
                                        height: '30px',
                                        border: 'none',
                                    }}
                                    type="text"
                                    value={editableData.th1}
                                    onChange={(e) => handleInputChange(e, 'th1')}
                                />
                            </th>
                            <th style={{ width: '40px' }}>
                                <input
                                    style={{
                                        width: '60px',
                                        textAlign: 'center',
                                        height: '30px',
                                        border: 'none',
                                    }}
                                    type="text"
                                    value={editableData.th2}
                                    onChange={(e) => handleInputChange(e, 'th2')}
                                />
                            </th>
                            <th style={{ width: '40px' }}>
                                <input
                                    style={{
                                        width: '60px',
                                        textAlign: 'center',
                                        height: '30px',
                                        border: 'none',
                                    }}
                                    type="text"
                                    value={editableData.th3}
                                    onChange={(e) => handleInputChange(e, 'th3')}
                                />
                            </th>
                            <th style={{ width: '40px' }}>
                                <input
                                    style={{
                                        width: '60px',
                                        textAlign: 'center',
                                        height: '30px',
                                        border: 'none',
                                    }}
                                    type="text"
                                    value={editableData.th4}
                                    onChange={(e) => handleInputChange(e, 'th4')}
                                />
                            </th>
                            <th style={{ width: '40px' }}>
                                <input
                                    style={{
                                        width: '60px',
                                        textAlign: 'center',
                                        height: '30px',
                                        border: 'none',
                                    }}
                                    type="text"
                                    value={editableData.th5}
                                    onChange={(e) => handleInputChange(e, 'th5')}
                                />
                            </th>
                            <th style={{ width: '40px' }}>
                                <input
                                    style={{
                                        width: '60px',
                                        textAlign: 'center',
                                        height: '30px',
                                        border: 'none',
                                    }}
                                    type="text"
                                    value={editableData.ck}
                                    onChange={(e) => handleInputChange(e, 'ck')}
                                />
                            </th>
                            <th style={{ width: '40px' }}>
                                <input
                                    style={{
                                        width: '60px',
                                        textAlign: 'center',
                                        height: '30px',
                                        border: 'none',
                                    }}
                                    type="text"
                                    value={editableData.tongKet}
                                    onChange={(e) => handleInputChange(e, 'tongKet')}
                                />
                            </th>
                        </tr>
                    </table>
                    <div style={{ height: '15px', width: '100%' }}></div>
                </div>
            </div>
        </div>
    );
}

export default Nhapdiemquatrinhhoctap;
