import { useQuery } from '@tanstack/react-query';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { useState } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useImperativeHandle } from 'react';
import { forwardRef } from 'react';
import { getUserId } from '~/components/authentication/AuthUtils';
import { getListFacultyInfo } from '~/api/faculty/FacultyService';
import { InputText } from 'primereact/inputtext';
import { createOrUpdateGenericSpecialization } from '~/api/specialization/SpecializationService';

const QueryKeyFacultyOptions = 'Faculty-Options';

const SpecializationForm = forwardRef((props, ref) => {
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

    const { data: facultyOptions } = useQuery(
        [QueryKeyFacultyOptions, getUserId()],
        () => getListFacultyInfo(getUserId(), {}, null, true),
        { enabled: !!getUserId() },
    );

    const handleHideForm = useCallback(() => {
        setData({});
        setVisible(false);
    }, []);

    const handleOnSubmit = useCallback(async () => {
        let isError = false;

        if (!data?.facultyId) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Chuyên ngành không được để trống!!',
            });
            isError = true;
        }

        if (!data?.name) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Tên lớp học phần không được để trống!!',
            });
            isError = true;
        }

        if (!data?.code) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Mã lớp học phần không được để trống!!',
            });
            isError = true;
        }

        if (!isError) {
            let toPostData = {
                ...data,
            };
            debugger;
            const specializationData = await createOrUpdateGenericSpecialization(getUserId(), toPostData);

            if (specializationData?.id) {
                try {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Thao tác cập nhật chuyên ngành thành công!!',
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
                pt={{ header: { className: 'p-0' } }}
                header={
                    <h3 className="m-0 pb-0 p-3 font-bold">
                        {`${!!data?.id ? 'Cập nhật thông tin' : 'Thêm mới'} chuyên ngành`}
                        <hr />
                    </h3>
                }
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
                            <p>Khoa</p>
                            <span className="w-full">
                                <Dropdown
                                    value={data?.facultyId}
                                    onChange={(e) => handleOnChange('specializationId', e?.target.value)}
                                    options={facultyOptions}
                                    optionLabel="name"
                                    optionValue="id"
                                    placeholder="Hãy chọn khoa cho chuyên ngành..."
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Tên chuyên ngành</p>
                            <span className="w-full">
                                <InputText
                                    value={data?.name}
                                    placeholder="Nhập tên chuyên ngành..."
                                    onChange={(e) => handleOnChange('name', e?.target.value)}
                                    className=" w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Mã chuyên ngành</p>
                            <span className="w-full">
                                <InputText
                                    value={data?.code}
                                    placeholder="Nhập mã chuyên ngành..."
                                    onChange={(e) => handleOnChange('code', e?.target.value)}
                                    className=" w-full"
                                />
                            </span>
                        </div>
                    </div>
                    <hr />
                    <div className="flex col-12">
                        <Button
                            className={`col-6 py-2 p-button-lg font-bold mr-2`}
                            icon={'pi pi-send'}
                            label={'Xác nhận'}
                            onClick={handleOnSubmit}
                        />

                        <Button
                            className="col-6 py-2 p-button-lg font-bold"
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
export default SpecializationForm;
