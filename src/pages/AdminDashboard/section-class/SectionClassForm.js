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
import { InputNumber } from 'primereact/inputnumber';
import { createOrUpdateGenericSectionClass } from '~/api/section/SectionClassService';
import { SectionClassTypeOptions, dayInWeekOptions } from './SectionClassConstant';
import { Calendar } from 'primereact/calendar';
import { getListLecturerInfo } from '~/api/lecturer/LecturerService';
import { getListSectionInfo } from '~/api/section/SectionService';

const QueryKeyLecturerOptions = 'Lecturer-Options';
const QueryKeySectionOptions = 'Section-Options';

const SectionClassForm = forwardRef((props, ref) => {
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

    const { data: lecturerOptions } = useQuery(
        [QueryKeyLecturerOptions, getUserId()],
        () => getListLecturerInfo(getUserId(), {}, null, true),
        { enabled: !!getUserId() },
    );
    const { data: sectionOptions } = useQuery(
        [QueryKeySectionOptions, getUserId()],
        () => getListSectionInfo(getUserId(), {}, null, true),
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

        if (!data?.lecturerId) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Lecturer is required!!',
            });
            isError = true;
        }

        if (!data?.sectionId) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Section is required!!',
            });
            isError = true;
        }

        if (!data?.sectionClassType) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Section Class Type is required!!',
            });
            isError = true;
        }

        if (!data?.room) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Room is required!!',
            });
            isError = true;
        }

        if (!data?.periodFrom) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Period From is required!!',
            });
            isError = true;
        }

        if (!data?.periodTo) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Period To is required!!',
            });
            isError = true;
        }

        if (!data?.dayInWeek) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Day In Week is required !!',
            });
            isError = true;
        }

        if (!data?.numberOfStudents) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Number Of Students is required !!',
            });
            isError = true;
        }
        if (!data?.startedAt) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Started At is required !!',
            });
            isError = true;
        }

        if (!isError) {
            const sectionData = await createOrUpdateGenericSectionClass(getUserId(), toPostData);

            if (sectionData?.id) {
                try {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Create Or Update Section Class Successful!!',
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
                    <strong>Section Class Form</strong>
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
                        <h2>Section</h2>
                        <span className="w-full">
                            <Dropdown
                                value={data.sectionId}
                                onChange={(e) => handleOnChange('sectionId', e?.target.value)}
                                options={sectionOptions}
                                optionLabel="name"
                                optionValue="id"
                                placeholder="Select Require Section"
                                className="w-full p-4"
                            />
                        </span>
                    </div>
                    <div className="col-12">
                        <h2>Lecturer</h2>
                        <span className="w-full">
                            <Dropdown
                                value={data?.lecturerId}
                                onChange={(e) => handleOnChange('lecturerId', e?.target.value)}
                                options={lecturerOptions}
                                optionLabel="name"
                                optionValue="id"
                                placeholder="Select Require Lecturer"
                                className="w-full p-4"
                            />
                        </span>
                    </div>
                    <div className="col-12">
                        <h2>Section Class Type</h2>
                        <span className="w-full">
                            <Dropdown
                                value={data?.sectionClassType}
                                onChange={(e) => handleOnChange('sectionClassType', e?.target.value)}
                                options={SectionClassTypeOptions}
                                placeholder="Select Section Class Type"
                                className="w-full p-4"
                            />
                        </span>
                    </div>
                    <div className="col-12">
                        <h2>Room</h2>
                        <span className="w-full">
                            <InputText
                                value={data?.room}
                                onChange={(e) => handleOnChange('room', e?.target.value)}
                                className=" w-full p-4"
                            />
                        </span>
                    </div>
                    <div className="col-12">
                        <h2>Period From</h2>
                        <span className="w-full">
                            <InputNumber
                                value={data?.periodFrom}
                                onValueChange={(e) => handleOnChange('periodFrom', e?.value)}
                                className="w-full h-5rem"
                            />
                        </span>
                    </div>
                    <div className="col-12">
                        <h2>Period To</h2>
                        <span className="w-full">
                            <InputNumber
                                value={data?.periodTo}
                                onValueChange={(e) => handleOnChange('periodTo', e?.value)}
                                className="w-full h-5rem"
                            />
                        </span>
                    </div>
                    <div className="col-12">
                        <h2>Day In Week</h2>
                        <span className="w-full">
                            <Dropdown
                                value={[]}
                                onChange={(e) => handleOnChange('dayInWeek', e?.target.value)}
                                options={dayInWeekOptions}
                                placeholder="Select Day in Week"
                                className="w-full p-4"
                            />
                        </span>
                    </div>
                    <div className="col-12">
                        <h2>Number Of Students</h2>
                        <span className="w-full">
                            <InputNumber
                                value={data?.numberOfStudents}
                                onChange={(e) => handleOnChange('numberOfStudents', e?.value)}
                                className="w-full h-5rem"
                            />
                        </span>
                    </div>
                    <div className="col-12">
                        <h2>Start at</h2>
                        <span className="w-full">
                            <Calendar
                                value={data?.startedAt}
                                onChange={(e) => handleOnChange('startedAt', e?.value)}
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
export default SectionClassForm;
