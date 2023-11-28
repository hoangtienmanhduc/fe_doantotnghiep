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
                detail: 'Term is required!!',
            });
            isError = true;
        }

        if (!data?.courseId) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Course is required!!',
            });
            isError = true;
        }

        if (!data?.sectionType) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Section Type is required!!',
            });
            isError = true;
        }

        if (!data?.name) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Name is required!!',
            });
            isError = true;
        }

        if (!data?.theoryPeriods) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Theory Periods is required!!',
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
                        detail: 'Create Or Update Section Successful!!',
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
            setData({ ...data, [key]: value });
        },
        [data],
    );

    return (
        <Dialog
            header={
                <h3 className="m-3 font-bold">
                    <strong>Section Form</strong>
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
            <div className="m-3">
                <div className="col-12">
                    <div className="col-12">
                        <h2>Term</h2>
                        <span className="w-full">
                            <Dropdown
                                value={data?.termId}
                                onChange={(e) => handleOnChange('termId', e?.target.value)}
                                options={termOptions}
                                optionLabel="name"
                                optionValue="id"
                                placeholder="Select Require Term"
                                className="w-full p-4"
                            />
                        </span>
                    </div>
                    <div className="col-12">
                        <h2>Course</h2>
                        <span className="w-full">
                            <Dropdown
                                value={data?.courseId}
                                onChange={(e) => handleOnChange('courseId', e?.target.value)}
                                options={courseOptions}
                                optionLabel="name"
                                optionValue="id"
                                placeholder="Select Require Course"
                                className="w-full p-4"
                            />
                        </span>
                    </div>
                    <div className="col-12">
                        <h2>Section Type</h2>
                        <span className="w-full">
                            <Dropdown
                                value={data?.sectionType}
                                onChange={(e) => handleOnChange('sectionType', e?.target.value)}
                                options={SectionTypeOptions}
                                placeholder="Select Section Type"
                                className="w-full p-4"
                            />
                        </span>
                    </div>
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
                        <h2>Theory Periods</h2>
                        <span className="w-full">
                            <InputNumber
                                value={data?.theoryPeriods}
                                onChange={(e) => handleOnChange('theoryPeriods', e?.value)}
                                className="w-full h-5rem"
                            />
                        </span>
                    </div>
                    <div className="col-12">
                        <h2>Practice Periods</h2>
                        <span className="w-full">
                            <InputNumber
                                value={data?.practicePeriods}
                                onChange={(e) => handleOnChange('practicePeriods', e?.value)}
                                className="w-full h-5rem"
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
            <Toast ref={toast} className="p-3" />
        </Dialog>
    );
});
export default SectionForm;
