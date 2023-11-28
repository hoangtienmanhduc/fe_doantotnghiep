import { useQuery } from '@tanstack/react-query';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { useState } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useImperativeHandle } from 'react';
import { forwardRef } from 'react';
import { getUserId } from '~/components/authentication/AuthUtils';
import { createOrUpdateGenericSectionClass } from '~/api/section/SectionClassService';
import { getListFacultyInfo } from '~/api/faculty/FacultyService';
import { InputText } from 'primereact/inputtext';
import { createOrUpdateGenericSpecialization } from '~/api/specialization/SpecializationService';

const QueryKeyFacultyOptions = 'Faculty-Options';

const SpecializationForm = forwardRef((props, ref) => {
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

    const { data: facultyOptions } = useQuery(
        [QueryKeyFacultyOptions, getUserId()],
        () => getListFacultyInfo(getUserId(), {}, null, true),
        { enabled: !!getUserId() },
    );

    const handleHideForm = useCallback(() => {
        setData({});
        setVisible(false);
    }, []);

    const handleOnSubmit = useCallback(async () => {
        let isError = false;

        if (!data?.facultyId) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Specialization is required!!',
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

        if (!data?.code) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Code is required!!',
            });
            isError = true;
        }

        if (!isError) {
            let toPostData = {
                ...data,
            };
            const specializationData = await createOrUpdateGenericSpecialization(getUserId(), toPostData);

            if (specializationData?.id) {
                try {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Create Or Update Specialization Successful!!',
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
                    <strong>Specialization Form</strong>
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
                        <h2>Faculty</h2>
                        <span className="w-full">
                            <Dropdown
                                value={data?.lecturerId}
                                onChange={(e) => handleOnChange('specializationId', e?.target.value)}
                                options={facultyOptions}
                                optionLabel="name"
                                placeholder="Select Require Specialization"
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
                        <h2>Code</h2>
                        <span className="w-full">
                            <InputText
                                value={data?.code}
                                onChange={(e) => handleOnChange('code', e?.target.value)}
                                className=" w-full p-4"
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
export default SpecializationForm;
