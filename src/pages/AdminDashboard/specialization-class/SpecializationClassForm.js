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
import { InputMask } from 'primereact/inputmask';
import { Calendar } from 'primereact/calendar';
import moment from 'moment';

const QueryKeySpecializationOptions = 'Specialization-Options';

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

    const handleHideForm = useCallback(() => {
        setData({});
        setVisible(false);
    }, []);

    const handleOnSubmit = useCallback(async () => {
        let isError = false;
        debugger;
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
                schoolYear: typeof data.schoolYear === 'string' ? data.schoolYear : data.schoolYear.getFullYear(),
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
                    <p>Niên khoá lớp</p>
                    <span className="w-full">
                        <Calendar
                            placeholder="Chọn năm học cho lớp chuyên ngành"
                            className="w-full"
                            view="year"
                            dateFormat="yy"
                            value={data?.schoolYear ? data.schoolYear : JSON.stringify(new Date().getFullYear())}
                            onChange={(e) => setData({ ...data, schoolYear: e.value })}
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
            <Toast ref={toast} />
        </Dialog>
    );
});
export default SpecializationClassForm;
