/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styles from './Chuongtrinhkhung.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Chuongtrinhkhung() {
    const [semesterVisibility, setSemesterVisibility] = useState({});

    const toggleDataVisibility = (semester) => {
        setSemesterVisibility((prevVisibility) => {
            const newVisibility = { ...prevVisibility };
            Object.keys(newVisibility).forEach((key) => {
                newVisibility[key] = key === semester ? !prevVisibility[key] : false;
            });
            return newVisibility;
        });
    };

    const data = [
        {
            semester: 'Học kì 1',
            sotcbb: 5,
            sotctc: 0,
            items: [
                {
                    stt: 1,
                    tenHP: 'Học phần bắt buộc 1',
                    maHP: '1234567890',
                    hocPhan: '',
                    soTC: '5',
                    soTietLT: 15,
                    soTietTH: 10,
                    nhom: 1,
                    soTCBBCN: 2,
                    dat: true,
                    type: 'compulsory',
                },
                // Add more compulsory courses as needed
            ],
        },
        {
            semester: 'Học kì 2',
            sotcbb: 3,
            sotctc: 0,
            items: [
                {
                    stt: 1,
                    tenHP: 'Học phần bắt buộc 2',
                    maHP: '9876543210',
                    hocPhan: '',
                    soTC: '3',
                    soTietLT: 10,
                    soTietTH: 5,
                    nhom: 0,
                    soTCBBCN: 0,
                    dat: true,
                    type: 'compulsory',
                },
                // Add more compulsory courses as needed
            ],
        },
        {
            semester: 'Học kì 3',
            sotcbb: 8,
            sotctc: 2,
            items: [
                {
                    stt: 1,
                    tenHP: 'Học phần tự chọn',
                    maHP: '1234567890',
                    hocPhan: '',
                    soTC: '5',
                    soTietLT: 15,
                    soTietTH: 10,
                    nhom: 1,
                    soTCBBCN: 2,
                    dat: true,
                    type: 'compulsory', // Added property to specify type
                },
                {
                    stt: 2,
                    tenHP: 'Môn học thêm',
                    maHP: '9876543210',
                    hocPhan: '',
                    soTC: '3',
                    soTietLT: 10,
                    soTietTH: 5,
                    nhom: 0,
                    soTCBBCN: 0,
                    dat: true,
                    type: 'optional',
                },
                // Add more optional courses as needed
            ],
        },

        // Add more semesters and data as needed
    ];

    useEffect(() => {
        const initialVisibility = {};
        data.forEach((semester) => {
            initialVisibility[semester.semester] = false;
        });
        setSemesterVisibility(initialVisibility);
    }, []);

    //tính tiền
    const totalCreditsRequired = data.reduce((total, semester) => total + semester.sotcbb + semester.sotctc, 0);
    const totalRequiredCredits = data.reduce((total, semester) => total + semester.sotcbb, 0);
    const totalElectiveCredits = data.reduce((total, semester) => total + semester.sotctc, 0);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div style={{ height: '1px', width: '100%' }}></div>
                <div
                    style={{
                        height: '35px',
                        width: '99%',
                        marginTop: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        textAlign: 'center',
                        alignItems: 'center',
                        marginLeft: '12px',
                    }}
                >
                    <h2>Chương trình khung</h2>
                </div>
                <p style={{ textAlign: 'center' }}>
                    ______________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
                </p>
                <div
                    style={{
                        marginLeft: '10px',
                        width: '100%',
                        marginTop: '10px',
                    }}
                >
                    <table border="1" className={cx('table table-bordered table-striped')} width={920}>
                        <tr style={{ backgroundColor: 'rgba(243, 247, 249, 0.27)', color: 'rgb(29, 161, 242)' }}>
                            <th style={{ width: '25px', height: '70px' }}>STT</th>
                            <th rowSpan="1">Tên môn học/Học phần</th>
                            <th rowSpan="1">Mã Học phần</th>
                            <th rowSpan="1">Học phần</th>
                            <th rowSpan="1">Số TC</th>
                            <th rowSpan="1">Số tiết LT</th>
                            <th rowSpan="1">Số tiết TH</th>
                            <th rowSpan="1">Nhóm tự chọn</th>
                            <th rowSpan="1">Số TC bắt buộc của nhóm</th>
                            <th style={{ width: '30px' }} rowSpan="1">
                                Đạt
                            </th>
                        </tr>
                        {data.map((semester, index) => (
                            <React.Fragment key={index}>
                                <tr
                                    style={{ backgroundColor: 'rgba(215, 237, 247, 0.15)', cursor: 'pointer' }}
                                    onClick={() => toggleDataVisibility(semester.semester)}
                                >
                                    <td style={{ fontWeight: 'bold', height: '30px', textAlign: 'center' }} colSpan="4">
                                        {semester.semester}
                                    </td>
                                    <td style={{ fontWeight: 'bold', height: '30px', textAlign: 'center' }} colSpan="1">
                                        {semester.sotcbb + semester.sotctc}
                                    </td>
                                    <td style={{ fontWeight: 'bold', height: '30px' }} colSpan="5"></td>
                                </tr>
                                {semesterVisibility[semester.semester] && (
                                    <>
                                        {semester.items.map((item, itemIndex) => (
                                            <React.Fragment key={itemIndex}>
                                                {item.type === 'compulsory' && (
                                                    <tr
                                                        style={{
                                                            backgroundColor: 'rgba(215, 237, 247, 0.15)',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        <td style={{ fontWeight: 'bold', height: '30px' }} colSpan="4">
                                                            Học phần bắt buộc
                                                        </td>
                                                        <td
                                                            style={{
                                                                fontWeight: 'bold',
                                                                height: '30px',
                                                                textAlign: 'center',
                                                            }}
                                                            colSpan="1"
                                                        >
                                                            {semester.sotcbb}
                                                        </td>
                                                        <td
                                                            style={{ fontWeight: 'bold', height: '30px' }}
                                                            colSpan="5"
                                                        ></td>
                                                    </tr>
                                                )}
                                                {item.type === 'optional' && (
                                                    <tr
                                                        style={{
                                                            backgroundColor: 'rgba(215, 237, 247, 0.15)',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        <td style={{ fontWeight: 'bold', height: '30px' }} colSpan="4">
                                                            Học phần tự chọn
                                                        </td>
                                                        <td
                                                            style={{
                                                                fontWeight: 'bold',
                                                                height: '30px',
                                                                textAlign: 'center',
                                                            }}
                                                            colSpan="1"
                                                        >
                                                            {semester.sotctc}
                                                        </td>
                                                        <td
                                                            style={{ fontWeight: 'bold', height: '30px' }}
                                                            colSpan="5"
                                                        ></td>
                                                    </tr>
                                                )}
                                                <tr key={itemIndex}>
                                                    <th style={{ fontWeight: 'normal' }}>{item.stt}</th>
                                                    <th style={{ fontWeight: 'normal' }}>{item.tenHP}</th>
                                                    <th style={{ fontWeight: 'normal' }}>{item.maHP}</th>
                                                    <th style={{ fontWeight: 'normal' }}>{item.hocPhan}</th>
                                                    <th style={{ fontWeight: 'normal' }}>{item.soTC}</th>
                                                    <th style={{ fontWeight: 'normal' }}>{item.soTietLT}</th>
                                                    <th style={{ fontWeight: 'normal' }}>{item.soTietTH}</th>
                                                    <th style={{ fontWeight: 'normal' }}>{item.nhom}</th>
                                                    <th style={{ fontWeight: 'normal' }}>{item.soTCBBCN}</th>
                                                    <th style={{ fontWeight: 'normal' }}>
                                                        {item.dat ? (
                                                            <FontAwesomeIcon
                                                                style={{ color: 'green', fontSize: '20px' }}
                                                                icon={faCircleCheck}
                                                            />
                                                        ) : (
                                                            <FontAwesomeIcon
                                                                style={{ color: 'red', fontSize: '20px' }}
                                                                icon={faCircleXmark}
                                                            />
                                                        )}
                                                    </th>
                                                </tr>
                                            </React.Fragment>
                                        ))}
                                    </>
                                )}
                            </React.Fragment>
                        ))}
                        <tr
                            style={{
                                backgroundColor: 'rgba(215, 237, 247, 0.15)',
                                cursor: 'pointer',
                            }}
                        >
                            <td style={{ fontWeight: 'bold', height: '30px' }} colSpan="4">
                                Số tín chỉ yêu cầu
                            </td>
                            <td
                                style={{
                                    fontWeight: 'bold',
                                    height: '30px',
                                    textAlign: 'center',
                                    color: 'red',
                                }}
                                colSpan="1"
                            >
                                {totalCreditsRequired}
                            </td>
                            <td style={{ fontWeight: 'bold', height: '30px' }} colSpan="5"></td>
                        </tr>
                        <tr
                            style={{
                                backgroundColor: 'rgba(215, 237, 247, 0.15)',
                                cursor: 'pointer',
                            }}
                        >
                            <td style={{ fontWeight: 'bold', height: '30px' }} colSpan="4">
                                Số tín chỉ bắt buộc
                            </td>
                            <td
                                style={{
                                    fontWeight: 'bold',
                                    height: '30px',
                                    textAlign: 'center',
                                    color: 'red',
                                }}
                                colSpan="1"
                            >
                                {totalRequiredCredits}
                            </td>
                            <td style={{ fontWeight: 'bold', height: '30px' }} colSpan="5"></td>
                        </tr>
                        <tr
                            style={{
                                backgroundColor: 'rgba(215, 237, 247, 0.15)',
                                cursor: 'pointer',
                            }}
                        >
                            <td style={{ fontWeight: 'bold', height: '30px' }} colSpan="4">
                                Số tín chỉ tự chọn
                            </td>
                            <td
                                style={{
                                    fontWeight: 'bold',
                                    height: '30px',
                                    textAlign: 'center',
                                    color: 'red',
                                }}
                                colSpan="1"
                            >
                                {totalElectiveCredits}
                            </td>
                            <td style={{ fontWeight: 'bold', height: '30px' }} colSpan="5"></td>
                        </tr>
                    </table>
                </div>
                <div style={{ height: '15px', width: '100%' }}></div>
            </div>
        </div>
    );
}

export default Chuongtrinhkhung;
