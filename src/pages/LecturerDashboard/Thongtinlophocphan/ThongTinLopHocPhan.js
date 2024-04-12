/* eslint-disable react/jsx-pascal-case */
import { Button, ButtonGroup } from '@mui/material';
import styles from '~/pages/LecturerDashboard/Thongtinlophocphan/Thongtinlophocphan.module.scss';
import classNames from 'classnames/bind';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React from 'react';

const cx = classNames.bind(styles);

function Thongtinlophocphan() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const studentData = [
        { maSinhVien: '123456', ngaySinh: '12/02/2001', hoTen: 'Hoàng Đức', lop: 'DHKTPM15A' },
        { maSinhVien: '123457', ngaySinh: '13/02/2001', hoTen: 'Nguyễn Văn A', lop: 'DHKTPM15A' },
        // Thêm các sinh viên khác nếu cần
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div style={{ height: '10px', width: '100%' }}></div>
                <div className={cx('header')}>
                    <div style={{ marginLeft: '15px' }}>
                        <h2>THÔNG TIN LỚP HỌC PHẦN</h2>
                    </div>
                </div>
                <p style={{ textAlign: 'center' }}>
                    ___________________________________________________________________________________________________________________________________________________________________________________________________________
                </p>
                <div style={{ marginLeft: '770px', marginTop: '10px' }}>
                    <ButtonGroup style={{ width: '480px' }} variant="outlined" aria-label="Basic button group">
                        <Button>In ấn</Button>
                        <Button>Gửi tin nhắn đến SV của lớp</Button>
                        <Button>
                            <a href="quanlydiemquatrinhhoctap" style={{ textDecoration: 'none' }}>
                                Xử lý điểm quá trình học tập
                            </a>
                        </Button>
                        <Button>Danh sách lớp giảng dạy</Button>
                    </ButtonGroup>
                </div>
                <div style={{ marginLeft: '15px' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Thông tin về lớp học phần" value="1" />
                                <Tab label="Danh sách sinh viên" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <div style={{ borderStyle: 'ridge', backgroundColor: '#F8F8F8' }}>
                                <p style={{ fontWeight: 'bold', marginTop: '5px', marginLeft: '5px' }}>Lớp học phần</p>
                                <div style={{ display: 'flex', marginTop: '15px', marginLeft: '100px' }}>
                                    <p style={{ width: '160px' }}>Mã lớp học phần:</p>
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
                                    <p style={{ width: '160px' }}>Tên lớp học phần:</p>
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
                                    <p style={{ width: '160px' }}>Số tín chỉ:</p>
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
                                    <p style={{ width: '160px' }}>Giáo viên:</p>
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
                                <p style={{ fontWeight: 'bold', marginTop: '15px', marginLeft: '5px' }}>
                                    Thông tin lớp học phần
                                </p>
                                <div style={{ display: 'flex', marginTop: '15px', marginLeft: '100px' }}>
                                    <p style={{ width: '160px' }}>Ngày bắt đầu (dự kiến):</p>
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
                                    <p style={{ width: '160px' }}>Ngày kết thúc (dự kiến)</p>
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
                                <div style={{ height: '15px', width: '100%' }}></div>
                            </div>
                        </TabPanel>
                        <TabPanel value="2">
                            <div style={{ borderStyle: 'ridge', backgroundColor: '#F8F8F8' }}>
                                <div style={{ display: 'flex', marginTop: '10px', marginLeft: '100px' }}>
                                    <p style={{ width: '160px' }}>Tên lớp học phần:</p>
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
                                    <p style={{ width: '160px' }}>Giáo viên:</p>
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
                                <p style={{ fontWeight: 'bold', marginTop: '15px', marginLeft: '18px' }}>
                                    Danh sách sinh viên
                                </p>
                                <table style={{ marginLeft: '15px', marginTop: '10px' }} border="1" width={1160}>
                                    <thead>
                                        <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                                            <th style={{ height: '50px', width: '50px' }} rowspan="1">
                                                STT
                                            </th>
                                            <th style={{ width: '200px' }} rowspan="1">
                                                Mã số sinh viên
                                            </th>
                                            <th style={{ width: '200px' }} rowspan="1">
                                                Ngày sinh
                                            </th>
                                            <th style={{ width: '350px' }} rowspan="1">
                                                Họ và tên
                                            </th>
                                            <th style={{ width: '200px' }} rowspan="1">
                                                Lớp
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentData.map((student, index) => (
                                            <tr key={index}>
                                                <th style={{ height: '35px', width: '50px' }}>{index + 1}</th>
                                                <th style={{ width: '200px' }}>{student.maSinhVien}</th>
                                                <th style={{ width: '200px' }}>{student.ngaySinh}</th>
                                                <th style={{ width: '350px' }}>{student.hoTen}</th>
                                                <th style={{ width: '200px' }}>{student.lop}</th>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div style={{ height: '15px', width: '100%' }}></div>
                            </div>
                        </TabPanel>
                    </TabContext>
                </div>
                <div style={{ height: '10px', width: '100%' }}></div>
            </div>
        </div>
    );
}

export default Thongtinlophocphan;
