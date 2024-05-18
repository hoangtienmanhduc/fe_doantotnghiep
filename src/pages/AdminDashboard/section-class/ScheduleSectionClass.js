import { Sidebar } from 'primereact/sidebar';
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '../../../custom.css';
import interactionPlugin from '@fullcalendar/interaction';
import { Dialog } from 'primereact/dialog';
import { useQuery } from '@tanstack/react-query';
import { getUserId } from '~/components/authentication/AuthUtils';
import { createOrUpdateSchedule, deleteSchedule, getListScheduleInfo } from '~/api/schedule/ScheduleSevice';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { dayInWeekOptions } from './SectionClassConstant';
import { Button } from 'primereact/button';
import { scheduleTypeOptions } from '../schedule/ScheduleConstant';
import { showNotification } from '~/components/notification/NotificationService';
import timeGridPlugin from '@fullcalendar/timegrid';
import { getListLecturerInfo } from '~/api/lecturer/LecturerService';
import { HTTP_STATUS_OK } from '~/utils/Constants';
import moment from 'moment';

const QueryKeyLecturerOptions = 'Lecturer-Options';
const QueryKey = 'Schedule-List';

const ScheduleSectionClass = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        showForm: handleShowForm,
        hideForm: handleHideForm,
    }));

    const [visible, setVisible] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [isAddNew, setIsAddNew] = useState(false);
    const [data, setData] = useState({});
    const [selectedSchedule, setSelectedSchedule] = useState({});

    const { data: scheduleList, refetch } = useQuery(
        [QueryKey, getUserId(), data?.id],
        () => getListScheduleInfo(getUserId(), { sectionClassId: data?.id }, null),
        { enabled: !!getUserId() && !!data?.id },
    );

    const handleShowForm = (data) => {
        if (data) {
            setData(data);
        }

        setVisible(true);
    };

    const handleHideForm = () => {
        setVisible(false);
    };

    const handleEventClick = useCallback((data) => {
        if (data && data?.event && data.event?.extendedProps?.data) {
            setSelectedSchedule(data.event?.extendedProps?.data);
        }
        setDialogVisible(true);
    }, []);

    const eventContent = (info) => {
        return (
            <div
                className={`${
                    info.event.extendedProps.data.scheduleType === 'test'
                        ? 'bg-yellow-300'
                        : info.event.extendedProps.data.scheduleType === 'suspended'
                        ? 'bg-blue-300'
                        : 'surface-300'
                } cursor-pointer col-12`}
            >
                <b>{info.event.title}</b>
                <p>Lớp: {info.event.extendedProps.data.sectionClassType === 'theory' ? 'Lý thuyết' : 'Thực hành'}</p>
                <p>Giảng viên: {info.event.extendedProps.data.lecturerName}</p>
                <p>Phòng học: {info.event.extendedProps.data.room}</p>
                <p>
                    {info.event.extendedProps.data.dayInWeek === 'monday'
                        ? 'Thứ Hai'
                        : info.event.extendedProps.data.dayInWeek === 'tuesday'
                        ? 'Thứ Ba'
                        : info.event.extendedProps.data.dayInWeek === 'wednesday'
                        ? 'Thứ Tư'
                        : info.event.extendedProps.data.dayInWeek === 'thursday'
                        ? 'Thứ Năm'
                        : info.event.extendedProps.data.dayInWeek === 'friday'
                        ? 'Thứ Sáu'
                        : info.event.extendedProps.data.dayInWeek === 'saturday'
                        ? 'Thứ Bảy'
                        : info.event.extendedProps.data.dayInWeek === 'sunday'
                        ? 'Chủ nhật'
                        : '-'}{' '}
                    (Tiết {info.event.extendedProps.data.periodStart} - {info.event.extendedProps.data.periodEnd})
                </p>
                <p>
                    Loại lịch:{' '}
                    {info.event.extendedProps.data.scheduleType === 'normal'
                        ? 'Lịch Học'
                        : info.event.extendedProps.data.scheduleType === 'test'
                        ? 'Lịch Thi'
                        : info.event.extendedProps.data.scheduleType === 'suspended'
                        ? 'Lịch Tạm Ngưng'
                        : '-'}
                </p>
            </div>
        );
    };

    const dataList = useMemo(() => {
        let dataList = [];
        if (scheduleList && scheduleList?.length > 0) {
            dataList = scheduleList.map((schedule) => {
                return {
                    title: schedule?.sectionName,
                    start: schedule?.learningDate,
                    end: schedule?.learningDate,
                    data: {
                        ...schedule,
                    },
                };
            });
        }

        return dataList;
    }, [scheduleList]);

    const [learningDate, setLearningDate] = useState(null);

    const handleSelectDate = (date) => {
        setLearningDate(date.date);
        setIsAddNew(true);
        setDialogVisible(true);
    };

    const { data: lecturerOptions } = useQuery(
        [QueryKeyLecturerOptions, getUserId()],
        () => getListLecturerInfo(getUserId(), {}, null, true),
        { enabled: !!getUserId() },
    );

    const dayCellContent = (date) => {
        return (
            <div className="w-full flex justify-content-between align-items-center">
                <span>
                    <p className="text-xl font-semibold text-primary">{date?.dayNumberText}</p>
                </span>
                <Button
                    className="p-button-text"
                    icon="pi pi-plus"
                    tooltipOptions={{ position: 'left' }}
                    tooltip="Thêm lịch học mới"
                    onClick={() => handleSelectDate(date)}
                />
            </div>
        );
    };

    const handleOnSubmitSchedule = useCallback(async () => {
        let toPostData = {
            ...selectedSchedule,
            sectionClassId: data?.id,
            learningDate: !isAddNew ? new Date(selectedSchedule?.learningDate) : learningDate,
        };

        if (!toPostData?.room) {
            showNotification('error', 'Lỗi', 'Phòng học của thời khoá biểu không được trống !!');
            return;
        }

        if (!toPostData?.lecturerId) {
            showNotification('error', 'Lỗi', 'Giảng viên giảng dạy tiết học không được trống !!');
            return;
        }

        if (!toPostData?.scheduleType) {
            showNotification('error', 'Lỗi', 'Loại lịch của thời khoá biểu không được trống !!');
            return;
        }

        const response = await createOrUpdateSchedule(getUserId(), toPostData);

        if (response?.id) {
            try {
                showNotification('success', 'Thành công', 'Thao tác cập nhật thời khoá biểu thành công !!');
                refetch();
            } catch (err) {
                console.log('Tải lại bảng không thành công');
            }

            setDialogVisible(false);
            setSelectedSchedule({});
            setIsAddNew(false);
            return;
        }
    }, [data?.id, isAddNew, learningDate, refetch, selectedSchedule]);

    const handleOnDeleteSchedule = useCallback(async () => {
        const response = await deleteSchedule(getUserId(), selectedSchedule?.id);
        if (response === HTTP_STATUS_OK) {
            try {
                showNotification('success', 'Thành công', 'Thao tác xoá thời khoá biểu thành công !!');
                refetch();
            } catch (err) {
                console.log('Tải lại bảng không thành công');
            }

            setDialogVisible(false);
            setSelectedSchedule({});
            setIsAddNew(false);
            return;
        }
    }, [refetch, selectedSchedule?.id]);

    return (
        <React.Fragment>
            <Sidebar
                fullScreen
                header={
                    <h2 className="m-0 p-3 pb-0 font-bold w-full">
                        Thời khoá biểu của lớp học phần {data && data?.name ? data.name : ''}
                        <hr />
                    </h2>
                }
                onHide={handleHideForm}
                pt={{ header: { className: 'p-0' } }}
                visible={visible}
            >
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: '',
                    }}
                    buttonText={{
                        today: 'Hôm nay',
                        month: 'Tháng',
                        week: 'Tuần',
                        day: 'Ngày',
                    }}
                    locale="vi"
                    titleFormat={{
                        year: 'numeric',
                        month: '2-digit',
                    }}
                    initialView="dayGridMonth"
                    dayMaxEventRows={5}
                    // Data
                    events={dataList}
                    dayCellContent={dayCellContent}
                    eventContent={eventContent}
                    // Handle
                    eventClick={handleEventClick}
                />
            </Sidebar>
            <Dialog
                header={
                    <h3 className="m-0 p-3 pb-0 font-bold w-full">
                        Thông tin thời khoá biểu
                        <hr />
                    </h3>
                }
                style={{ width: '50vw' }}
                onHide={() => {
                    setDialogVisible(false);
                    setSelectedSchedule({});
                    setIsAddNew(false);
                }}
                pt={{ header: { className: 'p-0' } }}
                visible={dialogVisible}
            >
                <div className="w-full mb-2">
                    {!isAddNew && (
                        <div className="col-12 p-0">
                            <p>Tên học phần</p>
                            <span className="w-full">
                                <InputText value={selectedSchedule?.sectionName || ''} disabled className="w-full" />
                            </span>
                        </div>
                    )}
                    {!isAddNew && (
                        <div className="col-12 p-0">
                            <p>Loại lớp</p>
                            <span className="w-full">
                                <InputText
                                    value={
                                        selectedSchedule?.sectionClassType === 'theory'
                                            ? 'Lý thuyết'
                                            : selectedSchedule?.sectionClassType === 'practice'
                                            ? 'Thực hành'
                                            : ''
                                    }
                                    disabled
                                    className="w-full"
                                />
                            </span>
                        </div>
                    )}
                    {!isAddNew && (
                        <div className="col-12 p-0">
                            <p>Thứ trong tuần</p>
                            <span className="w-full">
                                <Dropdown
                                    value={selectedSchedule?.dayInWeek || null}
                                    options={dayInWeekOptions}
                                    optionLabel="label"
                                    disabled
                                    optionValue="key"
                                    placeholder="Hãy chọn ngày học trong tuần của lớp học phần (Bắt buộc)"
                                    className="w-full"
                                />
                            </span>
                        </div>
                    )}
                    <div className="flex justify-content-between align-items-center">
                        <div className="col-5 p-0">
                            <p>Tiết bắt đầu </p>
                            <span className="w-full">
                                <InputNumber
                                    disabled={!isAddNew}
                                    value={selectedSchedule?.periodStart || 0}
                                    onChange={(e) => {
                                        if (e?.value > 15) {
                                            setSelectedSchedule({ ...selectedSchedule, periodStart: 15 });
                                        } else if (e?.value < 1) {
                                            setSelectedSchedule({
                                                ...selectedSchedule,
                                                periodStart: 1,
                                            });
                                        } else {
                                            setSelectedSchedule({
                                                ...selectedSchedule,
                                                periodStart: e.value,
                                            });
                                        }
                                    }}
                                    placeholder="Nhập tiết bắt đầu tiết học (Bắt buộc)"
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <Divider align="center" layout="vertical">
                            <span className="p-tag">Đến</span>
                        </Divider>
                        <div className="col-5 p-0">
                            <p>Tiết kết thúc </p>
                            <span className="w-full">
                                <span className="w-full">
                                    <InputNumber
                                        disabled={!isAddNew}
                                        value={selectedSchedule?.periodEnd || 0}
                                        onChange={(e) => {
                                            if (e?.value > 15) {
                                                setSelectedSchedule({ ...selectedSchedule, periodEnd: 15 });
                                            } else if (e?.value < 1) {
                                                setSelectedSchedule({
                                                    ...selectedSchedule,
                                                    periodEnd: 1,
                                                });
                                            } else {
                                                setSelectedSchedule({
                                                    ...selectedSchedule,
                                                    periodEnd: e.value,
                                                });
                                            }
                                        }}
                                        placeholder="Nhập tiết kết thúc tiết học (Bắt buộc)"
                                        className="w-full"
                                    />
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="col-12 p-0">
                        <p className="flex justify-content-between">
                            Giảng viên giảng dạy {!isAddNew && <b className="text-red-400">Có thể chính sửa</b>}
                        </p>
                        <span className="w-full">
                            <Dropdown
                                value={selectedSchedule?.lecturerId}
                                onChange={(e) =>
                                    setSelectedSchedule({ ...selectedSchedule, lecturerId: e?.target.value })
                                }
                                options={lecturerOptions}
                                optionLabel="fullName"
                                optionValue="id"
                                placeholder="Hãy chọn giảng viên phụ trách giảng dạy cho lớp học phần"
                                className="w-full"
                            />
                        </span>
                    </div>
                    {console.log(selectedSchedule)}
                    <div className="col-12 p-0">
                        <p className="flex justify-content-between">
                            Phòng học {!isAddNew && <b className="text-red-400">Có thể chính sửa</b>}
                        </p>
                        <span className="w-full">
                            <InputText
                                value={selectedSchedule?.room || ''}
                                onChange={(e) => setSelectedSchedule({ ...selectedSchedule, room: e?.target.value })}
                                placeholder="Nhập phòng học (Bắt buộc)"
                                className="w-full"
                            />
                        </span>
                    </div>
                    <div className="col-12 p-0">
                        <p className="flex justify-content-between">
                            Loại lịch {!isAddNew && <b className="text-red-400">Có thể chính sửa</b>}
                        </p>
                        <p></p>
                        <span className="w-full">
                            <Dropdown
                                value={selectedSchedule?.scheduleType || null}
                                options={
                                    !isAddNew
                                        ? scheduleTypeOptions
                                        : scheduleTypeOptions.filter((item) => item.key !== 'suspended')
                                }
                                onChange={(e) =>
                                    setSelectedSchedule({ ...selectedSchedule, scheduleType: e?.target.value })
                                }
                                optionLabel="label"
                                optionValue="key"
                                placeholder="Hãy loại lịch của thời khoá biểu này (Bắt buộc)"
                                className="w-full"
                            />
                        </span>
                    </div>
                </div>
                <hr />
                <div className="flex col-12 p-0 justify-content-between p-inputgroup mb-2">
                    <Button
                        className={`${!isAddNew ? 'col-6' : 'col-12'} p-button-lg font-bold`}
                        onClick={handleOnSubmitSchedule}
                        icon={'pi pi-send'}
                        label={'Xác nhận'}
                    />
                    {!isAddNew && (
                        <Button
                            className={`col-6 bg-red-400 hover:bg-red-600 p-button-lg font-bold`}
                            onClick={handleOnDeleteSchedule}
                            icon={'pi pi-trash'}
                            label={'Xoá lịch'}
                        />
                    )}
                </div>
                <div className="flex col-12 p-0">
                    <Button
                        className="col-12 p-button-lg font-bold"
                        onClick={() => {
                            setDialogVisible(false);
                            setSelectedSchedule({});
                            setIsAddNew(false);
                        }}
                        icon={'pi pi-times'}
                        label={'Huỷ bỏ'}
                    />
                </div>
            </Dialog>
        </React.Fragment>
    );
});

export default ScheduleSectionClass;
