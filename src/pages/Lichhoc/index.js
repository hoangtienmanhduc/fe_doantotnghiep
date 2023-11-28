import { useEffect, useState } from 'react';
import styles from './Lichhoc.module.scss';
import classNames from 'classnames/bind';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faChevronLeft, faChevronRight, faPrint } from '@fortawesome/free-solid-svg-icons';
import { startOfWeek, endOfWeek, addDays, format, isSameDay, subWeeks } from 'date-fns';
import { vi } from 'date-fns/locale';

const cx = classNames.bind(styles);

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

function Lichhoc() {
    // Date
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [columns, setColumns] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(courses[0]);

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
                style={{ height: '30px', width: '140px' }}
            />
            <span className={cx('calendar-icon')} role="img" aria-label="calendar">
                📅
            </span>
        </div>
    );

    // Button hiện tại
    const handleTodayButtonClick = () => {
        setSelectedDate(new Date());
    };

    // Button trở lại
    const handleBackButtonClick = () => {
        const previousWeekStartDate = subWeeks(startOfWeek(selectedDate, { weekStartsOn: 1 }), 1);
        setSelectedDate(previousWeekStartDate);
        updateColumns(previousWeekStartDate); // Cập nhật cột cho tuần trước
    };

    // Button tiếp
    const handleNextButtonClick = () => {
        const nextWeekStartDate = addDays(endOfWeek(selectedDate, { weekStartsOn: 1 }), 1);
        setSelectedDate(nextWeekStartDate);
    };

    // Lọc theo studio
    const scheduleItems = [
        {
            id: 1,
            tenMonHoc: 'Lập trình WWW (Java)',
            maMonHoc: 'DHKTPM16A - 420300362101',
            tietBatDau: 1,
            tietKetThuc: 3,
            phong: 'V6.02',
            giaoVien: 'Võ Văn Hải',
            buoi: 'sang',
            ngay: new Date(2023, 10, 20),
            isLichHoc: true,
            isLichThi: false,
        },
        {
            id: 2,
            tenMonHoc: 'Lập trình phân tán',
            maMonHoc: 'DHKTPM16A - 420300526984',
            tietBatDau: 4,
            tietKetThuc: 6,
            phong: 'V5.02',
            giaoVien: 'Võ Hoàng Đức Anh',
            buoi: 'sang',
            nhom: '1 (1-25)',
            ngay: new Date(2023, 10, 24),
            isLichHoc: false,
            isLichThi: true,
        },

        {
            id: 3,
            tenMonHoc: 'Lập trình phân tán',
            maMonHoc: 'DHKTPM16A - 420300526984',
            tietBatDau: 4,
            tietKetThuc: 6,
            phong: 'V5.02',
            giaoVien: 'Võ Hoàng Đức Anh',
            buoi: 'chieu',
            nhom: '1 (1-25)',
            ngay: new Date(2023, 10, 22),
            isLichHoc: false,
            isLichThi: true,
        },
        // Thêm các mục lịch khác tương tự
    ];

    const updateColumns = (date) => {
        const startDate = startOfWeek(date, { weekStartsOn: 1 });
        const endDate = endOfWeek(date, { weekStartsOn: 1 });

        const newColumns = [];
        let currentDate = startDate;

        while (currentDate <= endDate) {
            const day = format(currentDate, 'dd/MM/yyyy');
            // eslint-disable-next-line no-loop-func
            const dayScheduleItems = scheduleItems.filter((item) => {
                return (
                    isSameDay(item.ngay, currentDate) &&
                    (selectedCourse.id === 1 ||
                        (selectedCourse.id === 2 && item.isLichHoc) ||
                        (selectedCourse.id === 3 && item.isLichThi))
                );
            });

            newColumns.push({
                day: format(currentDate, 'iiii', { locale: vi }),
                date: day,
                scheduleItems: dayScheduleItems,
            });

            currentDate = addDays(currentDate, 1);
        }

        setColumns(newColumns);
    };

    useEffect(() => {
        updateColumns(selectedDate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate, selectedCourse]);

    const renderScheduleItems = (buoi, dayScheduleItems) => {
        return (
            <td key={buoi} style={{ height: '170px', backgroundColor: 'white' }}>
                {dayScheduleItems
                    .filter((item) => item.buoi.toLowerCase() === buoi.toLowerCase())
                    .map((item) => (
                        <div
                            key={item.id}
                            style={{
                                width: '120px',
                                height: '180px',
                                backgroundColor: item.isLichHoc ? 'rgb(231, 236, 240)' : 'rgb(253, 255, 154)',
                                marginLeft: '5px',
                                marginTop: '7px',
                                borderRadius: '5px',
                                textAlign: 'center',
                                overflow: 'hidden',
                                marginBottom: '7px',
                            }}
                        >
                            <p>{item.tenMonHoc}</p>
                            <p>{item.maMonHoc}</p>
                            <p>{`Tiết: ${item.tietBatDau} - ${item.tietKetThuc}`}</p>
                            <p>{`Phòng: ${item.phong}`}</p>
                            {item.isLichThi && <p>{`Nhóm: ${item.nhom}`}</p>}
                            <p>{`GV: ${item.giaoVien}`}</p>
                        </div>
                    ))}
            </td>
        );
    };

    return (
        <div className={cx('wrapper')}>
            <div style={{ height: '1px', width: '100%' }}></div>
            <div
                style={{
                    marginLeft: '10px',
                    height: '30px',
                    width: '98%',
                    marginTop: '10px',
                }}
            >
                <h2>Lịch học, lịch thi theo tuần</h2>
            </div>
            <div style={{ display: 'flex', marginTop: '15px', marginLeft: '100px' }}>
                <div style={{ display: 'flex', fontSize: '15px' }}>
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            style={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}
                            onClick={() => setSelectedCourse(course)}
                        >
                            <input
                                style={{ marginLeft: '15px', width: '15px', height: '15px' }}
                                type="radio"
                                checked={selectedCourse.id === course.id}
                            />
                            {course.name}
                        </div>
                    ))}
                </div>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    customInput={<CustomDatePickerInput />}
                />
                <button className={cx('button')} onClick={handleTodayButtonClick}>
                    <FontAwesomeIcon style={{ marginRight: '2px' }} icon={faCalendarDay} />
                    Hiện tại
                </button>
                <button className={cx('button')}>
                    <FontAwesomeIcon style={{ marginRight: '2px' }} icon={faPrint} />
                    In lịch
                </button>
                <button className={cx('button')} onClick={handleBackButtonClick}>
                    <FontAwesomeIcon style={{ marginRight: '2px' }} icon={faChevronLeft} />
                    Trở về
                </button>
                <button className={cx('button')} onClick={handleNextButtonClick}>
                    Tiếp
                    <FontAwesomeIcon style={{ marginLeft: '2px' }} icon={faChevronRight} />
                </button>
            </div>
            <div
                style={{
                    marginLeft: '10px',
                    width: '100%',
                    marginTop: '25px',
                }}
            >
                <table border="1" className={cx('table table-bordered table-striped')} width={908}>
                    <thead>
                        <tr style={{ backgroundColor: '#F0F8FF' }}>
                            <th style={{ width: '70px', height: '50px' }} rowSpan="1">
                                Ca học
                            </th>
                            {columns.map((column) => (
                                <th key={column.date} style={{ width: '130px', height: '50px' }} rowSpan="1">
                                    <p>{column.day}</p>
                                    <p>{column.date}</p>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tr>
                        <th style={{ height: '170px', backgroundColor: 'rgb(255, 255, 206)' }}>Sáng</th>
                        {columns.map((column) => renderScheduleItems('sang', column.scheduleItems))}
                    </tr>
                    <tr>
                        <th style={{ height: '170px', backgroundColor: 'rgb(255, 255, 206)' }}>Chiều</th>
                        {columns.map((column) => renderScheduleItems('chieu', column.scheduleItems))}
                    </tr>
                    <tr>
                        <th style={{ height: '170px', backgroundColor: 'rgb(255, 255, 206)' }}>Tối</th>
                        {columns.map((column) => renderScheduleItems('toi', column.scheduleItems))}
                    </tr>
                </table>
            </div>
            <div style={{ height: '15px', width: '100%' }}></div>
        </div>
    );
}

export default Lichhoc;
