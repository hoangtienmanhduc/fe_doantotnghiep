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
import { getListSpecializationInfo } from '~/api/specialization/SpecializationService';
import { getListDistrict, getListProvince, getListRegion, getListWard } from '~/api/address/AddressService';
import { useEffect } from 'react';
import { createOrUpdateGenericUser } from '~/api/user/UserService';

const QueryKeySpecializationOptions = 'Specialization-Options';
const QueryKeyRegionOptions = 'Region-Options';
const QueryKeyWardOptions = 'Ward-Options';
const QueryKeyProvinceOptions = 'Province-Options';
const QueryKeyDistrictOptions = 'District-Options';

const StudentForm = forwardRef((props, ref) => {
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

    const { data: specializationOptions } = useQuery(
        [QueryKeySpecializationOptions, getUserId()],
        () => getListSpecializationInfo(getUserId(), {}, null, true),
        { enabled: !!getUserId() },
    );

    const { data: regionOptions, isFetched: isRegionFetched } = useQuery(
        [QueryKeyRegionOptions, getUserId()],
        () => getListRegion(),
        {
            enabled: !!getUserId(),
        },
    );
    const [regionData, setRegionData] = useState(null);
    const [districtCode, setDistrictCode] = useState(null);
    const [provinceCode, setProvinceCode] = useState(null);

    const { data: wardOptions, isFetched: isWardFetched } = useQuery(
        [QueryKeyWardOptions, getUserId()],
        () => getListWard(districtCode),
        {
            enabled: !!getUserId() && !!districtCode,
        },
    );

    const { data: provinceOptions, isFetched: isProvinceFetched } = useQuery(
        [QueryKeyProvinceOptions, getUserId()],
        () => getListProvince(regionData),
        {
            enabled: !!getUserId() && !!regionData,
        },
    );

    const { data: districtOptions, isFetched: isDistrictFetched } = useQuery(
        [QueryKeyDistrictOptions, getUserId()],
        () => getListDistrict(provinceCode),
        {
            enabled: !!getUserId() && !!provinceCode,
        },
    );

    useEffect(() => {
        if (data?.regionId) {
            setRegionData(data?.regionId);
        }

        if (data?.provinceCode) {
            setProvinceCode(data?.provinceCode);
        }

        if (data?.districtCode) {
            setDistrictCode(data?.districtCode);
        }
    }, [data]);

    const handleHideForm = useCallback(() => {
        setData({});
        setVisible(false);
    }, []);

    const handleOnSubmit = useCallback(async () => {
        let isError = false;

        if (!data?.specializationId) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Specialization is required!!',
            });
            isError = true;
        }
        if (!data?.firstName) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Firstname is required!!',
            });
            isError = true;
        }

        if (!data?.lastName) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Lastname is required!!',
            });
            isError = true;
        }

        if (!data?.CINumber) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'CI Number is required!!',
            });
            isError = true;
        }

        if (!isError) {
            let toPostData = {
                ...data,
                systemRole: 'student',
            };
            const userData = await createOrUpdateGenericUser(getUserId(), toPostData);

            if (userData?.id) {
                try {
                    toast.current.show({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Create Or Update User Successful!!',
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
                <h1 className="m-3 font-bold">
                    <strong>Student Form</strong>
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
                    <h2>User Information</h2>
                    <div className="col-12">
                        <h2>Specialization</h2>
                        <span className="w-full">
                            <Dropdown
                                value={data?.specializationId}
                                onChange={(e) => handleOnChange('specializationId', e?.target.value)}
                                options={specializationOptions}
                                optionLabel="name"
                                optionValue="id"
                                placeholder="Select Require Specialization"
                                className="w-full p-4"
                            />
                        </span>
                    </div>

                    <div className="col-12">
                        <h2>Firstname</h2>
                        <span className="w-full">
                            <InputText
                                value={data?.firstName}
                                onChange={(e) => handleOnChange('firstName', e?.target.value)}
                                className=" w-full p-4"
                            />
                        </span>
                    </div>
                    <div className="col-12">
                        <h2>Lastname</h2>
                        <span className="w-full">
                            <InputText
                                value={data?.lastName}
                                onChange={(e) => handleOnChange('lastName', e?.target.value)}
                                className=" w-full p-4"
                            />
                        </span>
                    </div>
                    <div className="col-12">
                        <h2>Date of birth</h2>
                        <span className="w-full">
                            <InputText
                                value={data?.dob}
                                onChange={(e) => handleOnChange('dob', e?.target.value)}
                                className=" w-full p-4"
                            />
                        </span>
                    </div>
                    <div className="col-12">
                        <h2>CI Number</h2>
                        <span className="w-full">
                            <InputText
                                value={data?.CINumber}
                                onChange={(e) => handleOnChange('CINumber', e?.target.value)}
                                className=" w-full p-4"
                            />
                        </span>
                    </div>
                    <h2>Address Information</h2>
                    <div className="col-12">
                        <h2>Address Line</h2>
                        <span className="w-full">
                            <InputText
                                value={data?.addressLine}
                                onChange={(e) => handleOnChange('addressLine', e?.target.value)}
                                className=" w-full p-4"
                            />
                        </span>
                    </div>
                    <div className="col-12">
                        <h2>Region Name</h2>
                        <span className="w-full">
                            <Dropdown
                                value={data?.regionId}
                                onChange={(e) => handleOnChange('regionId', e?.target.value)}
                                options={regionOptions}
                                optionLabel="name"
                                optionValue="id"
                                placeholder="Select Region"
                                className="w-full p-4"
                            />
                        </span>
                    </div>
                    <div className="col-12">
                        <h2>Province Name</h2>
                        <span className="w-full">
                            <Dropdown
                                value={data?.provinceCode}
                                onChange={(e) => handleOnChange('provinceCode', e?.target.value)}
                                options={provinceOptions}
                                optionLabel="name"
                                optionValue="code"
                                placeholder="Select Province"
                                className="w-full p-4"
                            />
                        </span>
                    </div>
                    <div className="col-12">
                        <h2>District Name</h2>
                        <span className="w-full">
                            <Dropdown
                                value={data?.districtCode}
                                onChange={(e) => handleOnChange('districtCode', e?.target.value)}
                                options={districtOptions}
                                optionLabel="name"
                                optionValue="code"
                                placeholder="Select District"
                                className="w-full p-4"
                            />
                        </span>
                    </div>

                    <div className="col-12">
                        <h2>Ward Name</h2>
                        <span className="w-full">
                            <Dropdown
                                value={data?.wardCode}
                                onChange={(e) => handleOnChange('wardCode', e?.target.value)}
                                options={wardOptions}
                                optionLabel="name"
                                optionValue="code"
                                placeholder="Select Ward"
                                className="w-full p-4"
                            />
                        </span>
                    </div>
                    <div className="col-12">
                        <h2>Phone Number</h2>
                        <span className="w-full">
                            <InputText
                                value={data?.address?.phone}
                                onChange={(e) => handleOnChange('phone', e?.target.value)}
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
            <Toast ref={toast} />
        </Dialog>
    );
});
export default StudentForm;
