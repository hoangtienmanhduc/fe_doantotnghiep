import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useState } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useImperativeHandle } from 'react';
import { forwardRef } from 'react';
import { createOrUpdateGenericAcademicYear } from '~/api/academic-year/AcademicYearService';
import { getUserId } from '~/components/authentication/AuthUtils';

const AcademicYearForm = forwardRef((props, ref) => {
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

    const handleHideForm = useCallback(() => {
        setData({});
        setVisible(false);
    }, []);

    const handleOnSubmit = useCallback(async () => {
        let toPostData = {
            ...data,
        };

        let isError = false;
        if (!data?.name) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Niên khoá của năm học không được để trống!!',
            });
            isError = true;
        }

        if (!isError) {
            const courseData = await createOrUpdateGenericAcademicYear(getUserId(), toPostData);

            if (courseData?.id) {
                try {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Thao tác cập nhật niên khoá thành công!!',
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
            pt={{ header: { className: 'p-0' } }}
            header={
                <h3 className="m-0 p-3 font-bold">
                    {`${!!data?.id ? 'Cập nhật thông tin' : 'Thêm mới'} niên khoá`}
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
                <div className="col-12">
                    <div className="col-12 p-0">
                        <p>Niên khoá năm học</p>
                        <span className="w-full">
                            <InputText
                                placeholder="Nhập niên khoá cho năm học..."
                                value={data?.name}
                                onChange={(e) => handleOnChange('name', e?.target.value)}
                                className=" w-full"
                            />
                        </span>
                    </div>
                </div>
                <hr />
                <div className="flex col-12 ">
                    <Button className={`col-6 mr-2`} icon={'pi pi-send'} label={'Submit'} onClick={handleOnSubmit} />
                    <Button className="col-6" icon={'pi pi-times'} label={'Cancel'} onClick={handleHideForm} />
                </div>
            </div>
            <Toast ref={toast} />
        </Dialog>
    );
});

export default AcademicYearForm;
