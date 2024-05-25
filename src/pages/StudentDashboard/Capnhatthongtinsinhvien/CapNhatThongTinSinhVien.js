import styles from './Capnhatthongtinsinhvien.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import Select from 'react-select';
import { format } from 'date-fns';
import ReactDatePicker from 'react-datepicker';

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
        name: 'Nam',
    },
    {
        id: 2,
        name: 'Nữ',
    },
];

function Capnhatthongtinsinhvien() {
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
        // Thêm các loại khác nếu cần
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
        // Thêm các loại khác nếu cần
    };

    // eslint-disable-next-line no-unused-vars
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
            // Thêm các trường hợp khác nếu cần
            default:
                setSelectedOption(selectedOption);
                setCourseData(courseData1);
                break;
        }
    };

    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const currentDateFormatted = format(selectedDate, 'dd/MM/yyyy');

    const CustomDatePickerInput = ({ value, onClick }) => (
        <div className={cx('custom-date-picker-input')} onClick={onClick}>
            <input
                type="text"
                value={value || currentDateFormatted}
                readOnly
                placeholder="Chọn ngày"
                className={cx('date-input')}
                style={{ height: '38px', width: '260px' }}
            />
            <span className={cx('calendar-icon')} role="img" aria-label="calendar">
                📅
            </span>
        </div>
    );

    const customStyles = {
        // Thiết lập chiều dài và chiều rộng tại đây
        control: (provided, state) => ({
            ...provided,
            width: 260,
        }),
        menu: (provided, state) => ({
            ...provided,
            width: 260, // Đặt chiều rộng của dropdown menu theo ý muốn
        }),
    };

    const customStyles2 = {
        // Thiết lập chiều dài và chiều rộng tại đây
        control: (provided, state) => ({
            ...provided,
            width: 537,
        }),
        menu: (provided, state) => ({
            ...provided,
            width: 537, // Đặt chiều rộng của dropdown menu theo ý muốn
        }),
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div style={{ height: '10px', width: '100%' }}></div>
                <div className={cx('header')}>
                    <div>
                        <h2>Lịch học, lịch thi theo tiến độ</h2>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <button className={cx('button')}>Lưu</button>
                    </div>
                </div>
                <p style={{ textAlign: 'center' }}>
                    __________________________________________________________________________________________________________________________________________________________________________________________
                </p>
                <div
                    style={{
                        display: 'flex',
                        width: '95%',
                        marginLeft: '28px',
                        justifyContent: 'space-between',
                        marginTop: '15px',
                    }}
                >
                    <div>
                        <p>Ngày sinh(*)</p>
                        <ReactDatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            customInput={<CustomDatePickerInput />}
                        />
                    </div>
                    <div>
                        <p>Dân tộc</p>
                        <Select
                            defaultValue={selectedOption} // Set the default value for the Select component
                            onChange={handleChange}
                            options={options || []}
                            isSearchable={true}
                            placeholder={selectedOption.label} // Use the label as a placeholder
                            maxMenuHeight={250}
                            styles={customStyles}
                        />
                    </div>
                    <div>
                        <p>Tôn giáo</p>
                        <Select
                            defaultValue={selectedOption} // Set the default value for the Select component
                            onChange={handleChange}
                            options={options || []}
                            isSearchable={true}
                            placeholder={selectedOption.label} // Use the label as a placeholder
                            maxMenuHeight={250}
                            styles={customStyles}
                        />
                    </div>
                    <div style={{ marginRight: '165px' }}>
                        <p>Giới tính</p>
                        <div style={{ display: 'flex' }}>
                            {courses.map((course) => (
                                <div key={course.id}>
                                    {courseData2[course.id] && (
                                        <input
                                            style={{ marginLeft: '10px', marginTop: '8px' }}
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
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        width: '95%',
                        marginLeft: '28px',
                        justifyContent: 'space-between',
                        marginTop: '20px',
                    }}
                >
                    <div>
                        <p>Quốc tịch(*)</p>
                        <Select
                            defaultValue={selectedOption} // Set the default value for the Select component
                            onChange={handleChange}
                            options={options || []}
                            isSearchable={true}
                            placeholder={selectedOption.label} // Use the label as a placeholder
                            maxMenuHeight={250}
                            styles={customStyles}
                        />
                    </div>
                    <div>
                        <p>Số CCCD(*)</p>
                        <div className={cx('search')}>
                            <input placeholder="Nhập mã sinh viên" spellCheck={false} />
                        </div>
                    </div>
                    <div>
                        <p>Ngày cấp(*)</p>
                        <ReactDatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            customInput={<CustomDatePickerInput />}
                        />
                    </div>
                    <div>
                        <p>Nơi cấp(*)</p>
                        <Select
                            defaultValue={selectedOption} // Set the default value for the Select component
                            onChange={handleChange}
                            options={options || []}
                            isSearchable={true}
                            placeholder={selectedOption.label} // Use the label as a placeholder
                            maxMenuHeight={250}
                            styles={customStyles}
                        />
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        width: '95%',
                        marginLeft: '28px',
                        justifyContent: 'space-between',
                        marginTop: '20px',
                    }}
                >
                    <div>
                        <p>Số điện thoại(*)</p>
                        <div className={cx('search')}>
                            <input placeholder="Nhập mã sinh viên" spellCheck={false} />
                        </div>
                    </div>
                    <div>
                        <p>Địa chỉ Email (*)</p>
                        <div className={cx('search')}>
                            <input placeholder="Nhập mã sinh viên" spellCheck={false} />
                        </div>
                    </div>
                    <div>
                        <p>Ngày vào Đoàn</p>
                        <ReactDatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            customInput={<CustomDatePickerInput />}
                        />
                    </div>
                    <div>
                        <p>Ngày vào Đảng</p>
                        <ReactDatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            customInput={<CustomDatePickerInput />}
                        />
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        width: '95%',
                        marginLeft: '28px',
                        justifyContent: 'space-between',
                        marginTop: '20px',
                    }}
                >
                    <p>Quê quán</p>
                </div>
                <div
                    style={{
                        display: 'flex',
                        width: '95%',
                        marginLeft: '28px',
                        justifyContent: 'space-between',
                        marginTop: '20px',
                    }}
                >
                    <div>
                        <p>Tỉnh/ Thành phố(*)</p>
                        <Select
                            defaultValue={selectedOption} // Set the default value for the Select component
                            onChange={handleChange}
                            options={options || []}
                            isSearchable={true}
                            placeholder={selectedOption.label} // Use the label as a placeholder
                            maxMenuHeight={250}
                            styles={customStyles}
                        />
                    </div>
                    <div>
                        <p>Huyện/ Quận(*)</p>
                        <Select
                            defaultValue={selectedOption} // Set the default value for the Select component
                            onChange={handleChange}
                            options={options || []}
                            isSearchable={true}
                            placeholder={selectedOption.label} // Use the label as a placeholder
                            maxMenuHeight={250}
                            styles={customStyles}
                        />
                    </div>
                    <div>
                        <p>Xã/ Phường(*)</p>
                        <Select
                            defaultValue={selectedOption} // Set the default value for the Select component
                            onChange={handleChange}
                            options={options || []}
                            isSearchable={true}
                            placeholder={selectedOption.label} // Use the label as a placeholder
                            maxMenuHeight={250}
                            styles={customStyles2}
                        />
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        width: '95%',
                        marginLeft: '28px',
                        justifyContent: 'space-between',
                        marginTop: '20px',
                    }}
                >
                    <p>Nơi sinh</p>
                </div>
                <div
                    style={{
                        display: 'flex',
                        width: '95%',
                        marginLeft: '28px',
                        justifyContent: 'space-between',
                        marginTop: '20px',
                    }}
                >
                    <div>
                        <p>Tỉnh/ Thành phố(*)</p>
                        <Select
                            defaultValue={selectedOption} // Set the default value for the Select component
                            onChange={handleChange}
                            options={options || []}
                            isSearchable={true}
                            placeholder={selectedOption.label} // Use the label as a placeholder
                            maxMenuHeight={250}
                            styles={customStyles}
                        />
                    </div>
                    <div>
                        <p>Huyện/ Quận(*)</p>
                        <Select
                            defaultValue={selectedOption} // Set the default value for the Select component
                            onChange={handleChange}
                            options={options || []}
                            isSearchable={true}
                            placeholder={selectedOption.label} // Use the label as a placeholder
                            maxMenuHeight={250}
                            styles={customStyles}
                        />
                    </div>
                    <div>
                        <p>Xã/ Phường(*)</p>
                        <Select
                            defaultValue={selectedOption} // Set the default value for the Select component
                            onChange={handleChange}
                            options={options || []}
                            isSearchable={true}
                            placeholder={selectedOption.label} // Use the label as a placeholder
                            maxMenuHeight={250}
                            styles={customStyles2}
                        />
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        width: '95%',
                        marginLeft: '28px',
                        justifyContent: 'space-between',
                        marginTop: '20px',
                    }}
                >
                    <p>Nơi cấp giấy khai sinh</p>
                </div>
                <div
                    style={{
                        display: 'flex',
                        width: '95%',
                        marginLeft: '28px',
                        justifyContent: 'space-between',
                        marginTop: '20px',
                    }}
                >
                    <div>
                        <p>Tỉnh/ Thành phố (*)</p>
                        <Select
                            defaultValue={selectedOption} // Set the default value for the Select component
                            onChange={handleChange}
                            options={options || []}
                            isSearchable={true}
                            placeholder={selectedOption.label} // Use the label as a placeholder
                            maxMenuHeight={250}
                            styles={customStyles}
                        />
                    </div>
                    <div>
                        <p>Huyện/ Quận (*)</p>
                        <Select
                            defaultValue={selectedOption} // Set the default value for the Select component
                            onChange={handleChange}
                            options={options || []}
                            isSearchable={true}
                            placeholder={selectedOption.label} // Use the label as a placeholder
                            maxMenuHeight={250}
                            styles={customStyles}
                        />
                    </div>
                    <div>
                        <p>Xã/ Phường (*)</p>
                        <Select
                            defaultValue={selectedOption} // Set the default value for the Select component
                            onChange={handleChange}
                            options={options || []}
                            isSearchable={true}
                            placeholder={selectedOption.label} // Use the label as a placeholder
                            maxMenuHeight={250}
                            styles={customStyles2}
                        />
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        width: '95%',
                        marginLeft: '28px',
                        justifyContent: 'space-between',
                        marginTop: '20px',
                    }}
                >
                    <p>Nơi đăng ký hộ khẩu thường trú</p>
                </div>
                <div
                    style={{
                        display: 'flex',
                        width: '95%',
                        marginLeft: '28px',
                        justifyContent: 'space-between',
                        marginTop: '20px',
                    }}
                >
                    <div>
                        <p>Tỉnh/ Thành phố(*)</p>
                        <Select
                            defaultValue={selectedOption} // Set the default value for the Select component
                            onChange={handleChange}
                            options={options || []}
                            isSearchable={true}
                            placeholder={selectedOption.label} // Use the label as a placeholder
                            maxMenuHeight={250}
                            styles={customStyles}
                        />
                    </div>
                    <div>
                        <p>Huyện/ Quận(*)</p>
                        <Select
                            defaultValue={selectedOption} // Set the default value for the Select component
                            onChange={handleChange}
                            options={options || []}
                            isSearchable={true}
                            placeholder={selectedOption.label} // Use the label as a placeholder
                            maxMenuHeight={250}
                            styles={customStyles}
                        />
                    </div>
                    <div>
                        <p>Xã/ Phường(*)</p>
                        <Select
                            defaultValue={selectedOption} // Set the default value for the Select component
                            onChange={handleChange}
                            options={options || []}
                            isSearchable={true}
                            placeholder={selectedOption.label} // Use the label as a placeholder
                            maxMenuHeight={250}
                            styles={customStyles}
                        />
                    </div>
                    <div>
                        <p>Số nhà, đường, thôn xóm, ...</p>
                        <div className={cx('search')}>
                            <input placeholder="Nhập mã sinh viên" spellCheck={false} />
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        width: '95%',
                        marginLeft: '28px',
                        justifyContent: 'space-between',
                        marginTop: '20px',
                    }}
                >
                    <p>Địa chỉ tạm trú (nếu có)</p>
                </div>
                <div
                    style={{
                        display: 'flex',
                        width: '95%',
                        marginLeft: '28px',
                        justifyContent: 'space-between',
                        marginTop: '20px',
                    }}
                >
                    <div>
                        <p>Tỉnh/ Thành phố</p>
                        <Select
                            defaultValue={selectedOption} // Set the default value for the Select component
                            onChange={handleChange}
                            options={options || []}
                            isSearchable={true}
                            placeholder={selectedOption.label} // Use the label as a placeholder
                            maxMenuHeight={250}
                            styles={customStyles}
                        />
                    </div>
                    <div>
                        <p>Huyện/ Quận</p>
                        <Select
                            defaultValue={selectedOption} // Set the default value for the Select component
                            onChange={handleChange}
                            options={options || []}
                            isSearchable={true}
                            placeholder={selectedOption.label} // Use the label as a placeholder
                            maxMenuHeight={250}
                            styles={customStyles}
                        />
                    </div>
                    <div>
                        <p>Xã/ Phường</p>
                        <Select
                            defaultValue={selectedOption} // Set the default value for the Select component
                            onChange={handleChange}
                            options={options || []}
                            isSearchable={true}
                            placeholder={selectedOption.label} // Use the label as a placeholder
                            maxMenuHeight={250}
                            styles={customStyles}
                        />
                    </div>
                    <div>
                        <p>Số nhà, đường, thôn xóm, ...</p>
                        <div className={cx('search')}>
                            <input placeholder="Nhập mã sinh viên" spellCheck={false} />
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        width: '95%',
                        marginLeft: '28px',
                        justifyContent: 'space-between',
                        marginTop: '20px',
                    }}
                >
                    <div>
                        <p>Mã số thẻ BHYT</p>
                        <div className={cx('search2')}>
                            <input placeholder="Nhập mã sinh viên" spellCheck={false} />
                        </div>
                    </div>
                    <div>
                        <p>Nơi đăng ký KCB (mới) - Bệnh viện</p>
                        <Select
                            defaultValue={selectedOption} // Set the default value for the Select component
                            onChange={handleChange}
                            options={options || []}
                            isSearchable={true}
                            placeholder={selectedOption.label} // Use the label as a placeholder
                            maxMenuHeight={250}
                            styles={customStyles2}
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <button className={cx('button')}>Lưu</button>
                </div>

                <div style={{ height: '10px', width: '100%' }}></div>
            </div>
        </div>
    );
}

export default Capnhatthongtinsinhvien;
