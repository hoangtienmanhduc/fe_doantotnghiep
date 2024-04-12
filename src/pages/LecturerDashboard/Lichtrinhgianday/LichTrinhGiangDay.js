import { useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { startOfWeek, endOfWeek, addDays, format, isSameDay, subWeeks } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useQuery } from '@tanstack/react-query';
import { getRefId, getUserId, getUserRole } from '~/components/authentication/AuthUtils';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { getListScheduleInfo } from '~/api/schedule/ScheduleSevice';
import { UserRoles } from '~/App';
const QueryKey = 'Schedule-List';

const Lichtrinhgiangday = () => {
    // Date
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSchedule, setSelectedSchedule] = useState(0);

    const { data: scheduleDataList } = useQuery(
        [QueryKey, getUserId(), getUserRole() === UserRoles.LECTURER ? getRefId() : null],
        () =>
            getListScheduleInfo(getUserId(), {
                lecturerId: getUserRole() === UserRoles.LECTURER ? getRefId() : null,
            }),
        {
            enabled: !!getUserId() && !!getRefId(),
        },
    );

    const currentDateFormatted = format(selectedDate, 'dd/MM/yyyy');

    const CustomDatePickerInput = ({ value = currentDateFormatted, onClick = () => {} }) => {
        return (
            <span className="p-input-icon-right" onClick={onClick}>
                <i className="pi pi-calendar" />
                <InputText value={value} placeholder="Chọn ngày" />
            </span>
        );
    };

    const dayOfWeekList = useMemo(() => {
        const startDate = startOfWeek(selectedDate, { weekStartsOn: 1 });
        const endDate = endOfWeek(selectedDate, { weekStartsOn: 1 });
        let newColumns = [];
        let currentDate = startDate;
        let tempData = scheduleDataList && scheduleDataList?.length > 0 ? [...scheduleDataList] : [];
        while (currentDate <= endDate) {
            const day = format(currentDate, 'dd/MM/yyyy');
            let compareDate = addDays(currentDate, 1);

            if (scheduleDataList && scheduleDataList?.length > 0) {
                const dayScheduleItems = tempData?.filter((item) =>
                    isSameDay(new Date(item.learningDate), compareDate),
                );

                newColumns.push({
                    day: format(currentDate, 'iiii', { locale: vi }),
                    date: day,

                    scheduleItems: dayScheduleItems,
                });
            } else {
                newColumns.push({
                    day: format(currentDate, 'iiii', { locale: vi }),
                    date: day,
                });
            }

            currentDate = addDays(currentDate, 1);
        }

        return newColumns;
    }, [scheduleDataList, selectedDate]);

    const renderScheduleItems = (type, scheduleItems, key) => {
        return (
            <td key={key} style={{ backgroundColor: 'white', height: '170px' }}>
                {scheduleItems &&
                    scheduleItems?.length > 0 &&
                    scheduleItems
                        ?.filter((item) =>
                            type === 'morning'
                                ? item?.periodStart <= 6
                                : type === 'afternoon'
                                ? item?.periodStart > 6 && item?.periodStart <= 12
                                : type === 'evening'
                                ? item?.periodStart > 12 && item?.periodStart <= 15
                                : false,
                        )
                        ?.map((item) => (
                            <div
                                key={item.id}
                                className="font-semibold m-1 border-round surface-100 text-800 p-2 flex flex-column justify-content-start align-items-center"
                                style={{
                                    textAlign: 'center',
                                }}
                            >
                                <br />
                                <p className="p-0 m-0">{item.sectionName}</p>
                                <p className="p-0 m-0">{item.sectionCode}</p>
                                <p className="p-0 m-0">
                                    {item.sectionClassType === 'theory'
                                        ? '(Lý thuyết)'
                                        : item.sectionClassType === 'practice'
                                        ? '(Thực hành)'
                                        : ''}
                                </p>
                                <br />
                                <p className="p-0 m-0">{`Tiết: ${item.periodStart} - ${item.periodEnd}`}</p>
                                <p className="p-0 m-0">{`Phòng: ${item.room}`}</p>
                                <p className="p-0 m-0">{`GV: ${item.lecturerName}`}</p>
                            </div>
                        ))}
            </td>
        );
    };

    return (
        <div className="bg-white w-full p-2 border-round">
            <h2>Lịch học, lịch thi theo tuần</h2>
            <div className="flex w-full justify-content-between align-items-center mb-3">
                <div className="flex align-items-center">
                    <div className="flex align-items-center gap-2 mr-2">
                        <div className="flex align-items-center">
                            <Checkbox
                                inputId="tatca-schedule"
                                name="tatca"
                                value={0}
                                onChange={() => setSelectedSchedule(0)}
                                checked={selectedSchedule === 0}
                            />
                            <label htmlFor="tatca-schedule" className="ml-2">
                                Tất cả
                            </label>
                        </div>
                        <div className="flex align-items-center">
                            <Checkbox
                                inputId="lichhoc-schedule"
                                name="lichhoc"
                                value={1}
                                onChange={() => setSelectedSchedule(1)}
                                checked={selectedSchedule === 1}
                            />
                            <label htmlFor="lichhoc-schedule" className="ml-2">
                                Lịch Học
                            </label>
                        </div>
                        <div className="flex align-items-center">
                            <Checkbox
                                inputId="lichthi-schedule"
                                name="lichthi"
                                value={2}
                                onChange={() => setSelectedSchedule(2)}
                                checked={selectedSchedule === 2}
                            />
                            <label htmlFor="lichthi-schedule" className="ml-2">
                                Lịch Thi
                            </label>
                        </div>
                    </div>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="dd/MM/yyyy"
                        customInput={<CustomDatePickerInput />}
                    />
                </div>
                <div className="h-3rem flex justify-content-center ml-3 gap-2">
                    <Button label="Hiện tại" icon="pi pi-calendar" onClick={() => setSelectedDate(new Date())} />
                    <Button label="In lịch" icon="pi pi-print" onClick={() => {}} />
                    <Button
                        label="Trở về"
                        icon="pi pi-backward"
                        onClick={() => setSelectedDate(subWeeks(startOfWeek(selectedDate, { weekStartsOn: 1 }), 1))}
                    />
                    <Button
                        label="Tiếp"
                        icon="pi pi-forward"
                        onClick={() => setSelectedDate(addDays(endOfWeek(selectedDate, { weekStartsOn: 1 }), 1))}
                    />
                </div>
            </div>
            <div className="w-full">
                <table border="1" className="w-full">
                    <thead>
                        <tr style={{ backgroundColor: '#F0F8FF' }}>
                            <th style={{ width: '70px', height: '50px' }} rowSpan="1">
                                Ca học
                            </th>
                            {dayOfWeekList.map((column, idx) => (
                                <th key={idx} style={{ width: '130px', height: '50px' }} rowSpan="1">
                                    <p>{column.day}</p>
                                    <p>{column.date}</p>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th style={{ height: '170px', backgroundColor: 'rgb(255, 255, 206)' }}>Sáng</th>
                            {dayOfWeekList?.map((column, idx) =>
                                renderScheduleItems('morning', column?.scheduleItems, idx),
                            )}
                        </tr>
                        <tr>
                            <th style={{ height: '170px', backgroundColor: 'rgb(255, 255, 206)' }}>Chiều</th>
                            {dayOfWeekList?.map((column, idx) =>
                                renderScheduleItems('afternoon', column?.scheduleItems, idx),
                            )}
                        </tr>
                        <tr>
                            <th style={{ height: '170px', backgroundColor: 'rgb(255, 255, 206)' }}>Tối</th>
                            {dayOfWeekList?.map((column, idx) =>
                                renderScheduleItems('evening', column?.scheduleItems, idx),
                            )}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Lichtrinhgiangday;
