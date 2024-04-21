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
import { createOrUpdateGenericSpecializationClass } from '~/api/specialization/SpecializationClassService';
import { getListSpecializationInfo } from '~/api/specialization/SpecializationService';
import { Calendar } from 'primereact/calendar';
import { getListLecturerInfo } from '~/api/lecturer/LecturerService';
import { InputNumber } from 'primereact/inputnumber';

const QueryKeySpecializationOptions = 'Specialization-Options';
const QueryKeyLecturerOptions = 'Lecturer-Options';

const SpecializationClassForm = forwardRef((props, ref) => {
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

    const { data: specializationOptions } = useQuery(
        [QueryKeySpecializationOptions, getUserId()],
        () => getListSpecializationInfo(getUserId(), {}, null, true),
        { enabled: !!getUserId() },
    );

    const { data: lecturerOptions } = useQuery(
        [QueryKeyLecturerOptions, getUserId()],
        () => getListLecturerInfo(getUserId(), {}, null, true),
        { enabled: !!getUserId() },
    );

    const handleHideForm = useCallback(() => {
        setData({});
        setVisible(false);
    }, []);

    const handleOnSubmit = useCallback(async () => {
        let isError = false;
        if (!data?.specializationId) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Chuyên ngành của lớp chuyên ngành không được để trống!!',
            });
            isError = true;
        }

        if (!data?.schoolYear) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Niên khoá cho lớp chuyên ngành không được để trống!!',
            });
            isError = true;
        }

        if (!isError) {
            let toPostData = {
                ...data,
                schoolYear: data.schoolYear,
            };
            const specializationClassData = await createOrUpdateGenericSpecializationClass(getUserId(), toPostData);

            if (specializationClassData?.id) {
                try {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Thao tác cập nhật lớp chuyên ngành thành công!!',
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
        <>
            <Dialog
                header={
                    <h3 className="m-0 p-3 pb-0 font-bold">
                        {`${!!data?.id ? 'Cập nhật thông tin' : 'Thêm mới'} lớp chuyên ngành`}
                        <hr />
                    </h3>
                }
                pt={{ header: { className: 'p-0' } }}
                onHide={handleHideForm}
                style={{
                    width: '60vw',
                }}
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                visible={visible}
            >
                <div>
                    <div className="col-12 p-0">
                        <div className="col-12 p-0">
                            <p>Thuộc chuyên ngành</p>
                            <span className="w-full">
                                <Dropdown
                                    value={data?.specializationId || null}
                                    onChange={(e) => handleOnChange('specializationId', e?.target.value)}
                                    options={specializationOptions}
                                    optionLabel="name"
                                    optionValue="id"
                                    placeholder="Hãy chọn chuyên ngành cho lớp chuyên ngành..."
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Giảng viên chủ nhiệm lớp</p>
                            <span className="w-full">
                                <Dropdown
                                    value={data?.lecturerId || null}
                                    onChange={(e) => handleOnChange('lecturerId', e?.target.value)}
                                    options={lecturerOptions}
                                    optionLabel="fullName"
                                    optionValue="id"
                                    placeholder="Hãy chọn giảng viên chủ nhiệm cho lớp chuyên ngành..."
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <p>Niên khoá lớp</p>
                        <span className="w-full">
                            <Calendar
                                placeholder="Chọn năm học cho lớp chuyên ngành"
                                className="w-full"
                                view="year"
                                dateFormat="yy"
                                value={data?.schoolYear ? new Date(data.schoolYear, 0) : null}
                                onChange={(e) => setData({ ...data, schoolYear: e.value?.getFullYear() })}
                            />
                        </span>
                        <div className="col-12 p-0">
                            <p>Tên lớp học phần</p>
                            <span className="w-full">
                                <InputText
                                    value={data?.name || ''}
                                    placeholder="Nhập tên lớp chuyên ngành (Nếu trường này để trống thì tên sẽ tự động được đặt)"
                                    onChange={(e) => handleOnChange('name', e?.target.value)}
                                    className=" w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Tổng số sinh viên trong lớp</p>
                            <span className="w-full">
                                <InputNumber
                                    value={data?.numberOfStudents}
                                    placeholder="Nhập số sinh viên tối đa(Bắt buộc)"
                                    onChange={(e) => handleOnChange('numberOfStudents', e?.value)}
                                    className="w-full"
                                />
                            </span>
                        </div>
                    </div>
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
            </Dialog>
            <Toast ref={toast} />
        </>
    );
});
export default SpecializationClassForm;
