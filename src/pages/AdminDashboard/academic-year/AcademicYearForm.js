import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import React, { useState } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useImperativeHandle } from 'react';
import { forwardRef } from 'react';
import { createOrUpdateGenericAcademicYear } from '~/api/academic-year/AcademicYearService';
import { getUserId } from '~/components/authentication/AuthUtils';
import { InputMask } from 'primereact/inputmask';
import { Calendar } from 'primereact/calendar';
import { Divider } from 'primereact/divider';

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
            if (!!courseData?.id) {
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
        <React.Fragment>
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
                breakpoints={{ '960px': '50vw', '641px': '60vw' }}
                visible={visible}
            >
                <div>
                    <div className="col-12">
                        <Divider align="left">
                            <div className="inline-flex align-items-center">
                                <i className="pi pi-calendar mr-2"></i>
                                <h3 className="p-0 m-0">Năm học</h3>
                            </div>
                        </Divider>
                        <div className="col-12 p-0">
                            <p>Niên khoá năm học</p>
                            <span className="w-full">
                                <InputMask
                                    className="w-full"
                                    id="school-year"
                                    mask="9999-9999"
                                    placeholder="9999-9999"
                                    value={data?.name}
                                    onChange={(e) => handleOnChange('name', e?.target.value)}
                                ></InputMask>
                            </span>
                        </div>
                        <div className="flex justify-content-between align-items-center col-12 p-0">
                            <div className="col-5 p-0">
                                <p>Thời gian bắt đầu năm học</p>
                                <span className="w-full">
                                    <Calendar
                                        className="w-full"
                                        showTime
                                        hourFormat="24"
                                        onChange={(e) => handleOnChange('academicYearStartTime', e?.target.value)}
                                    />
                                </span>
                            </div>
                            <Divider align="center" layout="vertical">
                                <span className="p-tag">Đến</span>
                            </Divider>
                            <div className="col-5 p-0">
                                <p>Thời gian kết thúc năm học</p>
                                <span className="w-full">
                                    <InputMask
                                        className="w-full"
                                        showTime
                                        hourFormat="24"
                                        onChange={(e) => handleOnChange('academicYearEndTime', e?.target.value)}
                                    ></InputMask>
                                </span>
                            </div>
                        </div>
                        <Divider align="left">
                            <div className="inline-flex align-items-center">
                                <i className="pi pi-bars mr-2"></i>
                                <h3 className="p-0 m-0">Học kỳ</h3>
                            </div>
                        </Divider>
                        <div className="col-12 p-0">
                            <p>Tên học kỳ 1</p>
                            <span className="w-full">
                                <InputText
                                    value={data?.name}
                                    placeholder="Nhập tên học kỳ I... "
                                    onChange={(e) => handleOnChange('name', e?.target.value)}
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="flex justify-content-between align-items-center col-12 p-0">
                            <div className="col-5 p-0">
                                <p>Thời gian bắt đầu học kỳ 1</p>
                                <span className="w-full">
                                    <Calendar
                                        className="w-full"
                                        showTime
                                        hourFormat="24"
                                        onChange={(e) => handleOnChange('termOneStartTime', e?.target.value)}
                                    />
                                </span>
                            </div>
                            <Divider align="center" layout="vertical">
                                <span className="p-tag">Đến</span>
                            </Divider>
                            <div className="col-5 p-0">
                                <p>Thời gian kết thúc học kỳ 1</p>
                                <span className="w-full">
                                    <InputMask
                                        className="w-full"
                                        showTime
                                        hourFormat="24"
                                        onChange={(e) => handleOnChange('termOneEndTime', e?.target.value)}
                                    ></InputMask>
                                </span>
                            </div>
                        </div>
                        <div className="col-12 p-0">
                            <p>Tên học kỳ 2</p>
                            <span className="w-full">
                                <InputText
                                    value={data?.name}
                                    placeholder="Nhập tên học kỳ II... "
                                    onChange={(e) => handleOnChange('name', e?.target.value)}
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="flex justify-content-between align-items-center col-12 p-0">
                            <div className="col-5 p-0">
                                <p>Thời gian bắt đầu học kỳ 2</p>
                                <span className="w-full">
                                    <Calendar
                                        className="w-full"
                                        showTime
                                        hourFormat="24"
                                        onChange={(e) => handleOnChange('termTwoStartTime', e?.target.value)}
                                    />
                                </span>
                            </div>
                            <Divider align="center" layout="vertical">
                                <span className="p-tag">Đến</span>
                            </Divider>
                            <div className="col-5 p-0">
                                <p>Thời gian kết thúc học kỳ 2</p>
                                <span className="w-full">
                                    <InputMask
                                        className="w-full"
                                        showTime
                                        hourFormat="24"
                                        onChange={(e) => handleOnChange('termTwoEndTime', e?.target.value)}
                                    ></InputMask>
                                </span>
                            </div>
                        </div>
                        <div className="col-12 p-0">
                            <p>Tên học kỳ 3</p>
                            <span className="w-full">
                                <InputText
                                    value={data?.name}
                                    placeholder="Nhập tên học kỳ III... "
                                    onChange={(e) => handleOnChange('name', e?.target.value)}
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="flex justify-content-between align-items-center col-12 p-0">
                            <div className="col-5 p-0">
                                <p>Thời gian bắt đầu học kỳ 3</p>
                                <span className="w-full">
                                    <Calendar
                                        className="w-full"
                                        showTime
                                        hourFormat="24"
                                        onChange={(e) => handleOnChange('termThreeStartTime', e?.target.value)}
                                    />
                                </span>
                            </div>
                            <Divider align="center" layout="vertical">
                                <span className="p-tag">Đến</span>
                            </Divider>
                            <div className="col-5 p-0">
                                <p>Thời gian kết thúc học kỳ 3</p>
                                <span className="w-full">
                                    <InputMask
                                        className="w-full"
                                        showTime
                                        hourFormat="24"
                                        onChange={(e) => handleOnChange('termThreeEndTime', e?.target.value)}
                                    ></InputMask>
                                </span>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="flex col-12 ">
                        <Button
                            className={`col-6 mr-2`}
                            icon={'pi pi-send'}
                            label={'Submit'}
                            onClick={handleOnSubmit}
                        />
                        <Button className="col-6" icon={'pi pi-times'} label={'Cancel'} onClick={handleHideForm} />
                    </div>
                </div>
            </Dialog>
            <Toast ref={toast} />
        </React.Fragment>
    );
});

export default AcademicYearForm;
