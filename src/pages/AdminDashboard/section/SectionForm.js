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
import { CourseTypeOptions } from './SectionConstant';
import { getListCourseInfo } from '~/api/course/CourseService';
import { InputTextarea } from 'primereact/inputtextarea';
import { getListTermInfo } from '~/api/term/TermService';
import { createOrUpdateGenericSection } from '~/api/section/SectionService';

const QueryKeyCourseOptions = 'Course-Options';
const QueryKeyTerm = 'Term-Options';
const SectionForm = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        showForm: handleShowForm,
        hideForm: handleHideForm,
    }));

    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({});
    const toast = useRef(null);
    const handleShowForm = useCallback((data) => {
        if (!!data && Object.keys(data)?.length > 0) {
            setData({ ...data });
        }
        setVisible(true);
    }, []);

    const { data: courseOptions } = useQuery(
        [QueryKeyCourseOptions, getUserId()],
        () =>
            getListCourseInfo(
                getUserId(),
                { specializationId: data?.specializationId ? data.specializationId : null },
                null,
                true,
            ),
        { enabled: !!getUserId() },
    );

    const { data: termOptions } = useQuery([QueryKeyTerm, getUserId()], () => getListTermInfo(getUserId()), {
        enabled: !!getUserId() && !!visible,
    });

    const handleHideForm = useCallback(() => {
        setData({});
        setVisible(false);
    }, []);

    const handleOnSubmit = useCallback(async () => {
        let isError = false;

        if (!data?.courseId) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Môn học học phần thuộc không được để trống!!',
            });
            isError = true;
        }

        if (!data?.termId) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Học kỳ học phần thuộc không được để trống!!',
            });
            isError = true;
        }

        if (!isError) {
            let toPostData = {
                ...data,
            };
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
                            <p>Học kỳ</p>
                            <span className="w-full">
                                <Dropdown
                                    value={data?.termId || null}
                                    onChange={(e) => handleOnChange('termId', e?.target.value)}
                                    options={termOptions}
                                    optionLabel="name"
                                    optionValue="id"
                                    placeholder="Hãy chọn học kỳ mà học phần thuộc"
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Thuộc môn học</p>
                            <span className="w-full">
                                <Dropdown
                                    value={data?.courseId || null}
                                    onChange={(e) => handleOnChange('courseId', e?.target.value)}
                                    options={courseOptions}
                                    optionLabel="name"
                                    optionValue="id"
                                    placeholder="Hãy chọn môn học mà học phần thuộc"
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Mô tả học phần</p>
                            <span className="w-full">
                                <InputTextarea
                                    rows={5}
                                    value={data?.description || ''}
                                    placeholder="Nhập mô tả cho học phần (Không bắt buộc)"
                                    onChange={(e) => handleOnChange('description', e?.target.value)}
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
