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
import { typeOfEducationOptions } from './StudentConstant';
import { getListSpecializationClassInfo } from '~/api/specialization/SpecializationClassService';
import { Divider } from 'primereact/divider';

const QueryKeySpecializationOptions = 'Specialization-Options';
const QueryKeySpecializationClassOptions = 'Specialization-Class-Options';
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
    const { data: specializationClassOptions } = useQuery(
        [QueryKeySpecializationClassOptions, getUserId()],
        () => getListSpecializationClassInfo(getUserId(), {}, null, true),
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
                detail: 'Chuyên ngành không được để trống!!',
            });
            isError = true;
        }
        if (!data?.firstName) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Tên của sinh viên không được để trống!!',
            });
            isError = true;
        }

        if (!data?.lastName) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Họ đệm của sinh viên không dược để trống!!',
            });
            isError = true;
        }

        if (!data?.CINumber) {
            toast.current.show({
                severity: 'info',
                summary: 'Info',
                detail: 'Số căn cước công dân của sinh viên không được để trống!!',
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
                        detail: 'Thao tác cập nhật sinh viên thành công!!',
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
        <Dialog
            header={
                <h3 className="p-3 m-0 font-bold">
                    {`${!!data?.id ? 'Cập nhật thông tin' : 'Thêm mới'} sinh viên`}
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
                    <h2>
                        Thông tin cá nhân
                        <Divider className="bg-primary" />
                    </h2>
                    <div className="col-12 p-0">
                        <p>Thuộc chuyên ngành</p>
                        <span className="w-full">
                            <Dropdown
                                value={data?.specializationId}
                                onChange={(e) => handleOnChange('specializationId', e?.target.value)}
                                options={specializationOptions}
                                optionLabel="name"
                                optionValue="id"
                                placeholder="Hãy chọn chuyên ngành của sinh viên..."
                                className="w-full"
                            />
                        </span>
                    </div>
                    <div className="col-12 p-0">
                        <p>Thuộc lớp chuyên ngành</p>
                        <span className="w-full">
                            <Dropdown
                                value={data?.specializationClassId}
                                onChange={(e) => handleOnChange('specializationClassId', e?.target.value)}
                                options={specializationClassOptions}
                                optionLabel="name"
                                optionValue="id"
                                placeholder="Hãy chọn lớp chuyên ngành cho sinh viên..."
                                className="w-full"
                            />
                        </span>
                    </div>
                    <div className="col-12 p-0">
                        <p>Loại hình đào tạo</p>
                        <span className="w-full">
                            <Dropdown
                                value={data?.typeOfEducation}
                                onChange={(e) => handleOnChange('typeOfEducation', e?.target.value)}
                                options={typeOfEducationOptions}
                                placeholder="Hãy chọn loại hình đào tạo..."
                                className="w-full"
                            />
                        </span>
                    </div>
                    <div className="col-12 p-0">
                        <p>Tên sinh viên</p>
                        <span className="w-full">
                            <InputText
                                value={data?.firstName}
                                placeholder="Nhập tên của sinh viên..."
                                onChange={(e) => handleOnChange('firstName', e?.target.value)}
                                className=" w-full"
                            />
                        </span>
                    </div>
                    <div className="col-12 p-0">
                        <p>Họ đệm sinh viên</p>
                        <span className="w-full">
                            <InputText
                                value={data?.lastName}
                                placeholder="Nhập họ đệm của sinh viên..."
                                onChange={(e) => handleOnChange('lastName', e?.target.value)}
                                className=" w-full"
                            />
                        </span>
                    </div>
                    <div className="col-12 p-0">
                        <p>Ngày sinh</p>
                        <span className="w-full">
                            <InputText
                                value={data?.dob}
                                placeholder="Nhập ngày sinh của sinh viên..."
                                onChange={(e) => handleOnChange('dob', e?.target.value)}
                                className=" w-full"
                            />
                        </span>
                    </div>
                    <div className="col-12 p-0">
                        <p>Số căn cước công dân</p>
                        <span className="w-full">
                            <InputText
                                value={data?.CINumber}
                                placeholder="Nhập số căn cước công dân..."
                                onChange={(e) => handleOnChange('CINumber', e?.target.value)}
                                className=" w-full"
                            />
                        </span>
                    </div>
                    <Divider type="dashed" />
                    <h2>
                        Thông tin liên hệ
                        <Divider />
                    </h2>

                    <div className="col-12 p-0">
                        <p>Vùng sinh sống</p>
                        <span className="w-full">
                            <Dropdown
                                value={data?.regionId}
                                onChange={(e) => handleOnChange('regionId', e?.target.value)}
                                options={regionOptions}
                                optionLabel="name"
                                optionValue="id"
                                placeholder="Hãy chọn vùng sinh sống..."
                                className="w-full"
                            />
                        </span>
                    </div>
                    <div className="col-12 p-0">
                        <p>Tỉnh</p>
                        <span className="w-full">
                            <Dropdown
                                value={data?.provinceCode}
                                onChange={(e) => handleOnChange('provinceCode', e?.target.value)}
                                options={provinceOptions}
                                optionLabel="name"
                                optionValue="code"
                                placeholder="Hãy chọn tỉnh..."
                                className="w-full"
                            />
                        </span>
                    </div>
                    <div className="col-12 p-0">
                        <p>Quận</p>
                        <span className="w-full">
                            <Dropdown
                                value={data?.districtCode}
                                onChange={(e) => handleOnChange('districtCode', e?.target.value)}
                                options={districtOptions}
                                optionLabel="name"
                                optionValue="code"
                                placeholder="Hãy chọn quận..."
                                className="w-full"
                            />
                        </span>
                    </div>

                    <div className="col-12 p-0">
                        <p>Phường</p>
                        <span className="w-full">
                            <Dropdown
                                value={data?.wardCode}
                                onChange={(e) => handleOnChange('wardCode', e?.target.value)}
                                options={wardOptions}
                                optionLabel="name"
                                optionValue="code"
                                placeholder="Hãy chọn phường..."
                                className="w-full"
                            />
                        </span>
                    </div>
                    <div className="col-12 p-0">
                        <p>Địa chỉ (Số nhà, Tổ, Khu phố, Đường)</p>
                        <span className="w-full">
                            <InputText
                                value={data?.addressLine}
                                placeholder="Nhập địa chỉ..."
                                onChange={(e) => handleOnChange('addressLine', e?.target.value)}
                                className=" w-full"
                            />
                        </span>
                    </div>
                    <div className="col-12 p-0">
                        <p>Số điện thoại</p>
                        <span className="w-full">
                            <InputText
                                value={data?.phone}
                                placeholder="Nhập số điện thoại..."
                                onChange={(e) => handleOnChange('phone', e?.target.value)}
                                className=" w-full"
                            />
                        </span>
                    </div>
                </div>
                <div className="flex col-12">
                    <Button
                        className={`col-6 p-button-lg font-bold mr-2`}
                        icon={'pi pi-send'}
                        label={'Submit'}
                        onClick={handleOnSubmit}
                    />

                    <Button
                        className="col-6 p-button-lg font-bold"
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
