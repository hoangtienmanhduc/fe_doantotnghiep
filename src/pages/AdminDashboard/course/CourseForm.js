import { isError, useQuery } from '@tanstack/react-query';
import { da } from 'date-fns/locale';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
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
        let toPostData = {
            ...data,
        };

        let isError = false;
        if (!data?.name) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Name is required!!',
            });
            isError = true;
        }

        if (!data?.credit) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Credit is required!!',
            });
            isError = true;
        }

        if (Number.isNaN(data?.credit)) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Credit should be a number!!',
            });
            isError = true;
        }

        if (!isError) {
            const courseData = await createOrUpdateGenericCourse(getUserId(), toPostData);

            if (courseData?.id) {
                try {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Create Or Update Course Successful!!',
                    });
                } catch (err) {
                    console.log('Fail to reload table');
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
            header={
                <h1 className="m-3 font-bold">
                    <strong>Course Form</strong>
                    <hr />
                </h1>
            }
            onHide={handleHideForm}
            style={{
                width: '60vw',
            }}
            breakpoints={{ '960px': '75vw', '641px': '100vw' }}
            visible={visible}
        >
            <div className="m-3">
                <div className="col-12">
                    <div className="col-12">
                        <h2>Name</h2>
                        <span className="w-full">
                            <InputText
                                value={data?.name}
                                onChange={(e) => handleOnChange('name', e?.target.value)}
                                className=" w-full p-4"
                            />
                        </span>
                    </div>
                    <div className="col-12">
                        <h2>Credits</h2>
                        <span className="w-full">
                            <InputText
                                value={data?.credit}
                                onChange={(e) => handleOnChange('credit', e?.target.value)}
                                className=" w-full p-4"
                            />
                        </span>
                    </div>
                    <div className="col-12">
                        <h2>Require Course</h2>
                        <span className="w-full">
                            <MultiSelect
                                value={data?.requireCourse ? data.requireCourse : []}
                                onChange={(e) => handleOnChange('requireCourse', e?.target.value)}
                                options={courseOptions && courseOptions.filter((item) => item?.id !== data?.id)}
                                optionLabel="name"
                                optionValue="id"
                                placeholder="Select Require Course"
                                maxSelectedLabels={3}
                                className="p-4 w-full"
                                pt={{ panel: { className: 'p-2' } }}
                            />
                        </span>
                    </div>
                </div>
                <div className="flex col-12 py-3">
                    <Button
                        className={`col-6 py-3 p-button-lg font-bold mr-2`}
                        icon={'pi pi-send'}
                        label={'Submit'}
                        onClick={handleOnSubmit}
                    />

                    <Button
                        className="col-6 py-3 p-button-lg font-bold"
                        icon={'pi pi-send'}
                        label={'Cancel'}
                        onClick={handleHideForm}
                    />
                </div>
            </div>
            <Toast ref={toast} />
        </Dialog>
    );
});

export default CourseForm;
