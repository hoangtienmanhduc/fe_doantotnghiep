/* eslint-disable react/jsx-pascal-case */
import { useEffect, useState } from 'react';
import styles from '~/pages/LecturerDashboard/Kehoachgiangday/Kehoachgiangday.module.scss';
import classNames from 'classnames/bind';
import Select from 'react-select';

const cx = classNames.bind(styles);

const options = [
    { value: 'option1', label: 'HK3 (2023-2024)' },
    { value: 'option2', label: 'HK2 (2023-2024)' },
    { value: 'option3', label: 'HK1 (2023-2024)' },
    // Thêm các option khác nếu cần
];

function Kehoachgiangday() {
    const [selectedOption, setSelectedOption] = useState(options[2]);
    const [shouldFetchData, setShouldFetchData] = useState(true); // Thêm state mới để kiểm tra xem có cần fetch dữ liệu hay không
    const [courseData, setCourseData] = useState([]);

    useEffect(() => {
        if (shouldFetchData) {
            fetchDataForOption(selectedOption);
            setShouldFetchData(false); // Đặt lại trạng thái sau khi đã fetch dữ liệu
        }
    }, [selectedOption, shouldFetchData]);

    const fetchDataForOption = (option) => {
        const data = {
            option1: [
                {
                    STT: 1,
                    MonHoc: 'Tin học đại cương - Nhóm 5',
                    ThoiKhoaBieu: 'Thứ 4 [5-7, A6.01]',
                    GiangVien: 'Hoàng Đức',
                    NgayBatDau: '12/05/2023',
                    SoSinhVien: 40,
                },
                {
                    STT: 1,
                    MonHoc: 'Tin học đại cương - Nhóm 5',
                    ThoiKhoaBieu: 'Thứ 4 [5-7, A6.01]',
                    GiangVien: 'Hoàng Đức',
                    NgayBatDau: '12/05/2023',
                    SoSinhVien: 40,
                },
                {
                    STT: 1,
                    MonHoc: 'Tin học đại cương - Nhóm 5',
                    ThoiKhoaBieu: 'Thứ 4 [5-7, A6.01]',
                    GiangVien: 'Hoàng Đức',
                    NgayBatDau: '12/05/2023',
                    SoSinhVien: 40,
                },
            ],
            option2: [
                {
                    STT: 1,
                    MonHoc: 'Tin học đại cương - Nhóm 5',
                    ThoiKhoaBieu: 'Thứ 4 [5-7, A6.01]',
                    GiangVien: 'Hoàng Đức',
                    NgayBatDau: '12/05/2023',
                    SoSinhVien: 40,
                },
                {
                    STT: 1,
                    MonHoc: 'Tin học đại cương - Nhóm 5',
                    ThoiKhoaBieu: 'Thứ 4 [5-7, A6.01]',
                    GiangVien: 'Hoàng Đức',
                    NgayBatDau: '12/05/2023',
                    SoSinhVien: 40,
                },
            ],
            option3: [
                {
                    STT: 1,
                    MonHoc: 'Tin học đại cương - Nhóm 5',
                    ThoiKhoaBieu: 'Thứ 4 [5-7, A6.01]',
                    GiangVien: 'Hoàng Đức',
                    NgayBatDau: '12/05/2023',
                    SoSinhVien: 40,
                },
            ],
        };
        const newData = data[option.value] || [];
        setCourseData(newData);
    };

    const handleShowSchedule = () => {
        fetchDataForOption(selectedOption);
    };

    // Render dữ liệu của option được chọn
    const renderCourseData = () => {
        return courseData.map((course, index) => (
            <tr key={index}>
                <th style={{ height: '50px', width: '50px' }} rowspan="1">
                    {course.STT}
                </th>
                <th style={{ width: '350px', color: '#00BFFF' }} rowspan="1">
                    <a href="thongtinlophocphan" style={{ textDecoration: 'none', color: '#00BFFF' }}>
                        {course.MonHoc}
                    </a>
                </th>
                <th style={{ width: '200px' }} rowspan="1">
                    {course.ThoiKhoaBieu}
                </th>
                <th style={{ width: '200px' }} rowspan="1">
                    {course.GiangVien}
                </th>
                <th style={{ width: '150px' }} rowspan="1">
                    {course.NgayBatDau}
                </th>
                <th style={{ width: '100px' }} rowspan="1">
                    {course.SoSinhVien}
                </th>
            </tr>
        ));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div style={{ height: '10px', width: '100%' }}></div>
                <div className={cx('header')}>
                    <div>
                        <h2>KẾ HOẠCH GIẢNG DẠY</h2>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ display: 'flex' }}></div>
                        <div style={{ width: '170px', height: '30px', marginLeft: '10px' }}>
                            <Select
                                defaultValue={selectedOption}
                                options={options}
                                isSearchable={true}
                                placeholder={selectedOption.label}
                                maxMenuHeight={250}
                                onChange={setSelectedOption}
                            />
                        </div>
                        <button className={cx('button')} onClick={handleShowSchedule}>
                            Xem lịch
                        </button>
                    </div>
                </div>
                <p style={{ textAlign: 'center' }}>
                    ___________________________________________________________________________________________________________________________________________________________________________________________________________
                </p>
                <div
                    style={{
                        marginLeft: '10px',
                        width: '100%',
                        marginTop: '5px',
                    }}
                >
                    <table border="1" width={1235}>
                        <thead>
                            <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                                <th style={{ height: '50px', width: '50px' }} rowspan="1">
                                    STT
                                </th>
                                <th style={{ width: '350px' }} rowspan="1">
                                    Lớp học phần
                                </th>
                                <th style={{ width: '200px' }} rowspan="1">
                                    Thời khóa biểu
                                </th>
                                <th style={{ width: '200px' }} rowspan="1">
                                    Giảng viên
                                </th>
                                <th style={{ width: '150px' }} colspan="1">
                                    Ngày bắt đầu
                                </th>
                                <th style={{ width: '100px' }} colspan="1">
                                    Số sinh viên
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Hiển thị dữ liệu của option được chọn */}
                            {renderCourseData()}
                        </tbody>
                    </table>
                </div>
                <div style={{ height: '10px', width: '100%' }}></div>
            </div>
        </div>
    );
}

export default Kehoachgiangday;
