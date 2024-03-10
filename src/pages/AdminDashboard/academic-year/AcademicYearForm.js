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
import moment from 'moment';

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
        let isError = false;

        // Check dữ liệu của form
        if (!data?.academicYearName) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Tên niên khoá của năm học không được để trống!!',
            });
            isError = true;
        }

        if (!data?.firstTermName) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Tên của học kỳ đầu không được để trống!!',
            });
            isError = true;
        }

        if (!data?.firstTermStart) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Thời gian bắt đầu của học kỳ đầu không được để trống!!',
            });
            isError = true;
        }

        if (!data?.firstTermEnd) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Thời gian kết thúc của học kỳ đầu không được để trống!!',
            });
            isError = true;
        }

        if (!data?.secondTermName) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Tên của học kỳ hai không được để trống!!',
            });
            isError = true;
        }

        if (!data?.secondTermStart) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Thời gian bắt đầu của học kỳ hai không được để trống!!',
            });
            isError = true;
        }

        if (!data?.secondTermEnd) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Thời gian kết thúc của học kỳ hai không được để trống!!',
            });
            isError = true;
        }

        if (!data?.thirdTermName) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Tên của học kỳ ba không được để trống!!',
            });
            isError = true;
        }

        if (!data?.thirdTermStart) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Thời gian bắt đầu của học kỳ ba không được để trống!!',
            });
            isError = true;
        }

        if (!data?.thirdTermEnd) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Thời gian kết thúc của học kỳ ba không được để trống!!',
            });
            isError = true;
        }

        if (isError) {
            return;
        } else {
            // Validate thời gian hợp lệ của các học kỳ
            if (new Date().getTime() > new Date(data.firstTermStart).getTime()) {
                toast.current.show({
                    severity: 'info',
                    summary: 'Info',
                    detail: 'Thời gian bắt đầu của học kỳ đầu phải sau ngày hiện tại!!',
                });
                return;
            }

            if (new Date(data.firstTermStart).getTime() > new Date(data.firstTermEnd).getTime()) {
                toast.current.show({
                    severity: 'info',
                    summary: 'Info',
                    detail: 'Thời gian kết thúc của học kỳ đầu phải sau thời gian bắt đầu của học kỳ!!',
                });
                return;
            }

            if (new Date(data.firstTermEnd).getTime() > new Date(data.secondTermStart).getTime()) {
                toast.current.show({
                    severity: 'info',
                    summary: 'Info',
                    detail: 'Thời gian bắt đầu của học kỳ hai phải sau thời gian kết thúc của học kỳ một!!',
                });
                return;
            }

            if (new Date(data.secondTermStart).getTime() > new Date(data.secondTermEnd).getTime()) {
                toast.current.show({
                    severity: 'info',
                    summary: 'Info',
                    detail: 'Thời gian kết thúc của học kỳ hai phải sau thời gian bắt đầu của học kỳ!!',
                });
                return;
            }

            if (new Date(data.secondTermEnd).getTime() > new Date(data.thirdTermStart).getTime()) {
                toast.current.show({
                    severity: 'info',
                    summary: 'Info',
                    detail: 'Thời gian bắt đầu của học kỳ ba phải sau thời gian kết thúc của học kỳ hai!!',
                });
                return;
            }

            if (new Date(data.thirdTermStart).getTime() > new Date(data.thirdTermEnd).getTime()) {
                toast.current.show({
                    severity: 'info',
                    summary: 'Info',
                    detail: 'Thời gian kết thúc của học kỳ ba phải sau thời gian bắt đầu của học kỳ!!',
                });
                return;
            }
        }

        const toPostData = {
            id: data?.id ? data.id : null,
            name: data?.academicYearName,
            ...data,
        };

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
                    <h3 className="m-0 pb-0 p-3 font-bold">
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
                                    placeholder="20xx-20xx"
                                    value={data?.academicYearName || ''}
                                    onChange={(e) => handleOnChange('academicYearName', e.target.value)}
                                ></InputMask>
                            </span>
                        </div>
                        <Divider align="left">
                            <div className="inline-flex align-items-center">
                                <i className="pi pi-bars mr-2"></i>
                                <h3 className="p-0 m-0">Học kỳ</h3>
                            </div>
                        </Divider>
                        <div className="col-12 p-0">
                            <p>
                                <strong>Tên học kỳ 1</strong>
                            </p>
                            <span className="w-full">
                                <InputText
                                    value={data?.firstTermName || ''}
                                    placeholder="Nhập tên học kỳ I... "
                                    onChange={(e) => setData({ ...data, firstTermName: e.target.value })}
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="flex justify-content-between align-items-center col-12 p-0">
                            <div className="col-5 p-0">
                                <p>Thời gian bắt đầu học kỳ 1</p>
                                <span className="w-full">
                                    <Calendar
                                        placeholder="Nhập thời gian bắt đầu học kỳ 1"
                                        className="w-full"
                                        value={
                                            data?.firstTermStart
                                                ? moment(data?.firstTermStart, 'dd/MM/yyyy').toDate()
                                                : new Date()
                                        }
                                        onChange={(e) => setData({ ...data, firstTermStart: e.value })}
                                    />
                                </span>
                            </div>
                            <Divider align="center" layout="vertical">
                                <span className="p-tag">Đến</span>
                            </Divider>
                            <div className="col-5 p-0">
                                <p>Thời gian kết thúc học kỳ 1</p>
                                <span className="w-full">
                                    <Calendar
                                        placeholder="Nhập thời gian kết thúc học kỳ 1"
                                        className="w-full"
                                        value={
                                            data?.firstTermEnd
                                                ? moment(data?.firstTermEnd, 'dd/MM/yyyy').toDate()
                                                : new Date()
                                        }
                                        onChange={(e) => setData({ ...data, firstTermEnd: e.value })}
                                    ></Calendar>
                                </span>
                            </div>
                        </div>
                        <div className="col-12 p-0">
                            <p>
                                <strong>Tên học kỳ 2</strong>
                            </p>
                            <span className="w-full">
                                <InputText
                                    value={data?.secondTermName || ''}
                                    placeholder="Nhập tên học kỳ II... "
                                    className="w-full"
                                    onChange={(e) => setData({ ...data, secondTermName: e.target.value })}
                                />
                            </span>
                        </div>
                        <div className="flex justify-content-between align-items-center col-12 p-0">
                            <div className="col-5 p-0">
                                <p>Thời gian bắt đầu học kỳ 2</p>
                                <span className="w-full">
                                    <Calendar
                                        placeholder="Nhập thời gian bắt đầu học kỳ 2"
                                        className="w-full"
                                        value={
                                            data?.secondTermStart
                                                ? moment(data?.secondTermStart, 'dd/MM/yyyy').toDate()
                                                : new Date()
                                        }
                                        onChange={(e) => setData({ ...data, secondTermStart: e.value })}
                                    />
                                </span>
                            </div>
                            <Divider align="center" layout="vertical">
                                <span className="p-tag">Đến</span>
                            </Divider>
                            <div className="col-5 p-0">
                                <p>Thời gian kết thúc học kỳ 2</p>
                                <span className="w-full">
                                    <Calendar
                                        placeholder="Nhập thời gian kết thúc học kỳ 2"
                                        className="w-full"
                                        value={
                                            data?.secondTermEnd
                                                ? moment(data?.secondTermEnd, 'dd/MM/yyyy').toDate()
                                                : new Date()
                                        }
                                        onChange={(e) => setData({ ...data, secondTermEnd: e.value })}
                                    ></Calendar>
                                </span>
                            </div>
                        </div>
                        <div className="col-12 p-0">
                            <p>
                                <strong>Tên học kỳ 3</strong>
                            </p>
                            <span className="w-full">
                                <InputText
                                    value={data?.thirdTermName || ''}
                                    placeholder="Nhập tên học kỳ III... "
                                    className="w-full"
                                    onChange={(e) => setData({ ...data, thirdTermName: e.target.value })}
                                />
                            </span>
                        </div>
                        <div className="flex justify-content-between align-items-center col-12 p-0">
                            <div className="col-5 p-0">
                                <p>Thời gian bắt đầu học kỳ 3</p>
                                <span className="w-full">
                                    <Calendar
                                        className="w-full"
                                        placeholder="Nhập thời gian bắt đầu học kỳ 3"
                                        value={
                                            data?.thirdTermStart
                                                ? moment(data?.thirdTermStart, 'dd/MM/yyyy').toDate()
                                                : new Date()
                                        }
                                        onChange={(e) => setData({ ...data, thirdTermStart: e.value })}
                                    />
                                </span>
                            </div>
                            <Divider align="center" layout="vertical">
                                <span className="p-tag">Đến</span>
                            </Divider>
                            <div className="col-5 p-0">
                                <p>Thời gian kết thúc học kỳ 3</p>
                                <span className="w-full">
                                    <Calendar
                                        placeholder="Nhập thời gian kết thúc học kỳ 3"
                                        className="w-full"
                                        value={
                                            data?.thirdTermEnd
                                                ? moment(data?.thirdTermEnd, 'dd/MM/yyyy').toDate()
                                                : new Date()
                                        }
                                        onChange={(e) => setData({ ...data, thirdTermEnd: e.value })}
                                    ></Calendar>
                                </span>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="flex col-12 ">
                        <Button
                            className={`col-6 mr-2`}
                            icon={'pi pi-send'}
                            label={'Xác nhận'}
                            onClick={handleOnSubmit}
                        />
                        <Button className="col-6" icon={'pi pi-times'} label={'Huỷ bỏ'} onClick={handleHideForm} />
                    </div>
                </div>
            </Dialog>
            <Toast ref={toast} />
        </React.Fragment>
    );
});

export default AcademicYearForm;
