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
import { createOrUpdateGenericSectionClass } from '~/api/section/SectionClassService';
import { SectionClassTypeOptions, dayInWeekOptions } from './SectionClassConstant';
import { Calendar } from 'primereact/calendar';
import { getListLecturerInfo } from '~/api/lecturer/LecturerService';
import { getListSectionInfo } from '~/api/section/SectionService';

const QueryKeyLecturerOptions = 'Lecturer-Options';
const QueryKeySectionOptions = 'Section-Options';

const SectionClassForm = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        showForm: handleShowForm,
        hideForm: handleHideForm,
    }));

    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({});
    const toast = useRef(null);
    const handleShowForm = useCallback((data) => {
        setData(data && Object.keys(data)?.length > 0 ? { ...data } : {});
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

    const handleHideForm = useCallback(() => {
        setData({});
        setVisible(false);
    }, []);

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

        if (!data?.room) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Phòng học không được để trống!!',
            });
            isError = true;
        }

        if (!data?.periodFrom) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Tiết bắt đầu không được để trống!!',
            });
            isError = true;
        }

        if (!data?.periodTo) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Tiết kết thúc không được để trống!!',
            });
            isError = true;
        }

        if (!data?.dayInWeek) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Thứ trong tuần không được để trống!!',
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
        if (!data?.startedAt) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Thời gian mở lớp không được để trống!!',
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

    return (
        <Dialog
            header={
                <h3 className="m-0 p-3 font-bold">
                    {`${!!data?.id ? 'Cập nhật thông tin' : 'Thêm mới'} lớp học phần`}
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
            <div>
                <div className="col-12">
                    <div className="col-12 p-0">
                        <p>Học phần</p>
                        <span className="w-full">
                            <Dropdown
                                value={data.sectionId}
                                onChange={(e) => handleOnChange('sectionId', e?.target.value)}
                                options={sectionOptions}
                                optionLabel="name"
                                optionValue="id"
                                placeholder="Hãy chọn học phần của lớp..."
                                className="w-full"
                            />
                        </span>
                    </div>
                    <div className="col-12 p-0">
                        <p>Giảng viên phụ trách</p>
                        <span className="w-full">
                            <Dropdown
                                value={data?.lecturerId}
                                onChange={(e) => handleOnChange('lecturerId', e?.target.value)}
                                options={lecturerOptions}
                                optionLabel="name"
                                optionValue="id"
                                placeholder="Hãy chọn giảng viên phụ trách..."
                                className="w-full"
                            />
                        </span>
                    </div>
                    <div className="col-12 p-0">
                        <p>Loại lớp học phần</p>
                        <span className="w-full">
                            <Dropdown
                                value={data?.sectionClassType}
                                onChange={(e) => handleOnChange('sectionClassType', e?.target.value)}
                                options={SectionClassTypeOptions}
                                optionLabel="label"
                                optionValue="key"
                                placeholder="Hãy chọn loại lớp học phần..."
                                className="w-full"
                            />
                        </span>
                    </div>
                    <div className="col-12 p-0">
                        <p>Phòng học</p>
                        <span className="w-full">
                            <InputText
                                value={data?.room}
                                placeholder="Nhập phòng học..."
                                onChange={(e) => handleOnChange('room', e?.target.value)}
                                className=" w-full"
                            />
                        </span>
                    </div>
                    <div className="col-12 p-0">
                        <p>Tiết bắt đầu</p>
                        <span className="w-full">
                            <InputNumber
                                value={data?.periodFrom}
                                placeholder="Nhập tiết bắt đầu tiết học..."
                                onChange={(e) => handleOnChange('periodFrom', e?.value)}
                                className="w-full"
                            />
                        </span>
                    </div>
                    <div className="col-12 p-0">
                        <p>Tiết kết thúc</p>
                        <span className="w-full">
                            <InputNumber
                                value={data?.periodTo}
                                placeholder="Nhập tiết kết thúc tiết học..."
                                onChange={(e) => handleOnChange('periodTo', e?.value)}
                                className="w-full"
                            />
                        </span>
                    </div>
                    <div className="col-12 p-0">
                        <p>Thứ trong tuần</p>
                        <span className="w-full">
                            <Dropdown
                                value={data?.dayInWeek}
                                onChange={(e) => handleOnChange('dayInWeek', e?.target.value)}
                                options={dayInWeekOptions}
                                placeholder="Hãy chọn thứ trong tuần..."
                                className="w-full"
                            />
                        </span>
                    </div>
                    <div className="col-12 p-0">
                        <p>Sinh viên tối đa cho lớp học</p>
                        <span className="w-full">
                            <InputNumber
                                value={data?.numberOfStudents}
                                placeholder="Nhập sinh viên tối đa cho lớp học"
                                onChange={(e) => handleOnChange('numberOfStudents', e?.value)}
                                className="w-full"
                            />
                        </span>
                    </div>
                    <div className="col-12 p-0">
                        <p>Thời gian bắt đầu lớp học</p>
                        <span className="w-full">
                            <Calendar
                                value={data?.startedAt}
                                placeholder="Hãy chọn thời gian bắt đầu tiết học..."
                                onChange={(e) => handleOnChange('startedAt', e?.value)}
                                className="w-full"
                            />
                        </span>
                    </div>
                </div>
                <div className="flex col-12">
                    <Button
                        className={`col-6 p-button-lg font-bold mr-2`}
                        icon={'pi pi-send'}
                        label={'Submit'}
                        onClick={handleOnSubmit}
                    />

                    <Button
                        className="col-6 p-button-lg font-bold"
                        icon={'pi pi-send'}
                        label={'Cancel'}
                        onClick={handleHideForm}
                    />
                </div>
            </div>
            <Toast ref={toast} />
        </Dialog>
    );
});
export default SectionClassForm;
