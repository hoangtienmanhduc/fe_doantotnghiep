import { useQuery } from '@tanstack/react-query';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useState } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useImperativeHandle } from 'react';
import { forwardRef } from 'react';
import { getUserId } from '~/components/authentication/AuthUtils';
import { InputNumber } from 'primereact/inputnumber';
import { createOrUpdateGenericSectionClass, getListSectionClassInfo } from '~/api/section/SectionClassService';
import { SectionClassTypeOptions, dayInWeekOptions } from './SectionClassConstant';
import { getListLecturerInfo } from '~/api/lecturer/LecturerService';
import { getListSectionInfo } from '~/api/section/SectionService';
import { Divider } from 'primereact/divider';
import { InputTextarea } from 'primereact/inputtextarea';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getListTermInfo } from '~/api/term/TermService';

const QueryKeyLecturerOptions = 'Lecturer-Options';
const QueryKeySectionOptions = 'Section-Options';
const QueryKeySectionClassOptions = 'SectionClass-Options';
const QueryKeyTerm = 'Term-Options';

const SectionClassForm = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        showForm: handleShowForm,
        hideForm: handleHideForm,
    }));
    const [timeData, setTimeData] = useState({});
    const [isAddTime, setIsAddTime] = useState(false);
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({});
    const [editData, setEditData] = useState({});
    const [classType, setClassType] = useState(null);
    const toast = useRef(null);
    const handleShowForm = useCallback((data) => {
        if (data && Object.keys(data)?.length > 0) {
            setData({ ...data });
            setClassType(data?.sectionClassType ? data.sectionClassType : '');
        }

        setVisible(true);
    }, []);

    const { data: lecturerOptions } = useQuery(
        [QueryKeyLecturerOptions, getUserId()],
        () => getListLecturerInfo(getUserId(), {}, null, true),
        { enabled: !!getUserId() },
    );
    const { data: sectionOptions } = useQuery(
        [QueryKeySectionOptions, getUserId()],
        () => getListSectionInfo(getUserId(), {}, null, true),
        { enabled: !!getUserId() },
    );

    const { data: sectionClassOptions } = useQuery(
        [QueryKeySectionClassOptions, getUserId()],
        () => getListSectionClassInfo(getUserId(), { sectionClassType: 'theory' }, null, true),
        { enabled: !!getUserId() },
    );

    const { data: termOptions } = useQuery([QueryKeyTerm, getUserId()], () => getListTermInfo(getUserId()), {
        enabled: !!getUserId(),
    });

    const handleHideForm = useCallback(() => {
        setData({});
        setTimeData({});
        setClassType(null);
        setVisible(false);
        setIsAddTime(false);
    }, []);

    const handleOnAddNewTime = useCallback(() => {
        let isError = false;

        if (!timeData?.room) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Phòng học của lớp học phần không được để trống!!',
            });
            isError = true;
        }

        if (!timeData?.dayOfTheWeek) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Phòng học của lớp học phần không được để trống!!',
            });
            isError = true;
        }

        if (!timeData?.dayOfTheWeek) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Ngày trong tuần của lớp học phần không được để trống!!',
            });
            isError = true;
        }

        if (!timeData?.periodStart || !timeData?.periodStart < 0 || !timeData?.periodStart > 15) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Tiết bắt đầu của lớp học phần không được để trống!!',
            });
            isError = true;
        }

        if (!timeData?.periodEnd || !timeData?.periodEnd < 0 || !timeData?.periodEnd > 15) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Tiết kết thúc của lớp học phần không được để trống!!',
            });
            isError = true;
        }

        if (!isError) {
            let timeAndPlaces = {};

            if (editData?.id) {
                timeAndPlaces =
                    data?.timeAndPlaces && data?.timeAndPlaces?.length > 0
                        ? [...data?.timeAndPlaces.filter((item) => editData?.id !== item?.id)]
                        : [];
            } else {
                timeAndPlaces =
                    data?.timeAndPlaces && data?.timeAndPlaces?.length > 0
                        ? [
                              ...data?.timeAndPlaces.filter(
                                  (item) =>
                                      editData.dayOfTheWeek !== item?.dayOfTheWeek &&
                                      editData.periodStart !== item.periodStart &&
                                      editData.periodEnd !== item.periodStart &&
                                      editData.room !== item.room,
                              ),
                          ]
                        : [];
            }

            let isDuplicateTimeAndPlace = timeAndPlaces.some(
                (item) =>
                    timeData.dayOfTheWeek === item?.dayOfTheWeek &&
                    (timeData.periodStart === item.periodStart || timeData.periodEnd === item.periodStart) &&
                    (timeData.periodEnd === item.periodStart || timeData.periodEnd === item.periodStart),
            );

            if (isDuplicateTimeAndPlace) {
                toast.current.show({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Thời gian học này bị trùng với thời học khác trong lớp học phần này!!',
                });
            } else {
                setData({
                    ...data,
                    timeAndPlaces: [...timeAndPlaces, { ...timeData }],
                });

                toast.current.show({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Thao tác cập nhật thời gian học của lớp học phần thành công!!',
                });

                setTimeData({});
                setIsAddTime(false);
            }
        }
    }, [data, editData, timeData]);

    const handleOnSubmit = useCallback(async () => {
        let toPostData = {
            ...data,
        };

        let isError = false;

        if (!data?.lecturerId) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Giảng viên không được để trống!!',
            });
            isError = true;
        }

        if (!data?.sectionId) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Học phần của lớp không được để trống!!',
            });
            isError = true;
        }

        if (!data?.sectionClassType) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Loại lớp học phần không được để trống!!',
            });
            isError = true;
        }

        if (!data?.numberOfStudents) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Tổng sinh viên tối đa của lớp không được để trống!!',
            });
            isError = true;
        }

        if (!data?.timeAndPlaces || data.timeAndPlaces?.length < 0) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Thời gian học của lóp học phần không được để trống!!',
            });
            isError = true;
        }

        if (!isError) {
            const sectionData = await createOrUpdateGenericSectionClass(getUserId(), toPostData);

            if (sectionData?.id) {
                try {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Thao tác cập nhật lớp học phần thành công!!',
                    });
                } catch (err) {
                    console.log('Tải lại bảng không thành công');
                }

                handleHideForm();
            }
        }
    }, [data, handleHideForm]);

    const handleOnChange = useCallback(
        (key, value) => {
            setData({ ...data, [key]: value });
        },
        [data],
    );

    const handleOnChangeTime = useCallback(
        (key, value) => {
            setTimeData({ ...timeData, [key]: value });
        },
        [timeData],
    );

    const handleOnDeleteTime = (deleteRowData) => {
        if (data?.timeAndPlaces && data?.timeAndPlaces?.length < 1) {
            setData({ ...data, timeAndPlaces: [] });
        } else {
            let timeAndPlaces = [];
            if (deleteRowData?.id) {
                timeAndPlaces =
                    data?.timeAndPlaces && data?.timeAndPlaces?.length > 0
                        ? [...data?.timeAndPlaces.filter((item) => deleteRowData?.id !== item?.id)]
                        : [];
            } else {
                timeAndPlaces =
                    data?.timeAndPlaces && data?.timeAndPlaces?.length > 0
                        ? [
                              ...data?.timeAndPlaces.filter(
                                  (item) =>
                                      deleteRowData.dayOfTheWeek !== item?.dayOfTheWeek &&
                                      deleteRowData.periodStart !== item.periodStart &&
                                      deleteRowData.periodEnd !== item.periodStart &&
                                      deleteRowData.room !== item.room,
                              ),
                          ]
                        : [];
            }

            setData({ ...data, timeAndPlaces: timeAndPlaces });

            toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Thao tác xoá lịch học của lớp học phần thành công!!',
            });
        }
    };

    return (
        <>
            <Dialog
                header={
                    <h3 className="m-0 p-3 pb-0 font-bold">
                        {isAddTime
                            ? 'Cập nhật lịch của lớp học phần'
                            : `${!!data?.id ? 'Cập nhật thông tin' : 'Thêm mới'} lớp học phần`}
                        <hr />
                    </h3>
                }
                onHide={handleHideForm}
                style={{
                    width: '60vw',
                }}
                pt={{ header: { className: 'p-0' } }}
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                visible={visible}
            >
                {!!isAddTime ? (
                    <div>
                        <div className="col-12 p-0">
                            <div className="w-full">
                                <div className="inline-flex align-items-center justify-content-between w-full">
                                    <div className="inline-flex align-items-center">
                                        <h3 className="p-0 m-0 mr-2">Thời gian và Phòng học</h3>
                                        <i className="pi pi-clock"></i>
                                    </div>
                                    <Button
                                        className={`font-bold`}
                                        icon={'pi pi-arrow-left'}
                                        label={'Trở về'}
                                        onClick={() => {
                                            setIsAddTime(false);
                                            setTimeData({});
                                        }}
                                    />
                                </div>
                            </div>
                            <hr />
                            <div className="col-12 p-0">
                                <p>Phòng học</p>
                                <span className="w-full">
                                    <InputText
                                        value={timeData?.room || ''}
                                        placeholder="Nhập phòng học cho lớp học phần (Bắt buộc)"
                                        onChange={(e) => handleOnChangeTime('room', e?.target.value)}
                                        className="w-full"
                                    />
                                </span>
                            </div>
                            <div className="col-12 p-0">
                                <p>Ngày học trong tuần (Thứ)</p>
                                <span className="w-full">
                                    <Dropdown
                                        value={timeData?.dayOfTheWeek || null}
                                        onChange={(e) => handleOnChangeTime('dayOfTheWeek', e?.target.value)}
                                        options={dayInWeekOptions}
                                        optionLabel="label"
                                        optionValue="key"
                                        placeholder="Hãy chọn ngày học trong tuần của lớp học phần (Bắt buộc)"
                                        className="w-full"
                                    />
                                </span>
                            </div>
                            <div className="col-12 p-0">
                                <p>Tiết bắt đầu lớp học phần (Tiết 1 - Tiết 15) (Bắt buộc)</p>
                                <span className="w-full">
                                    <InputNumber
                                        value={timeData?.periodStart || 0}
                                        placeholder="Nhập tiết bắt đầu lớp học phần (Tiết 1 - Tiết 15) (Bắt buộc)"
                                        onChange={(e) => handleOnChangeTime('periodStart', e?.value)}
                                        className="w-full"
                                    />
                                </span>
                            </div>
                            <div className="col-12 p-0">
                                <p>Tiết kết thúc lớp học phần (Tiết 1 - Tiết 15) (Bắt buộc)</p>
                                <span className="w-full">
                                    <InputNumber
                                        value={timeData?.periodEnd || 0}
                                        placeholder="Nhập tiết kết thúc lớp học phần (Tiết 1 - Tiết 15) (Bắt buộc)"
                                        onChange={(e) => handleOnChangeTime('periodEnd', e?.value)}
                                        className="w-full"
                                    />
                                </span>
                            </div>
                            <div className="col-12 p-0">
                                <p>Ghi chú lịch của lớp học phần</p>
                                <span className="w-full">
                                    <InputTextarea
                                        rows={6}
                                        value={timeData?.note || ''}
                                        placeholder="Nhập ghi chú cho thời gian học của lớp học phần này (Không bắt buộc)"
                                        onChange={(e) => handleOnChangeTime('note', e?.target.value)}
                                        className="w-full"
                                    />
                                </span>
                            </div>
                        </div>
                        <br />
                        <hr />
                        <div className="flex col-12">
                            <Button
                                className={`col-6 p-button-lg font-bold mr-2`}
                                icon={'pi pi-send'}
                                label={'Xác nhận'}
                                onClick={handleOnAddNewTime}
                            />

                            <Button
                                className="col-6 p-button-lg font-bold"
                                icon={'pi pi-times'}
                                label={'Huỷ bỏ'}
                                onClick={handleHideForm}
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="col-12 p-0">
                            <Divider align="left">
                                <div className="inline-flex align-items-center">
                                    <i className="pi pi-bars mr-2"></i>
                                    <h3 className="p-0 m-0">Học kỳ và Học phần</h3>
                                </div>
                            </Divider>
                            <div className="col-12 p-0">
                                <p>Học kỳ</p>
                                <span className="w-full">
                                    <Dropdown
                                        value={data.termId}
                                        onChange={(e) => handleOnChange('termId', e?.target.value)}
                                        options={termOptions}
                                        optionLabel="name"
                                        optionValue="id"
                                        placeholder="Hãy chọn học kỳ của lớp học phần"
                                        className="w-full"
                                    />
                                </span>
                            </div>
                            <div className="col-12 p-0">
                                <p>Học phần</p>
                                <span className="w-full">
                                    <Dropdown
                                        value={data.sectionId}
                                        onChange={(e) => handleOnChange('sectionId', e?.target.value)}
                                        options={sectionOptions}
                                        optionLabel="name"
                                        optionValue="id"
                                        placeholder="Hãy chọn học phần của lớp học phần"
                                        className="w-full"
                                    />
                                </span>
                            </div>
                            <Divider align="left">
                                <div className="inline-flex align-items-center">
                                    <i className="pi pi-user mr-2"></i>
                                    <h3 className="p-0 m-0">Giảng viên</h3>
                                </div>
                            </Divider>
                            <div className="col-12 p-0">
                                <p>Giảng viên phụ trách giảng dạy</p>
                                <span className="w-full">
                                    <Dropdown
                                        value={data?.lecturerId}
                                        onChange={(e) => handleOnChange('lecturerId', e?.target.value)}
                                        options={lecturerOptions}
                                        optionLabel="name"
                                        optionValue="id"
                                        placeholder="Hãy chọn giảng viên phụ trách giảng dạy cho lớp học phần"
                                        className="w-full"
                                    />
                                </span>
                            </div>
                            <Divider align="left">
                                <div className="inline-flex align-items-center">
                                    <i className="pi pi-building mr-2"></i>
                                    <h3 className="p-0 m-0">Lớp học phần</h3>
                                </div>
                            </Divider>
                            <div className="col-12 p-0">
                                <p>Loại lớp học phần</p>
                                <span className="w-full">
                                    <Dropdown
                                        value={data?.sectionClassType}
                                        onChange={(e) => {
                                            handleOnChange('sectionClassType', e?.target.value);
                                            setClassType(e?.target.value);
                                        }}
                                        options={SectionClassTypeOptions}
                                        optionLabel="label"
                                        optionValue="key"
                                        placeholder="Hãy chọn loại cho lớp học phần"
                                        className="w-full"
                                    />
                                </span>
                            </div>
                            {!!classType && classType === 'practice' && (
                                <div className="col-12 p-0">
                                    <p>Thuộc lớp học phần lý thuyết</p>
                                    <span className="w-full">
                                        <Dropdown
                                            value={data?.refId || null}
                                            onChange={(e) => handleOnChange('refId', e?.target.value)}
                                            options={sectionClassOptions}
                                            optionLabel="name"
                                            optionValue="id"
                                            placeholder="Hãy chọn lớp học phần lý thuyết mà lớp thực hành này thuộc"
                                            className="w-full"
                                        />
                                    </span>
                                </div>
                            )}
                            <div className="col-12 p-0">
                                <p>Sinh viên tối đa cho lớp học</p>
                                <span className="w-full">
                                    <InputNumber
                                        value={data?.numberOfStudents}
                                        placeholder="Nhập sinh viên tối đa cho lớp học (Mặc định là 90 dành cho lớp Lý thuyết, 30 dành cho lớp Thực hành)"
                                        onChange={(e) => handleOnChange('numberOfStudents', e?.value)}
                                        className="w-full"
                                    />
                                </span>
                            </div>
                            <div className="col-12 p-0">
                                <p>Ghi chú lớp học phần</p>
                                <span className="w-full">
                                    <InputTextarea
                                        rows={6}
                                        value={data?.note || ''}
                                        placeholder="Nhập ghi chú cho lớp học phần (Không bắt buộc)"
                                        onChange={(e) => handleOnChange('note', e?.target.value)}
                                        className="w-full"
                                    />
                                </span>
                            </div>
                            <Divider align="left">
                                <div className="inline-flex align-items-center">
                                    <i className="pi pi-clock mr-2"></i>
                                    <h3 className="p-0 m-0">Thời gian và Phòng học</h3>
                                </div>
                            </Divider>
                            <div className="col-12 p-0 flex justify-content-start">
                                <Button
                                    className={`p-button font-bold mr-2`}
                                    icon={'pi pi-plus'}
                                    label={'Thêm mới'}
                                    onClick={() => setIsAddTime(true)}
                                />
                            </div>
                            <div className="col-12 p-0 mt-3">
                                {console.log(data)}
                                <DataTable
                                    emptyMessage="Chưa có thời gian học cho lớp học phần này..."
                                    value={
                                        data && data?.timeAndPlaces && data?.timeAndPlaces?.length > 0
                                            ? data.timeAndPlaces
                                            : []
                                    }
                                    tableStyle={{ minWidth: '50rem' }}
                                >
                                    <Column field="room" header="Phòng học"></Column>
                                    <Column field="dayOfTheWeek" header="Ngày học trong tuần"></Column>
                                    <Column field="periodStart" header="Tiết bắt đầu"></Column>
                                    <Column field="periodEnd" header="Tiết kết thúc"></Column>
                                    <Column field="note" header="Ghi chú"></Column>
                                    <Column
                                        field="action"
                                        header="Thao tác"
                                        body={(rowData, idx) => {
                                            return (
                                                <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                                    <Button
                                                        text
                                                        icon="pi pi-pencil"
                                                        rounded
                                                        raised
                                                        onClick={() => {
                                                            setTimeData({ ...rowData });
                                                            setIsAddTime(true);
                                                            setEditData({ ...rowData });
                                                        }}
                                                    />
                                                    <Button
                                                        text
                                                        icon="pi pi-times"
                                                        rounded
                                                        raised
                                                        onClick={() => {
                                                            handleOnDeleteTime(rowData);
                                                        }}
                                                    />
                                                </div>
                                            );
                                        }}
                                    ></Column>
                                </DataTable>
                            </div>
                        </div>
                        <br />
                        <hr />
                        <div className="flex col-12">
                            <Button
                                className={`col-6 p-button-lg font-bold mr-2`}
                                icon={'pi pi-send'}
                                label={'Xác nhận'}
                                onClick={handleOnSubmit}
                            />

                            <Button
                                className="col-6 p-button-lg font-bold"
                                icon={'pi pi-times'}
                                label={'Huỷ bỏ'}
                                onClick={handleHideForm}
                            />
                        </div>
                    </div>
                )}
            </Dialog>
            <Toast ref={toast} />
        </>
    );
});
export default SectionClassForm;
