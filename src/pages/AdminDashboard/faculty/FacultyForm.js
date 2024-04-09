import { isError, useQuery } from '@tanstack/react-query';
import { da } from 'date-fns/locale';
import moment from 'moment';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useState } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useImperativeHandle } from 'react';
import { forwardRef } from 'react';
import { createOrUpdateGenericFaculty } from '~/api/faculty/FacultyService';
import { getUserId } from '~/components/authentication/AuthUtils';
import ImageUploader from '~/components/utils/image-uploader/ImageUploader';

const FacultyForm = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        showForm: handleShowForm,
        hideForm: handleHideForm,
    }));

    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({});
    const toast = useRef(null);
    const facultyLogoRef = useRef(null);
    const handleShowForm = useCallback((data) => {
        setData(data && Object.keys(data)?.length > 0 ? { ...data } : {});
        setVisible(true);
    }, []);

    const handleHideForm = useCallback(() => {
        setVisible(false);
    }, []);

    const handleOnSubmit = useCallback(async () => {
        let isError = false;
        if (!data?.name) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Tên khoa không được để trống!!',
            });
            isError = true;
        }
        debugger;
        if (!facultyLogoRef?.current.value) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Logo của khoa không được để trống!!',
            });
            isError = true;
        }

        if (!data?.headName) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Tên trưởng khoa không được để trống!!',
            });
            isError = true;
        }

        if (!data?.headEmail) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Email liên lạc của trưởng khoa không được để trống!!',
            });
            isError = true;
        }

        if (!isError) {
            let toPostData = {
                ...data,
                logo: facultyLogoRef?.current.value,
            };

            const faculty = await createOrUpdateGenericFaculty(getUserId(), toPostData);

            if (faculty?.id) {
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

    const handleOnImage = useCallback((imageUrls) => {
        facultyLogoRef.current = imageUrls;
    }, []);

    return (
        <>
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
                            <p>Tên khoa</p>
                            <span className="w-full">
                                <InputText
                                    value={data?.name || ''}
                                    placeholder="Nhập tên khoa (Bắt buộc)"
                                    onChange={(e) => handleOnChange('name', e?.target.value)}
                                    className=" w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Ngày thành lập khoa</p>
                            <span className="w-full">
                                <Calendar
                                    placeholder="Chọn ngày thành lập khoa"
                                    className="w-full"
                                    value={data?.establishmentDate ? moment(data?.establishmentDate).toDate() : null}
                                    onChange={(e) => setData({ ...data, establishmentDate: e.value })}
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Logo Khoa</p>
                            <span className="w-full">
                                <ImageUploader
                                    id={'logo'}
                                    initialImage={data?.logo || ''}
                                    ref={(el) => {
                                        facultyLogoRef.current = el;
                                    }}
                                    callBack={handleOnImage}
                                    multiple={false}
                                    extraData={false}
                                />
                            </span>
                        </div>
                        <Divider align="left">
                            <div className="inline-flex align-items-center">
                                <i className="pi pi-user mr-2"></i>
                                <h3 className="p-0 m-0">Thông tin trưởng khoa</h3>
                            </div>
                        </Divider>
                        <div className="col-12 p-0">
                            <p>Họ và tên</p>
                            <span className="w-full">
                                <InputText
                                    placeholder="Nhập họ và tên trưởng khoa (Bắt buộc)"
                                    value={data?.headName || ''}
                                    onChange={(e) => handleOnChange('headName', e.target.value)}
                                    className=" w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Email</p>
                            <span className="w-full">
                                <InputText
                                    placeholder="Nhập email liên lạc trưởng khoa (Bắt buộc)"
                                    value={data?.headEmail || ''}
                                    onChange={(e) => handleOnChange('headEmail', e.target.value)}
                                    className=" w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Số điện thoại</p>
                            <span className="w-full">
                                <InputText
                                    placeholder="Nhập số điện thoại liên lạc trưởng khoa (Không bắt buộc)"
                                    value={data?.headPhone || ''}
                                    onChange={(e) => handleOnChange('headPhone', e.target.value)}
                                    className=" w-full"
                                />
                            </span>
                        </div>
                    </div>
                    <div className="flex col-12">
                        <Button
                            className={`col-6 mr-2`}
                            icon={'pi pi-send'}
                            label={'Xác nhận'}
                            onClick={handleOnSubmit}
                        />
                        <Button className="col-6 " icon={'pi pi-times'} label={'Huỷ bỏ'} onClick={handleHideForm} />
                    </div>
                </div>
            </Dialog>
            <Toast ref={toast} />
        </>
    );
});

export default FacultyForm;
