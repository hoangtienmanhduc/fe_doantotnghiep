import { useQuery } from '@tanstack/react-query';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import React, { useMemo, useRef, useState } from 'react';
import { getListLecturerInfo } from '~/api/lecturer/LecturerService';
import {
    changeRegistrationStatus,
    deletedRegistration,
    getPageRegistrationInfo,
} from '~/api/registration/RegistrationService';
import { getListSectionInfo } from '~/api/section/SectionService';
import { getListTermInfo } from '~/api/term/TermService';
import { getRefId, getUserId } from '~/components/authentication/AuthUtils';
import StudentSectionForm from './StudentSectionForm';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Dropdown } from 'primereact/dropdown';
import { showNotification } from '~/components/notification/NotificationService';
import { HTTP_STATUS_OK } from '~/utils/Constants';
import { useParams } from 'react-router-dom';
const QueryKeyLecturerOptions = 'Lecturer-Options';
const QueryKeySectionOptions = 'Section-Options';
const QueryKeyTerm = 'Term-Options';

const QueryKey = 'Registration-Page';
const initialPageable = {
    rows: 10,
    pageNumber: 0,
    sortField: 'id',
    sortOrder: -1,
};
const StudentSectionManagement = () => {
    const { id: idString } = useParams();
    const id = useMemo(() => {
        return !!idString ? parseInt(idString) : null;
    }, [idString]);
    const [pageable, setPageable] = useState({ ...initialPageable });
    const [filterRequest, setFilterRequest] = useState({ sectionClassType: 'theory', studentId: id });
    const [selectedStudentSectionClass, setSelectedStudentSectionClass] = useState(null);
    const [registrationStatus, setRegistrationStatus] = useState(null);
    const studentSectionRef = useRef(null);
    const op = useRef(null);

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

    const { data: termOptions } = useQuery([QueryKeyTerm, getUserId()], () => getListTermInfo(getUserId()), {
        enabled: !!getUserId(),
    });

    // Student Section DataPage
    const { data, refetch } = useQuery(
        [QueryKey, getUserId(), getRefId(), { ...pageable }, { ...filterRequest }],
        () =>
            getPageRegistrationInfo(
                getUserId(),
                pageable.pageNumber,
                pageable.rows,
                pageable.sortField,
                pageable.sortOrder,
                { ...filterRequest },
            ),
        {},
    );

    const columns = [
        { field: 'sectionName', header: 'Học phần' },
        { field: 'sectionCode', header: 'Mã học phần' },
        { field: 'credits', header: 'Số tín chỉ học tập' },
        { field: 'costCredits', header: 'Số tín chỉ học phí' },
        { field: 'registrationStatus', header: 'Tình trạng đăng ký học phần' },
        { field: 'sectionClasses', header: 'Lớp đã đăng ký của học phần' },
        { field: 'action', header: 'Thao tác' },
    ];

    const handleOnChangeStatus = async () => {
        if (!registrationStatus) {
            showNotification('error', 'Lỗi', 'Trạng thái đăng ký không được để trống !!');
            return;
        }

        const toPostData = {
            id: selectedStudentSectionClass,
            status: registrationStatus,
        };

        const response = await changeRegistrationStatus(getUserId(), toPostData);

        if (response === HTTP_STATUS_OK) {
            showNotification('success', 'Thành công', 'Cập nhật trạng thái đăng ký thành công !!');
            setSelectedStudentSectionClass(null);
            setRegistrationStatus(null);
            return;
        }
    };

    const handleOnDeleteRegistraion = async () => {
        if (selectedStudentSectionClass) {
            const response = await deletedRegistration(getUserId(), selectedStudentSectionClass);

            if (response === HTTP_STATUS_OK) {
                showNotification('success', 'Thành công', 'Cập nhật trạng thái đăng ký thành công !!');

                refetch();
                return;
            }
        }
    };

    const header = () => {
        return (
            <React.Fragment>
                <div className="col-12 surface-50 border-round-xl">
                    <div className="w-full">
                        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                            <p className="text-900 font-bold">QUẢN LÝ HỌC PHẦN ĐĂNG KÝ CỦA SINH VIÊN</p>
                            <div className="flex align-items-center ">
                                <Button className="mr-2" icon="pi pi-refresh" rounded raised onClick={refetch} />
                                <Button
                                    icon="pi pi-plus"
                                    rounded
                                    raised
                                    onClick={() => studentSectionRef.current.showForm({}, 'create')}
                                />
                            </div>
                        </div>
                        <div className="grid col-12 justify-content-between align-items-center m-0">
                            <div className="w-full grid m-0 jutify-content-between align-items-center">
                                <div className="col-4">
                                    <span className="font-semibold text-primary">
                                        <p className="mb-0">Thuộc Học kỳ</p>
                                    </span>
                                    <MultiSelect
                                        value={filterRequest?.termIds || null}
                                        onChange={(e) => setFilterRequest({ ...filterRequest, termIds: [...e.value] })}
                                        options={termOptions}
                                        optionValue="id"
                                        optionLabel="name"
                                        filter
                                        placeholder="Chọn học kỳ để lọc lớp học phần"
                                        maxSelectedLabels={3}
                                        className="w-full"
                                    />
                                </div>
                                <div className="col-4">
                                    <span className="font-semibold text-primary">
                                        <p className="mb-0">Thuộc học phần</p>
                                    </span>
                                    <MultiSelect
                                        value={filterRequest?.sectionIds || null}
                                        onChange={(e) =>
                                            setFilterRequest({ ...filterRequest, sectionIds: [...e.value] })
                                        }
                                        options={sectionOptions}
                                        optionValue="id"
                                        optionLabel="name"
                                        filter
                                        placeholder="Chọn tên học phần để lọc lớp học phần"
                                        maxSelectedLabels={3}
                                        className="w-full"
                                    />
                                </div>
                                <div className="col-4">
                                    <span className="font-semibold text-primary">
                                        <p className="mb-0">Giảng viên giảng dạy</p>
                                    </span>
                                    <MultiSelect
                                        value={filterRequest?.lecturerIds || null}
                                        onChange={(e) =>
                                            setFilterRequest({ ...filterRequest, lecturerIds: [...e.value] })
                                        }
                                        options={lecturerOptions}
                                        optionLabel="fullName"
                                        optionValue="id"
                                        filter
                                        placeholder="Chọn giảng viên để lọc lớp học phần"
                                        maxSelectedLabels={3}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="col-12 p-2">
                        <span className="font-semibold text-primary">
                            <p className="m-0">Tìm kiếm</p>
                        </span>
                        <span className="p-input-icon-left w-full">
                            <i className="pi pi-search" />
                            <InputText
                                value={filterRequest?.searchValue || ''}
                                placeholder="Nhập mã lớp học phần để tìm kiếm"
                                onChange={(e) => setFilterRequest({ ...filterRequest, searchValue: e.target.value })}
                                className="w-full"
                            />
                        </span>
                    </div>
                </div>
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            <div className="card col-12">
                <DataTable
                    value={!!data && data?.content?.length > 0 ? data?.content : []}
                    header={header}
                    tableStyle={{ minWidth: '60rem' }}
                    paginator
                    scrollable
                    resizableColumns
                    stripedRows
                    lazy
                    rows={10}
                    first={pageable.pageNumber * pageable.rows}
                    onPage={(e) => setPageable({ ...pageable, pageNumber: e.page })}
                    totalRecords={data && data.totalElements ? data.totalElements : 0}
                >
                    {columns.map((col, i) => (
                        <Column
                            className="text-center"
                            key={col.field}
                            field={col.field}
                            header={col.header}
                            sortable
                            body={(rowData) =>
                                col.field === 'deleted' ? (
                                    rowData[col.field] ? (
                                        <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                            Có
                                        </div>
                                    ) : (
                                        <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                            Không
                                        </div>
                                    )
                                ) : col.field === 'action' ? (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        {/* <Button
                                            text
                                            icon="pi pi-pencil"
                                            tooltip="Chỉnh sửa"
                                            tooltipOptions={{ position: 'left' }}
                                            rounded
                                            className="mr-2"
                                            raised
                                            onClick={() => {
                                                setSelectedSectionClass(rowData?.sectionClassId);
                                                studentSectionRef.current.showForm(rowData, 'edit');
                                            }}
                                        /> */}
                                        <Button
                                            icon="pi pi-arrow-right-arrow-left"
                                            tooltip="Đổi trạng thái đăng ký"
                                            tooltipOptions={{ position: 'left' }}
                                            rounded
                                            className="mr-2"
                                            raised
                                            onClick={(e) => {
                                                setSelectedStudentSectionClass(rowData?.id);
                                                setRegistrationStatus(rowData?.registrationStatus);
                                                op.current.toggle(e);
                                            }}
                                        />
                                        <OverlayPanel ref={op} showCloseIcon>
                                            <div className="w-20rem p-0">
                                                <p>Trạng thái đăng ký</p>
                                                <span className="w-full">
                                                    <Dropdown
                                                        disabled={registrationStatus === 'cancel_register'}
                                                        value={registrationStatus || null}
                                                        onChange={(e) => setRegistrationStatus(e.target.value)}
                                                        options={[
                                                            { key: 'new_learning', label: 'Đăng ký học mới' },
                                                            { key: 'again_learning', label: 'Đăng ký học lại' },
                                                            { key: 'improve_learning', label: 'Đăng ký học cải thiện' },
                                                            { key: 'cancel_register', label: 'Huỷ đăng ký' },
                                                        ]}
                                                        optionLabel="label"
                                                        optionValue="key"
                                                        placeholder="Hãy chọn trạng thái đăng ký"
                                                        className="w-full"
                                                    />
                                                </span>
                                            </div>
                                            <hr />
                                            <div className="w-full mb-2">
                                                <Button
                                                    className={`w-full font-bold`}
                                                    icon={'pi pi-check'}
                                                    label={'Xác nhận'}
                                                    onClick={handleOnChangeStatus}
                                                />
                                            </div>
                                            <div className="w-full">
                                                <Button
                                                    className={`w-full font-bold bg-red-400`}
                                                    icon={'pi pi-trash'}
                                                    label={'Xoá bỏ đăng ký'}
                                                    onClick={handleOnDeleteRegistraion}
                                                />
                                            </div>
                                        </OverlayPanel>
                                    </div>
                                ) : col.field === 'registrationStatus' ? (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        {rowData[col.field] === 'new_learning'
                                            ? 'Học mới'
                                            : rowData[col.field] === 'again_learning'
                                            ? 'Học lại'
                                            : rowData[col.field] === 'improve_learning'
                                            ? 'Học cải thiện'
                                            : rowData[col.field] === 'cancel_register'
                                            ? 'Đã huỷ đăng ký'
                                            : '-'}
                                    </div>
                                ) : col.field === 'sectionClasses' ? (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        {rowData[col.field] && rowData[col.field]?.length > 0
                                            ? rowData[col.field].map((sectionClass) => sectionClass.code).join(', ')
                                            : '-'}
                                    </div>
                                ) : (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        {rowData[col.field]}
                                    </div>
                                )
                            }
                        />
                    ))}
                </DataTable>
            </div>

            <StudentSectionForm ref={studentSectionRef} />
        </React.Fragment>
    );
};

export default StudentSectionManagement;
