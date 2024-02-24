import { isError, useQuery } from '@tanstack/react-query';
import { da } from 'date-fns/locale';
import moment from 'moment';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useState } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useImperativeHandle } from 'react';
import { forwardRef } from 'react';
import { createOrUpdateGenericFaculty } from '~/api/faculty/FacultyService';
import { getUserId } from '~/components/authentication/AuthUtils';

const FacultyForm = forwardRef((props, ref) => {
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
                detail: 'Tên khoa không được để trống!!',
            });
            isError = true;
        }

        if (!isError) {
            const courseData = await createOrUpdateGenericFaculty(getUserId(), toPostData);

            if (courseData?.id) {
                try {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Thao tác cập nhật khoa thành công!!',
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
            if (key === 'requireCourse') {
                setData({
                    ...data,
                    [key]: [...value],
                });
            } else {
                setData({ ...data, [key]: value });
            }
        },
        [data],
    );

    return (
        <Dialog
            pt={{ header: { className: 'p-0' } }}
            header={
                <h3 className="m-0 pb-0 p-3 font-bold">
                    {`${!!data?.id ? 'Cập nhật thông tin' : 'Thêm mới'} khoa`}
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
                    <Divider align="left">
                        <div className="inline-flex align-items-center">
                            <i className="pi pi-bars mr-2"></i>
                            <h3 className="p-0 m-0">Khoa</h3>
                        </div>
                    </Divider>
                    <div className="col-12 p-0">
                        <p>Mã khoa</p>
                        <span className="w-full">
                            <InputText
                                value={data?.name}
                                placeholder="Nhập mã khoa..."
                                onChange={(e) => handleOnChange('code', e?.target.value)}
                                className=" w-full"
                            />
                        </span>
                    </div>
                    <div className="col-12 p-0">
                        <p>Tên khoa</p>
                        <span className="w-full">
                            <InputText
                                value={data?.name}
                                placeholder="Nhập tên khoa..."
                                onChange={(e) => handleOnChange('name', e?.target.value)}
                                className=" w-full"
                            />
                        </span>
                    </div>
                    <div className="col-12 p-0">
                        <p>Logo Khoa</p>
                        <span className="w-full">
                            <InputText
                                placeholder="Link hình ảnh của logo..."
                                value={data?.logo}
                                onChange={(e) => handleOnChange('logo', e?.target.value)}
                                className=" w-full"
                            />
                        </span>
                    </div>
                    <div className="col-5 p-0">
                        <p>Ngày thành lập khoa</p>
                        <span className="w-full">
                            <Calendar
                                placeholder="Nhập ngày thành lập khoa"
                                className="w-full"
                                value={moment(data.establishmentDate, 'dd/MM/yyyy').toDate() || null}
                                onChange={(e) => setData({ ...data, establishmentDate: e.value })}
                            />
                        </span>
                    </div>
                    <Divider align="left">
                        <div className="inline-flex align-items-center">
                            <i className="pi pi-bars mr-2"></i>
                            <h3 className="p-0 m-0">Thông tin trưởng khoa</h3>
                        </div>
                    </Divider>
                    <div className="col-12 p-0">
                        <p>Họ và tên</p>
                        <span className="w-full">
                            <InputText
                                placeholder="Nhập họ và tên trưởng khoa.."
                                value={data?.facultyHeadName}
                                onChange={(e) => handleOnChange('facultyHeadName', e.target.value)}
                                className=" w-full"
                            />
                        </span>
                    </div>
                    <div className="col-12 p-0">
                        <p>Email</p>
                        <span className="w-full">
                            <InputText
                                placeholder="Nhập email liên lạc trưởng khoa.."
                                value={data?.facultyHeadEmail}
                                onChange={(e) => handleOnChange('facultyHeadEmail', e.target.value)}
                                className=" w-full"
                            />
                        </span>
                    </div>
                    <div className="col-12 p-0">
                        <p>Số điện thoại</p>
                        <span className="w-full">
                            <InputText
                                placeholder="Nhập số điện thoại liên lạc trưởng khoa.."
                                value={data?.facultyHeadPhone}
                                onChange={(e) => handleOnChange('facultyHeadPhone', e.target.value)}
                                className=" w-full"
                            />
                        </span>
                    </div>
                </div>
                <div className="flex col-12">
                    <Button className={`col-6 mr-2`} icon={'pi pi-send'} label={'Submit'} onClick={handleOnSubmit} />
                    <Button className="col-6 " icon={'pi pi-send'} label={'Cancel'} onClick={handleHideForm} />
                </div>
            </div>
            <Toast ref={toast} />
        </Dialog>
    );
});

export default FacultyForm;
