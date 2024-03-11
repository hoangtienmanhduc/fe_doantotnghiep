import { isError, useQuery } from '@tanstack/react-query';
import { da } from 'date-fns/locale';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { Toast } from 'primereact/toast';
import { useState } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useImperativeHandle } from 'react';
import { forwardRef } from 'react';
import { createOrUpdateGenericCourse, getListCourseInfo } from '~/api/course/CourseService';
import { getUserId } from '~/components/authentication/AuthUtils';
import { courseTypeOptions } from './CourseConstant';
import { InputTextarea } from 'primereact/inputtextarea';

const QueryKeyOptions = 'Course-Options';

const CourseForm = forwardRef((props, ref) => {
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

    const { data: courseOptions } = useQuery(
        [QueryKeyOptions, getUserId()],
        () => getListCourseInfo(getUserId(), {}, null, true),
        { enabled: !!getUserId() },
    );

    const handleHideForm = useCallback(() => {
        setData({});
        setVisible(false);
    }, []);

    const handleOnSubmit = useCallback(async () => {
        let isError = false;
        if (!data?.name) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Tên môn học không được để trống!!',
            });
            isError = true;
        }

        if (!data?.credit) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Tín chỉ của môn học không được để trống!!',
            });
            isError = true;
        }

        if (Number.isNaN(data?.credit)) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Tín chỉ của môn học không hợp lệ!!',
            });
            isError = true;
        }

        debugger;
        if (!isError) {
            let toPostData = {
                ...data,
            };
            const courseData = await createOrUpdateGenericCourse(getUserId(), toPostData);

            if (courseData?.id) {
                try {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Thao tác cập nhật môn học thành công!!',
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
            if (key === 'prerequisite') {
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
        <>
            <Dialog
                header={
                    <h3 className="m-0 p-3 pb-0 font-bold">
                        {`${!!data?.id ? 'Cập nhật thông tin' : 'Thêm mới'} môn học`}
                        <hr />
                    </h3>
                }
                onHide={handleHideForm}
                style={{
                    width: '60vw',
                }}
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                visible={visible}
                pt={{ header: { className: 'p-0' } }}
            >
                <div>
                    <div className="col-12 p-0">
                        <div className="col-12 p-0">
                            <p>Tên môn học</p>
                            <span className="w-full">
                                <InputText
                                    value={data?.name || null}
                                    placeholder="Nhập tên môn học (Bắt buộc)"
                                    onChange={(e) => handleOnChange('name', e?.target.value)}
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Mô tả môn học</p>
                            <span className="w-full">
                                <InputTextarea
                                    rows={5}
                                    value={data?.description || null}
                                    placeholder="Nhập mô tả cho môn học (Không bắt buộc)"
                                    onChange={(e) => handleOnChange('description', e?.target.value)}
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Số tín chỉ</p>
                            <span className="w-full">
                                <InputNumber
                                    value={data?.credit}
                                    placeholder="Nhập số tín chỉ (Bắt buộc)"
                                    onChange={(e) => handleOnChange('credit', e?.value)}
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Loại môn học</p>
                            <span className="w-full">
                                <Dropdown
                                    value={data?.courseType || null}
                                    onChange={(e) => handleOnChange('courseType', e?.target.value)}
                                    options={courseTypeOptions}
                                    optionLabel="label"
                                    optionValue="key"
                                    placeholder="Chọn loại môn học"
                                    className="w-full"
                                />
                            </span>
                        </div>

                        <div className="col-12 p-0">
                            <p>Các học phần bắt buộc</p>
                            <span className="w-full">
                                <MultiSelect
                                    value={data?.prerequisite ? data.prerequisite : []}
                                    onChange={(e) => handleOnChange('prerequisite', e?.target.value)}
                                    options={courseOptions && courseOptions.filter((item) => item?.id !== data?.id)}
                                    optionLabel="name"
                                    optionValue="id"
                                    placeholder="Hãy chọn học phần bắt buộc (nếu có)"
                                    maxSelectedLabels={3}
                                    className="w-full"
                                />
                            </span>
                        </div>
                    </div>
                    <hr />
                    <div className="flex col-12">
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
        </>
    );
});

export default CourseForm;
