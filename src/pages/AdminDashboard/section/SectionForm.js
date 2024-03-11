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
import { createOrUpdateGenericSection } from '~/api/section/SectionService';
import { getUserId } from '~/components/authentication/AuthUtils';
import { SectionTypeOptions } from './SectionConstant';
import { InputNumber } from 'primereact/inputnumber';
import { getListCourseInfo } from '~/api/course/CourseService';
import { getListTermInfo } from '~/api/term/TermService';
import { Divider } from 'primereact/divider';

const QueryKeyCourseOptions = 'Course-Options';
const QueryKeTermOptions = 'Term-Options';

const SectionForm = forwardRef((props, ref) => {
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
        [QueryKeyCourseOptions, getUserId()],
        () => getListCourseInfo(getUserId(), {}, null, true),
        { enabled: !!getUserId() },
    );
    const { data: termOptions } = useQuery(
        [QueryKeTermOptions, getUserId()],
        () => getListTermInfo(getUserId(), {}, null, true),
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

        if (!data?.termId) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Học kì không được để trống!!',
            });
            isError = true;
        }

        if (!data?.courseId) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Môn học không được để trống!!',
            });
            isError = true;
        }

        if (!data?.sectionType) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Loại học phần không được để trống!!',
            });
            isError = true;
        }

        if (!data?.name) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Tên học phần không được để trống!!',
            });
            isError = true;
        }

        if (!data?.theoryPeriods) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Số tiết lý thuyết không được để trống!!',
            });
            isError = true;
        }

        if (!isError) {
            const sectionData = await createOrUpdateGenericSection(getUserId(), toPostData);

            if (sectionData?.id) {
                try {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Thao tác cập nhật học phần thành công!!',
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
                    <h3 className="p-3 pb-0 m-0 font-bold">
                        {`${!!data?.id ? 'Cập nhật thông tin' : 'Thêm mới'} học phần`}
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
                            <p>Học kì</p>
                            <span className="w-full">
                                <Dropdown
                                    value={data?.termId}
                                    onChange={(e) => handleOnChange('termId', e?.target.value)}
                                    options={termOptions}
                                    optionLabel="name"
                                    optionValue="id"
                                    placeholder="Hãy chọn học kì cho học phần"
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Môn học</p>
                            <span className="w-full">
                                <Dropdown
                                    value={data?.courseId}
                                    onChange={(e) => handleOnChange('courseId', e?.target.value)}
                                    options={courseOptions}
                                    optionLabel="name"
                                    optionValue="id"
                                    placeholder="Hãy chọn môn học của học phần"
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Loại học phần</p>
                            <span className="w-full">
                                <Dropdown
                                    value={data?.sectionType}
                                    onChange={(e) => handleOnChange('sectionType', e?.target.value)}
                                    options={SectionTypeOptions}
                                    optionLabel="label"
                                    optionValue="key"
                                    placeholder="Hãy chọn loại học phần"
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Tên học phần</p>
                            <span className="w-full">
                                <InputText
                                    value={data?.name}
                                    placeholder="Nhập tên học phần..."
                                    onChange={(e) => handleOnChange('name', e?.target.value)}
                                    className=" w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Số tiết lý thuyết</p>
                            <span className="w-full">
                                <InputNumber
                                    value={data?.theoryPeriods}
                                    placeholder="Nhập số tiết lý thuyết..."
                                    onChange={(e) => handleOnChange('theoryPeriods', e?.value)}
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Số tiết thực hành</p>
                            <span className="w-full">
                                <InputNumber
                                    value={data?.practicePeriods}
                                    placeholder="Nhập số tiết thực hành..."
                                    onChange={(e) => handleOnChange('practicePeriods', e?.value)}
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
export default SectionForm;
