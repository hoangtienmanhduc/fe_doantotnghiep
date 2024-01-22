import { useEffect, useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { startOfWeek, endOfWeek, addDays, format, isSameDay, subWeeks } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useQuery } from '@tanstack/react-query';
import { getUserId } from '~/components/authentication/AuthUtils';
import { getListScheduleInfo } from '~/api/schedule/ScheduleSevice';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';

const QueryKey = 'Schedule-List';

const Lichhoc = () => {
    // Date
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSchedule, setSelectedSchedule] = useState(0);
    const { data: scheduleDataList } = useQuery([QueryKey, getUserId()], () => getListScheduleInfo(getUserId(), {}), {
        enabled: !!getUserId(),
    });

    const currentDateFormatted = format(selectedDate, 'dd/MM/yyyy');

    const CustomDatePickerInput = ({ value, onClick }) => (
        <span className="p-input-icon-right" onClick={onClick}>
            <i className="pi pi-calendar" />
            <InputText value={value || currentDateFormatted} readOnly placeholder="Chọn ngày" />
        </span>
    );

    const dayOfWeekList = useMemo(
        (dateNow) => {
            const startDate = startOfWeek(dateNow, { weekStartsOn: 1 });
            const endDate = endOfWeek(dateNow, { weekStartsOn: 1 });

            let newColumns = [];
            const currentDate = startDate;
            
            while (currentDate <= endDate) {
                const day = format(currentDate, 'dd/MM/yyyy');
                const dayScheduleItems = scheduleDataList.filter((item) =>
                    isSameDay(Date.parse(item.learningDate), currentDate),
                );
                newColumns.push({
                    day: format(currentDate, 'iiii', { locale: vi }),
                    date: day,
                    scheduleItems: dayScheduleItems,
                });

                currentDate = addDays(currentDate, 1);
            }
        },
        [scheduleDataList, selectedSchedule],
    );

    const renderScheduleItems = (scheduleItems) => {
        return (
            <td key={scheduleItems?.id} style={{ backgroundColor: 'white' }}>
                {scheduleItems &&
                    scheduleItems?.length > 0 &&
                    scheduleItems.map((item) => (
                        <div
                            key={item.id}
                            style={{
                                backgroundColor: item.isLichHoc ? 'rgb(231, 236, 240)' : 'rgb(253, 255, 154)',
                                textAlign: 'center',
                            }}
                        >
                            <p>{item.sectionName}</p>
                            <p>{item.sectionCode}</p>
                            <p>{`Tiết: ${item.periodFrom} - ${item.periodTo}`}</p>
                            <p>{`Phòng: ${item.room}`}</p>
                            {item.isLichThi && <p>{`Nhóm: ${item.nhom}`}</p>}
                            <p>{`GV: ${item.lecturerName}`}</p>
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
                        selected={new Date()}
                        onChange={(date) => {}}
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
                            {dayOfWeekList.map((column) => (
                                <th key={column.date} style={{ width: '130px', height: '50px' }} rowSpan="1">
                                    <p>{column.day}</p>
                                    <p>{column.date}</p>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tr>
                        <th style={{ height: '170px', backgroundColor: 'rgb(255, 255, 206)' }}>Sáng</th>
                        {scheduleDataList
                            .filter((item) => item?.dateTime?.toLowerCase() === 'morning')
                            .map((column) => renderScheduleItems(column))}
                    </tr>
                    <tr>
                        <th style={{ height: '170px', backgroundColor: 'rgb(255, 255, 206)' }}>Chiều</th>
                        {scheduleDataList
                            .filter((item) => item?.dateTime?.toLowerCase() === 'afternoon')
                            .map((column) => renderScheduleItems(column))}
                    </tr>
                    <tr>
                        <th style={{ height: '170px', backgroundColor: 'rgb(255, 255, 206)' }}>Tối</th>
                        {scheduleDataList
                            .filter((item) => item?.dateTime?.toLowerCase() === 'evening')
                            .map((column) => renderScheduleItems(column))}
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default Lichhoc;
