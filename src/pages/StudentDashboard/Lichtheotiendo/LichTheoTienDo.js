import styles from './Lichtheotiendo.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Select from 'react-select';
import { Button } from 'primereact/button';

const cx = classNames.bind(styles);

const options = [
    { value: 'option1', label: 'HK3 (2023-2024)' },
    { value: 'option2', label: 'HK2 (2023-2024)' },
    { value: 'option3', label: 'HK1 (2023-2024)' },
    // Thêm các option khác nếu cần
];

const courses = [
    {
        id: 1,
        name: 'Tất cả',
    },
    {
        id: 2,
        name: 'Lịch học',
    },
    {
        id: 3,
        name: 'Lịch thi',
    },
];

function Lichtheotiendo() {
    const [selectedOption, setSelectedOption] = useState(options[2]);
    const [selectedCourse, setSelectedCourse] = useState(courses[0]);

    const courseData1 = {
        1: [
            {
                stt: 1,
                maLop: '4203003354',
                tenMonHoc: 'Giáo dục Quốc phòng và an ninh 2',
                soTinChi: 4,
                thu: 2,
                thoiGian: '1 - 5',
                loaiLich: 'Thực hành',
                phong: 'Sân nhà thiếu nhi (CV.25)',
                nhom: 9,
                batDau: '31/12/2019',
                ketThuc: '02/06/2020',
                maGiangVien: '01016001',
                tenGiangVien: 'ThS. Nguyễn Anh Hùng',
            },
            {
                stt: 2,
                maLop: '4203003354',
                tenMonHoc: 'Giáo dục Quốc phòng và an ninh 2',
                soTinChi: 4,
                thu: 2,
                thoiGian: '1 - 5',
                loaiLich: 'Lý thuyết',
                phong: 'Sân nhà thiếu nhi (CV.25)',
                nhom: 9,
                batDau: '31/12/2019',
                ketThuc: '02/06/2020',
                maGiangVien: '01016001',
                tenGiangVien: 'ThS. Nguyễn Anh Hùng',
            },
            {
                stt: 3,
                maLop: '4203005585',
                tenMonHoc: 'Kỹ thuật lập trình',
                soTinChi: 4,
                thu: 2,
                thoiGian: '1 - 5',
                loaiLich: 'Thi giữa kỳ',
                phong: 'H5.01',
                nhom: 2,
                batDau: '31/12/2019',
                ketThuc: '02/06/2020',
                maGiangVien: '01016001',
                tenGiangVien: 'ThS. Nguyễn Đức Anh',
            },
            {
                stt: 4,
                maLop: '4203005585',
                tenMonHoc: 'Kỹ thuật lập trình',
                soTinChi: 4,
                thu: 2,
                thoiGian: '1 - 5',
                loaiLich: 'Thi cuối kỳ',
                phong: 'H5.01',
                nhom: 2,
                batDau: '31/12/2019',
                ketThuc: '02/06/2020',
                maGiangVien: '01016001',
                tenGiangVien: 'ThS. Nguyễn Đức Anh',
            },
        ],
        2: [
            {
                stt: 1,
                maLop: '4203003354',
                tenMonHoc: 'Giáo dục Quốc phòng và an ninh 2',
                soTinChi: 4,
                thu: 2,
                thoiGian: '1 - 5',
                loaiLich: 'Thực hành',
                phong: 'Sân nhà thiếu nhi (CV.25)',
                nhom: 9,
                batDau: '31/12/2019',
                ketThuc: '02/06/2020',
                maGiangVien: '01016001',
                tenGiangVien: 'ThS. Nguyễn Anh Hùng',
            },
            {
                stt: 2,
                maLop: '4203003354',
                tenMonHoc: 'Giáo dục Quốc phòng và an ninh 2',
                soTinChi: 4,
                thu: 2,
                thoiGian: '1 - 5',
                loaiLich: 'Lý thuyết',
                phong: 'Sân nhà thiếu nhi (CV.25)',
                nhom: 9,
                batDau: '31/12/2019',
                ketThuc: '02/06/2020',
                maGiangVien: '01016001',
                tenGiangVien: 'ThS. Nguyễn Anh Hùng',
            },
        ],
        3: [
            {
                stt: 1,
                maLop: '4203005585',
                tenMonHoc: 'Kỹ thuật lập trình',
                soTinChi: 4,
                thu: 2,
                thoiGian: '1 - 5',
                loaiLich: 'Thi giữa kỳ',
                phong: 'H5.01',
                nhom: 2,
                batDau: '31/12/2019',
                ketThuc: '02/06/2020',
                maGiangVien: '01016001',
                tenGiangVien: 'ThS. Nguyễn Đức Anh',
            },
            {
                stt: 2,
                maLop: '4203005585',
                tenMonHoc: 'Kỹ thuật lập trình',
                soTinChi: 4,
                thu: 2,
                thoiGian: '1 - 5',
                loaiLich: 'Thi cuối kỳ',
                phong: 'H5.01',
                nhom: 2,
                batDau: '31/12/2019',
                ketThuc: '02/06/2020',
                maGiangVien: '01016001',
                tenGiangVien: 'ThS. Nguyễn Đức Anh',
            },
        ],
    };

    const courseData2 = {
        1: [
            {
                stt: 1,
                maLop: '4203003354',
                tenMonHoc: 'Giáo dục Quốc phòng và an ninh 2',
                soTinChi: 4,
                thu: 2,
                thoiGian: '1 - 5',
                loaiLich: 'Thực hành',
                phong: 'Sân nhà thiếu nhi (CV.25)',
                nhom: 9,
                batDau: '31/12/2019',
                ketThuc: '02/06/2020',
                maGiangVien: '01016001',
                tenGiangVien: 'ThS. Nguyễn Anh Hùng',
            },
            {
                stt: 2,
                maLop: '4203003354',
                tenMonHoc: 'Giáo dục Quốc phòng và an ninh 2',
                soTinChi: 4,
                thu: 2,
                thoiGian: '1 - 5',
                loaiLich: 'Lý thuyết',
                phong: 'Sân nhà thiếu nhi (CV.25)',
                nhom: 9,
                batDau: '31/12/2019',
                ketThuc: '02/06/2020',
                maGiangVien: '01016001',
                tenGiangVien: 'ThS. Nguyễn Anh Hùng',
            },
            {
                stt: 3,
                maLop: '4203005585',
                tenMonHoc: 'Kỹ thuật lập trình',
                soTinChi: 4,
                thu: 2,
                thoiGian: '1 - 5',
                loaiLich: 'Thi giữa kỳ',
                phong: 'H5.01',
                nhom: 2,
                batDau: '31/12/2019',
                ketThuc: '02/06/2020',
                maGiangVien: '01016001',
                tenGiangVien: 'ThS. Nguyễn Đức Anh',
            },
        ],
        2: [
            {
                stt: 1,
                maLop: '4203003354',
                tenMonHoc: 'Giáo dục Quốc phòng và an ninh 2',
                soTinChi: 4,
                thu: 2,
                thoiGian: '1 - 5',
                loaiLich: 'Thực hành',
                phong: 'Sân nhà thiếu nhi (CV.25)',
                nhom: 9,
                batDau: '31/12/2019',
                ketThuc: '02/06/2020',
                maGiangVien: '01016001',
                tenGiangVien: 'ThS. Nguyễn Anh Hùng',
            },
            {
                stt: 2,
                maLop: '4203003354',
                tenMonHoc: 'Giáo dục Quốc phòng và an ninh 2',
                soTinChi: 4,
                thu: 2,
                thoiGian: '1 - 5',
                loaiLich: 'Lý thuyết',
                phong: 'Sân nhà thiếu nhi (CV.25)',
                nhom: 9,
                batDau: '31/12/2019',
                ketThuc: '02/06/2020',
                maGiangVien: '01016001',
                tenGiangVien: 'ThS. Nguyễn Anh Hùng',
            },
        ],
        3: [
            {
                stt: 1,
                maLop: '4203005585',
                tenMonHoc: 'Kỹ thuật lập trình',
                soTinChi: 4,
                thu: 2,
                thoiGian: '1 - 5',
                loaiLich: 'Thi giữa kỳ',
                phong: 'H5.01',
                nhom: 2,
                batDau: '31/12/2019',
                ketThuc: '02/06/2020',
                maGiangVien: '01016001',
                tenGiangVien: 'ThS. Nguyễn Đức Anh',
            },
        ],
    };

    const [courseData, setCourseData] = useState(courseData1);

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const button = (selectedOption) => {
        switch (selectedOption.value) {
            case 'option1':
                setCourseData(courseData1);
                break;
            case 'option2':
                setCourseData(courseData2);
                break;
            default:
                setSelectedOption(selectedOption);
                setCourseData(courseData1);
                break;
        }
    };

    const selectedData = courseData[selectedCourse.id];
    return (
        <div>
            <div>
                <div className="flex justify-content-between">
                    <div className="flex justify-content-between align-items-center col-12">
                        <h2>Lịch học, lịch thi theo tiến độ</h2>
                        <div className="flex align-items-center">
                            <div className="flex align-items-center justify-content-between">
                                {courses.map((course) => (
                                    <div key={course.id} className="m-2">
                                        {courseData2[course.id] && (
                                            <input
                                                type="radio"
                                                checked={course === selectedCourse}
                                                onChange={() => {
                                                    setSelectedCourse(course);
                                                    button(selectedOption);
                                                }}
                                            />
                                        )}
                                        {course.name}
                                    </div>
                                ))}
                            </div>
                            <div className="mr-2">
                                <Select
                                    defaultValue={selectedOption} // Set the default value for the Select component
                                    onChange={handleChange}
                                    options={options || []}
                                    isSearchable={true}
                                    placeholder={selectedOption.label} // Use the label as a placeholder
                                />
                            </div>
                            <div className="flex align-items-center justfy-content-around">
                                <div className="my-2 mr-2">
                                    <Button label="Xem lịch" onClick={() => button(selectedOption)} />
                                </div>

                                <div className="my-2">
                                    <Button label="In lịch" onClick={() => button(selectedOption)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p style={{ textAlign: 'center' }}>
                    __________________________________________________________________________________________________________________________________________________________________________________________
                </p>
                <div
                    style={{
                        marginLeft: '10px',
                        width: '100%',
                        marginTop: '5px',
                    }}
                >
                    <table border="1" width={1130}>
                        <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                            <th style={{ height: '100px', width: '40px' }} rowSpan="2">
                                STT
                            </th>
                            <th style={{ width: '100px' }} rowSpan="2">
                                Mã lớp học phần
                            </th>
                            <th style={{ width: '200px' }} rowSpan="2">
                                Tên môn học/học phần
                            </th>
                            <th style={{ width: '35px' }} rowSpan="2">
                                Số tín chỉ
                            </th>
                            <th style={{ width: '250px' }} colSpan="6">
                                Thông tin lịch
                            </th>
                            <th style={{ width: '100px' }} colSpan="2">
                                Thời gian
                            </th>
                            <th style={{ width: '100px' }} rowSpan="2">
                                Mã giảng viên
                            </th>
                            <th style={{ width: '100px' }} rowSpan="2">
                                Giảng viên
                            </th>
                        </tr>
                        <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                            <th style={{ width: '40px' }} rowSpan="1">
                                Thứ
                            </th>
                            <th style={{ width: '60px' }} rowSpan="1">
                                Tiết
                            </th>
                            <th style={{ width: '70px' }} rowSpan="1">
                                Loại lịch
                            </th>
                            <th style={{ width: '70px' }} rowSpan="1">
                                Phòng
                            </th>
                            <th style={{ width: '50px' }} rowSpan="1">
                                Nhóm
                            </th>
                            <th style={{ width: '40px' }} rowSpan="1">
                                Giờ
                            </th>
                            <th style={{ width: '90px' }} rowSpan="1">
                                Bắt đầu
                            </th>
                            <th style={{ width: '90px' }} rowSpan="1">
                                Kết thúc
                            </th>
                        </tr>
                        {selectedData &&
                            selectedData.map((row, index) => (
                                <tr
                                    style={{
                                        backgroundColor:
                                            row.loaiLich === 'Thi giữa kỳ' || row.loaiLich === 'Thi cuối kỳ'
                                                ? 'yellow'
                                                : 'white',
                                    }}
                                    key={index}
                                >
                                    <th style={{ height: '50px' }}>{row.stt}</th>
                                    <th>{row.maLop}</th>
                                    <th>{row.tenMonHoc}</th>
                                    <th>{row.soTinChi}</th>
                                    <th>{row.thu}</th>
                                    <th>{row.thoiGian}</th>
                                    <th>{row.loaiLich}</th>
                                    <th>{row.phong}</th>
                                    <th>{row.nhom}</th>
                                    <th></th>
                                    <th>{row.batDau}</th>
                                    <th>{row.ketThuc}</th>
                                    <th>{row.maGiangVien}</th>
                                    <th>{row.tenGiangVien}</th>
                                </tr>
                            ))}
                    </table>
                </div>
                <div style={{ height: '10px', width: '100%' }}></div>
            </div>
        </div>
    );
}

export default Lichtheotiendo;
