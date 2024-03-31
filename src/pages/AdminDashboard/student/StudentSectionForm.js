import { useQuery } from '@tanstack/react-query';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Toast } from 'primereact/toast';
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createOrUpdateGenericRegistration } from '~/api/registration/RegistrationService';
import { getListSectionClassInfo, registerGenericSectionClass } from '~/api/section/SectionClassService';
import { getListSectionInfo } from '~/api/section/SectionService';
import { getListTermInfo } from '~/api/term/TermService';
import { getListTimeAndPlaceInfo } from '~/api/time-and-place/TimeAndPlaceService';
import { getUserId } from '~/components/authentication/AuthUtils';
import { showNotification } from '~/components/notification/NotificationService';
import { registrationType } from '~/pages/StudentDashboard/Dangkyhocphan/DangKyHocPhan';
import { HTTP_STATUS_OK } from '~/utils/Constants';

const QueryKeySectionClassOptions = 'SectionClass-Options';
const QueryKeySectionOptions = 'Section-Options';
const QueryKeyTimeAndPlaceOptions = 'TimeAndPlace-Options';
const QueryKeyTerm = 'Term-Options';

const StudentSectionForm = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        showForm: handleShowForm,
        hideForm: handleHideForm,
    }));

    const { id: idString } = useParams();
    const id = useMemo(() => {
        return !!idString ? parseInt(idString) : null;
    }, [idString]);

    // State
    const [data, setData] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const toast = useRef(null);
    const [visible, setVisible] = useState(false);
    // Handle
    const handleShowForm = (data, type) => {
        if (data) {
            setData({ ...data });
        }

        if (type === 'create') {
            setIsEdit(false);
        } else if (type === 'edit') {
            setIsEdit(true);
        }

        setVisible(true);
    };

    const handleHideForm = () => {
        setData({});
        setIsEdit(false);
        setVisible(false);
    };

    const { data: termOptions } = useQuery([QueryKeyTerm, getUserId()], () => getListTermInfo(getUserId()), {
        enabled: !!getUserId() && !!visible,
    });

    const { data: sectionOptions } = useQuery(
        [QueryKeySectionOptions, getUserId()],
        () => getListSectionInfo(getUserId()),
        {
            enabled: !!getUserId() && !!visible,
        },
    );

    const { data: sectionClassOptions } = useQuery(
        [
            QueryKeySectionClassOptions,
            getUserId(),
            { sectionClassType: data?.sectionClassType, sectionId: data?.sectionId, termId: data?.termId },
        ],
        () =>
            getListSectionClassInfo(
                getUserId(),
                { sectionClassType: data?.sectionClassType, sectionId: data?.sectionId, termId: data?.termId },
                null,
                true,
            ),
        { enabled: !!getUserId() && !!data?.sectionId && !!visible, initialData: [] },
    );

    const { data: timeAndPlaceOptions } = useQuery(
        [QueryKeyTimeAndPlaceOptions, getUserId(), data?.sectionClassId],
        () => getListTimeAndPlaceInfo(getUserId(), { sectionClassId: data?.sectionClassId }),
        {
            enabled: !!getUserId() && !!data?.sectionClassId && !!visible,
            initialData: [],
        },
    );

    const handleOnSubmit = useCallback(async () => {
        if (!data?.termId) {
            showNotification('error', 'Lỗi', 'Học kì của lớp đăng ký không được để trống !!');
            return;
        }

        if (!data?.sectionId) {
            showNotification('error', 'Lỗi', 'Học phần thuộc về của lớp đăng ký không được để trống !!');
            return;
        }

        if (!data?.sectionClassId) {
            showNotification('error', 'Lỗi', 'Lớp học phần đăng ký không được để trống !!');
            return;
        }

        if (!data?.timeAndPlaceId) {
            showNotification('error', 'Lỗi', 'Thời gian học của lớp đăng ký không được để trống !!');
            return;
        }

        if (!data?.type) {
            showNotification('error', 'Lỗi', 'Loại đăng ký của lớp đăng ký không được để trống !!');
            return;
        }

        const toPostData = {
            ...data,
            studentId: id,
        };

        const response = await createOrUpdateGenericRegistration(getUserId(), toPostData);

        if (response === HTTP_STATUS_OK) {
            showNotification('success', 'Thành công', 'Cập nhật đăng ký học phần thành công !!');
            handleHideForm();
            return;
        }
    }, [data, id]);

    return (
        <>
            <Dialog
                header={
                    <h3 className="m-0 p-3 pb-0 font-bold">
                        {isEdit ? 'Cập nhật' : 'Thêm mới'} đăng ký lớp học phần của sinh viên
                        <hr />
                    </h3>
                }
                onHide={handleHideForm}
                style={{
                    width: '60vw',
                }}
                pt={{ header: { className: 'p-0' } }}
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
                                    disabled={isEdit}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            termId: e.target.value,
                                            sectionClassId: null,
                                            timeAndPlaceId: null,
                                        })
                                    }
                                    filter
                                    options={termOptions}
                                    optionLabel="name"
                                    optionValue="id"
                                    placeholder="Hãy chọn học kỳ đăng ký lớp học phần (Bắt buộc)"
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Học phần</p>
                            <span className="w-full">
                                <Dropdown
                                    value={data?.sectionId || null}
                                    disabled={isEdit}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            sectionId: e.target.value,
                                            sectionClassId: null,
                                            timeAndPlaceId: null,
                                        })
                                    }
                                    filter
                                    options={sectionOptions}
                                    optionLabel="name"
                                    optionValue="id"
                                    placeholder="Hãy chọn học phần để đăng ký lớp học phần (Bắt buộc)"
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Lớp học phần</p>
                            <span className="w-full">
                                <Dropdown
                                    value={data?.sectionClassId || null}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            sectionClassId: e.target.value,
                                            timeAndPlaceId: null,
                                        })
                                    }
                                    filter
                                    options={sectionClassOptions}
                                    optionLabel="name"
                                    optionValue="id"
                                    placeholder="Hãy chọn lớp học phần muốn đăng ký (Bắt buộc)"
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Thời gian học</p>
                            <span className="w-full">
                                <Dropdown
                                    value={data?.timeAndPlaceId || null}
                                    onChange={(e) => setData({ ...data, timeAndPlaceId: e.target.value })}
                                    options={timeAndPlaceOptions}
                                    optionLabel="name"
                                    optionValue="id"
                                    placeholder="Hãy chọn thời gian học của lớp học phần (Bắt buộc)"
                                    className="w-full"
                                />
                            </span>
                        </div>
                        <div className="col-12 p-0">
                            <p>Loại đăng ký</p>
                            <span className="w-full">
                                <Dropdown
                                    value={data?.type || null}
                                    filter
                                    onChange={(e) => setData({ ...data, type: e.target.value })}
                                    options={registrationType}
                                    optionLabel="name"
                                    optionValue="key"
                                    placeholder="Hãy chọn loại đăng ký lớp học phần (Bắt buộc)"
                                    className="w-full"
                                />
                            </span>
                        </div>
                    </div>
                    <br />
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

export default StudentSectionForm;
