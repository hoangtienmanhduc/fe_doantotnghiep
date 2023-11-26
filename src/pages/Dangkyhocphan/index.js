import styles from './Dangkyhocphan.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Select from 'react-select';

const cx = classNames.bind(styles);

const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' },
    { value: 'option6', label: 'Option 6' },
    { value: 'option7', label: 'Option 7' },
    { value: 'option8', label: 'Option 8' },
    { value: 'option9', label: 'Option 9' },
    // Thêm các option khác nếu cần
];

const courses = [
    {
        id: 1,
        name: 'HỌC MỚI',
    },
    {
        id: 2,
        name: 'HỌC LẠI',
    },
    {
        id: 3,
        name: 'HỌC CẢI THIỆN',
    },
];

const trunglichs = [
    {
        id: 1,
        name: 'HIỂN THỊ LỚP HỌC PHẦN KHÔNG TRÙNG LỊCH',
    },
];

function Dangkyhocphan() {
    const [selectedOption, setSelectedOption] = useState(options);
    const [selectedCourse, setSelectedCourse] = useState(courses[0]);
    const [selectedUpperTableRow, setSelectedUpperTableRow] = useState(null);
    const [selectedLowerTableRow, setSelectedLowerTableRow] = useState(null);

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);

        const selectedCourseId = selectedOption.value;
        const matchingCourse = courses.find((course) => course.id === selectedCourseId);

        if (matchingCourse) {
            setSelectedCourse(matchingCourse);
        }

        // Additional logic if needed
    };

    const handleCourseChange = (course) => {
        setSelectedCourse(course);
    };

    const handleUpperTableSelect = (row) => {
        setSelectedUpperTableRow(row);
    };

    const handleLowerTableSelect = (row) => {
        setSelectedLowerTableRow(row);
    };

    const getTableData = () => {
        switch (selectedCourse.id) {
            case 1:
                return [
                    {
                        id: 1,
                        stt: 1,
                        maMhCu: '21065',
                        maHp: '65613456',
                        tenMonHoc: 'Hội hoạ',
                        tinChi: 3,
                        batBuoc: true,
                        hocPhan: '03251 (a)',
                        hocPhanTuongDuong: '',
                    },
                ];
            case 2:
                return [
                    {
                        id: 1,
                        stt: 1,
                        maMhCu: '21065',
                        maHp: '65613456',
                        tenMonHoc: 'Hội hoạ',
                        tinChi: 3,
                        batBuoc: true,
                        hocPhan: '03251 (a)',
                        hocPhanTuongDuong: '',
                    },
                    {
                        id: 2,
                        stt: 2,
                        maMhCu: '54513153',
                        maHp: '3213534',
                        tenMonHoc: 'Ca hát',
                        tinChi: 3,
                        batBuoc: true,
                        hocPhan: '03251 (a)',
                        hocPhanTuongDuong: '',
                    },
                ];
            case 3:
                return [
                    {
                        id: 1,
                        stt: 1,
                        maMhCu: '5468422',
                        maHp: '5662',
                        tenMonHoc: 'Đức',
                        tinChi: 3,
                        batBuoc: true,
                        hocPhan: '03251 (a)',
                        hocPhanTuongDuong: '',
                    },
                ];
            default:
                return [];
        }
    };

    const getLowerTableData = () => {
        if (selectedUpperTableRow) {
            // Use the extracted information to generate lower table data
            return [
                {
                    id: 1,
                    stt: 1,
                    maLHP: '68416446',
                    tenLopHP: 'Cucu',
                    lopDuKien: 'GOFJGO15A',
                    siSoToiDa: 80,
                    daDangKi: 0,
                    trangThai: 'Đang lên kế hoạch',
                },
                {
                    id: 2,
                    stt: 2,
                    maLHP: '6513156',
                    tenLopHP: 'Kaka',
                    lopDuKien: 'AFGIUF15A',
                    siSoToiDa: 80,
                    daDangKi: 0,
                    trangThai: 'Đang lên kế hoạch',
                },
                // Add other rows as needed
            ];
        }
        // Default data when no row is selected
        return [];
    };

    const getScheduleData = () => {
        if (selectedLowerTableRow) {
            return [
                {
                    id: 1,
                    stt: 1,
                    lichHoc: 'LT - Thứ 5 (T4-T6)',
                    nhomTH: '1',
                    phong: 'A3.02',
                    dayNha: 'A (CS1)',
                    coSo: 'Cơ sở 1 (Thành phố Hồ Chí Minh)',
                    giangVien: 'PGS Phan Thị Tố Oanh',
                    thoiGian: '10/05/2005 - 16/11/2023',
                },
                {
                    id: 1,
                    stt: 1,
                    lichHoc: 'LT - Thứ 5 (T4-T6)',
                    nhomTH: '2',
                    phong: 'A3.02',
                    dayNha: 'A (CS1)',
                    coSo: 'Cơ sở 1 (Thành phố Hồ Chí Minh)',
                    giangVien: 'PGS Phan Thị Tố Oanh',
                    thoiGian: '10/05/2005 - 16/11/2023',
                },
            ];
        }
        // Default data when no row is selected
        return [];
    };

    return (
        <div className={cx('wrapper')}>
            <div style={{}}>
                <div
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        marginTop: '15px',
                    }}
                >
                    <h1 style={{ color: '#006994' }}>ĐĂNG KÝ HỌC PHẦN</h1>
                </div>
                <div
                    style={{
                        width: '80%',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: '180px',
                        marginTop: '15px',
                    }}
                >
                    <p style={{ fontSize: '15px', fontWeight: 'bold', marginRight: '25px' }}>Đợt đăng kí</p>
                    <div style={{ width: '180px' }}>
                        <Select
                            defaultValue={selectedOption[0]} // Sử dụng defaultValue để đặt giá trị mặc định
                            onChange={handleChange}
                            options={options}
                            isSearchable={true}
                            placeholder="Chọn một option..."
                            maxMenuHeight={250}
                        />
                    </div>
                    <div style={{ display: 'flex' }}>
                        {courses.map((course) => (
                            <div style={{ color: 'red', fontSize: '15px', fontWeight: 'bold' }} key={course.id}>
                                <input
                                    style={{ marginLeft: '15px', marginTop: '8px' }}
                                    type="radio"
                                    checked={selectedCourse.id === course.id}
                                    onChange={() => handleCourseChange(course)}
                                />
                                {course.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        marginTop: '25px',
                    }}
                >
                    <p style={{ fontSize: '17px', fontWeight: 'bold', color: '#FF8C00' }}>
                        MÔN HỌC PHẦN ĐANG CHỜ ĐĂNG KÍ
                    </p>
                </div>
                <div style={{ width: '98%', marginLeft: '12px', marginTop: '25px' }}>
                    <table border="1" width={1125}>
                        <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                            <th style={{ height: '50px', width: '35px' }} rowspan="1"></th>
                            <th rowspan="1">STT</th>
                            <th rowspan="1">Mã MH cũ</th>
                            <th rowspan="1">Mã HP</th>
                            <th rowspan="1">Tên môn học</th>
                            <th rowspan="1">TC</th>
                            <th rowspan="1">Bắt buộc</th>
                            <th style={{ width: '200px' }} rowspan="1">
                                Học phần: học trước (a), tiên quyết (b), song hành (c)
                            </th>
                            <th rowspan="1">Học phần tương đương</th>
                        </tr>
                        {getTableData().map((rowData) => (
                            <tr key={rowData.id} onClick={() => handleUpperTableSelect(rowData)}>
                                <th>
                                    <input
                                        type="radio"
                                        checked={selectedUpperTableRow && selectedUpperTableRow.id === rowData.id}
                                    />
                                </th>
                                <th style={{ height: '30px' }}>{rowData.stt}</th>
                                <th>{rowData.maMhCu}</th>
                                <th>{rowData.maHp}</th>
                                <th>{rowData.tenMonHoc}</th>
                                <th>{rowData.tinChi}</th>
                                <th>
                                    {rowData.batBuoc ? (
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
                                <th>{rowData.hocPhan}</th>
                                <th>{rowData.hocPhanTuongDuong}</th>
                            </tr>
                        ))}
                    </table>
                </div>
                <div
                    style={{
                        width: '70%',
                        marginLeft: '320px',
                        marginTop: '25px',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <p style={{ fontSize: '17px', fontWeight: 'bold', color: '#FF8C00' }}>LỚP HỌC PHẦN CHỜ ĐĂNG KÝ</p>
                    <div style={{ display: 'flex' }}>
                        {trunglichs.map((trunglich) => (
                            <div style={{ color: 'red', fontSize: '15px', fontWeight: 'bold' }} key={trunglich.id}>
                                <input style={{ marginLeft: '15px', marginTop: '8px' }} type="radio" />
                                {trunglich.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    style={{
                        width: '98%',
                        marginLeft: '12px',
                        marginTop: '25px',
                    }}
                >
                    <table border="1" width={1125}>
                        <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                            <th style={{ height: '50px', width: '35px' }} rowspan="1"></th>
                            <th rowspan="1">STT</th>
                            <th rowspan="1">Mã LHP</th>
                            <th rowspan="1">Tên lớp học phần</th>
                            <th rowspan="1">Lớp dự kiến</th>
                            <th rowspan="1">Sĩ số tối đa</th>
                            <th rowspan="1">Đã đăng kí</th>
                            <th rowspan="1">Trạng thái</th>
                        </tr>
                        {getLowerTableData().map((rowData) => (
                            <tr key={rowData.id}>
                                <th>
                                    <input
                                        type="radio"
                                        checked={selectedLowerTableRow && selectedLowerTableRow.id === rowData.id}
                                        onChange={() => handleLowerTableSelect(rowData)}
                                    />
                                </th>
                                <th style={{ height: '30px' }}>{rowData.stt}</th>
                                <th>{rowData.maLHP}</th>
                                <th>{rowData.tenLopHP}</th>
                                <th>{rowData.lopDuKien}</th>
                                <th>{rowData.siSoToiDa}</th>
                                <th>{rowData.daDangKi}</th>
                                <th>{rowData.trangThai}</th>
                            </tr>
                        ))}
                    </table>
                </div>
                <div
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        marginTop: '20px',
                    }}
                >
                    <p style={{ fontSize: '17px', fontWeight: 'bold', color: '#FF8C00' }}>CHI TIẾT LỚP HỌC PHẦN</p>
                </div>
                <div
                    style={{
                        width: '40%',
                        textAlign: 'center',
                        marginTop: '30px',
                        marginLeft: '350px',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <p style={{ fontSize: '15px', marginTop: '5px' }}>Nhóm thực hành</p>
                    <div style={{ width: '180px' }}>
                        <Select
                            defaultValue={selectedOption[0]} // Sử dụng defaultValue để đặt giá trị mặc định
                            onChange={handleChange}
                            options={options}
                            isSearchable={true}
                            placeholder="Chọn một option..."
                        />
                    </div>
                    <button style={{ width: '140px', backgroundColor: '#FF8C00' }}>
                        <p style={{ fontWeight: 'bold', color: 'white' }}>Xem lịch trùng</p>
                    </button>
                </div>
                <div
                    style={{
                        width: '98%',
                        marginLeft: '12px',
                        marginTop: '15px',
                    }}
                >
                    <table border="1" width={1125}>
                        <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                            <th style={{ height: '50px' }} rowspan="1">
                                STT
                            </th>
                            <th rowspan="1">Lịch học</th>
                            <th rowspan="1">Nhóm TH</th>
                            <th rowspan="1">Phòng</th>
                            <th rowspan="1">Dãy nhà</th>
                            <th rowspan="1">Cơ sở</th>
                            <th rowspan="1">Giảng viên</th>
                            <th rowspan="1">Thời gian</th>
                            <th></th>
                        </tr>
                        {getScheduleData().map((rowData) => (
                            <tr key={rowData.id}>
                                <th style={{ height: '40px' }}>{rowData.stt}</th>
                                <th>{rowData.lichHoc}</th>
                                <th>{rowData.nhomTH}</th>
                                <th>{rowData.phong}</th>
                                <th>{rowData.dayNha}</th>
                                <th>{rowData.coSo}</th>
                                <th>{rowData.giangVien}</th>
                                <th>{rowData.thoiGian}</th>
                                <th>
                                    <button style={{ width: '70px', height: '30px', backgroundColor: '#00C0FF' }}>
                                        <p style={{ fontWeight: 'bold', color: 'white' }}>Xem</p>
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </table>
                </div>
                <div
                    style={{
                        width: '100%',
                        marginTop: '25px',
                        textAlign: 'center',
                    }}
                >
                    <button style={{ width: '140px', backgroundColor: '#FF8C00', height: '30px' }}>
                        <p style={{ fontWeight: 'bold', color: 'white' }}>Đăng kí môn học</p>
                    </button>
                </div>
                <div
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        marginTop: '20px',
                    }}
                >
                    <p style={{ fontSize: '17px', fontWeight: 'bold', color: '#FF8C00' }}>
                        LỚP HỌC PHẦN ĐÃ ĐĂNG KÍ TRONG HỌC KÌ NÀY
                    </p>
                </div>
                <div
                    style={{
                        width: '98%',
                        marginLeft: '12px',
                        marginTop: '15px',
                    }}
                >
                    <table border="1" width={1125}>
                        <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                            <th style={{ height: '50px' }} rowspan="1">
                                Thao tác
                            </th>
                            <th rowspan="1">STT</th>
                            <th rowspan="1">Mã LHP</th>
                            <th rowspan="1">Tên môn học</th>
                            <th rowspan="1">Lớp học phần dự kiến</th>
                            <th rowspan="1">Số TC</th>
                            <th rowspan="1">Nhóm thực hành</th>
                            <th rowspan="1">Học phí</th>
                            <th rowspan="1">Hạn nộp</th>
                            <th rowspan="1">Thu</th>
                            <th rowspan="1">Trạng thái ĐK</th>
                            <th rowspan="1">Ngày ĐK</th>
                            <th>Trạng thái LHP</th>
                        </tr>
                        <tr>
                            <th style={{ height: '40px' }}></th>
                            <th>1</th>
                            <th>234534312</th>
                            <th>Khóa luận tốt nghiệp</th>
                            <th>DHTHHK15L</th>
                            <th>5</th>
                            <th></th>
                            <th>1.000.000</th>
                            <th>Lần 1: 16/11/2023</th>
                            <th>
                                <FontAwesomeIcon style={{ color: 'green', fontSize: '20px' }} icon={faCircleCheck} />
                            </th>
                            <th>Đăng kí học lại</th>
                            <th>10/05/2005</th>
                            <th>Đã khóa</th>
                        </tr>
                        <tr>
                            <th style={{ height: '40px' }}></th>
                            <th>1</th>
                            <th>234534312</th>
                            <th>Khóa luận tốt nghiệp</th>
                            <th>DHTHHK15L</th>
                            <th>5</th>
                            <th></th>
                            <th>1.000.000</th>
                            <th>Lần 1: 16/11/2023</th>
                            <th>
                                <FontAwesomeIcon style={{ color: 'green', fontSize: '20px' }} icon={faCircleCheck} />
                            </th>
                            <th>Đăng kí học lại</th>
                            <th>10/05/2005</th>
                            <th>Đã khóa</th>
                        </tr>
                    </table>
                </div>
                <div style={{ width: '100%', height: '20px' }}></div>
                <div
                    style={{
                        width: '98%',
                        marginTop: '10px',
                        backgroundColor: '#82CAFA',
                        marginLeft: '12px',
                        justifyContent: 'space-between',
                        display: 'flex',
                    }}
                >
                    <div style={{ marginLeft: '15px' }}>
                        <p>TRƯỜNG ĐẠI HỌC ĐỨC THUẬN</p>
                        <p>Địa chỉ: 182 Lê Đức Thọ - Phường 15 - Gò Vấp</p>
                        <p>Điện thoại: 1235646310</p>
                        <p>FAX: 1532315630</p>
                        <p>Email:dhdt@gmail.com</p>
                    </div>
                    <div style={{ marginRight: '15px' }}>
                        <p>Thống kê truy cập</p>
                        <p>Lượt truy cập: 13532</p>
                        <p>Đang online: 512</p>
                    </div>
                </div>
                <div style={{ width: '100%', height: '20px' }}></div>
            </div>
        </div>
    );
}

export default Dangkyhocphan;
