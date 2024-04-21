import React, { useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserId } from '~/components/authentication/AuthUtils';
import { useRef } from 'react';
import { getPageUser } from '~/api/user/UserService';
import StudentForm from './StudentForm';
import { useCallback } from 'react';
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { separateStudentsByClass } from '~/api/specialization/SpecializationClassService';
import { HTTP_STATUS_OK } from '~/utils/Constants';
import { getListSchoolYear } from '~/api/student/StudentService';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';

const QueryKey = 'Student-Management';
const QueryKeySchoolYear = 'School-Year-Options';
const initialPageable = {
    rows: 10,
    pageNumber: 0,
    sortField: 'id',
    sortOrder: -1,
};
const StudentManagement = () => {
    const [pageable, setPageable] = useState({ ...initialPageable });
    const [filterRequest, setFilterRequest] = useState({});

    const { data, refetch } = useQuery(
        [
            QueryKey,
            getUserId(),
            pageable.pageNumber,
            pageable.rows,
            pageable.sortField,
            pageable.sortOrder,
            { ...filterRequest, systemRole: 'student' },
        ],
        () =>
            getPageUser(getUserId(), pageable.pageNumber, pageable.rows, pageable.sortField, pageable.sortOrder, {
                ...filterRequest,
                systemRole: 'student',
            }),
        {
            enabled: !!getUserId(),
        },
    );

    const [visible, setVisible] = useState(false);
    const studentRef = useRef(null);
    const columns = [
        { field: 'username', header: 'Tên người dùng' },
        { field: 'email', header: 'Email' },
        { field: 'firstName', header: 'Tên' },
        { field: 'lastName', header: 'Họ đệm' },
        { field: 'gender', header: 'Giới tính' },
        { field: 'code', header: 'Mã sinh viên' },
        { field: 'dob', header: 'Ngày sinh' },
        { field: 'cinumber', header: 'Số căn cước công dân' },
        { field: 'specializationName', header: 'Thuộc chuyên ngành' },
        { field: 'specializationClassName', header: 'Thuộc lớp chuyên ngành' },
        { field: 'typeOfEducation', header: 'Loại hình đào tạo' },
        { field: 'schoolYear', header: 'Niên khoá' },
        { field: 'address', header: 'Địa chỉ' },
        { field: 'action', header: 'Thao tác' },
    ];

    const columnsSeparate = [
        { field: 'username', header: 'Tên người dùng' },
        { field: 'email', header: 'Email' },
        { field: 'firstName', header: 'Tên' },
        { field: 'lastName', header: 'Họ đệm' },
        { field: 'code', header: 'Mã sinh viên' },
        { field: 'specializationName', header: 'Thuộc chuyên ngành' },
        { field: 'schoolYear', header: 'Niên khoá' },
        { field: 'specializationClassName', header: 'Thuộc lớp chuyên ngành' },
    ];

    const { data: schoolYearOptions } = useQuery(
        [QueryKeySchoolYear, getUserId()],
        () => getListSchoolYear(getUserId()),
        { enabled: !!getUserId() },
    );

    const toast = useRef(null);
    const [schoolYear, setSchoolYear] = useState(null);
    const [loading, setLoading] = useState(null);
    const { mutate } = useMutation((schoolYear) => separateStudentsByClass(schoolYear), {
        onSuccess: (data) => {
            if (!!data && data === HTTP_STATUS_OK) {
                setLoading(false);
                toast.current.show({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Thao tác chia lớp chuyên ngành cho sinh viên thành công!!',
                });
            }
        },
    });

    const { data: studentSeparates, refetch: refetchSeparate } = useQuery(
        [
            QueryKey,
            getUserId(),
            pageable.pageNumber,
            pageable.rows,
            pageable.sortField,
            pageable.sortOrder,
            { systemRole: 'student', schoolYear: schoolYear },
        ],
        () =>
            getPageUser(getUserId(), pageable.pageNumber, pageable.rows, pageable.sortField, pageable.sortOrder, {
                systemRole: 'student',
            }),
        {
            enabled: !!getUserId() && !!loading,
        },
    );

    const handleOnSeparateStudent = useCallback(() => {
        if (!schoolYear) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Hãy chọn năm học cần chia lớp chuyên ngành trước!!!',
            });
            return;
        }

        setLoading(true);
        mutate(schoolYear);
    }, [mutate, schoolYear]);

    const header = (
        <React.Fragment>
            <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                <p className="text-900 font-bold">QUẢN LÝ SINH VIÊN</p>
                <div className="flex align-items-center ">
                    <Button className="mr-2" icon="pi pi-refresh" rounded raised onClick={refetch} />
                    <Button
                        className="mr-2"
                        icon="pi pi-plus"
                        rounded
                        raised
                        onClick={() => studentRef.current.showForm()}
                    />
                    {/* <Button label="Phân lớp chuyên ngành" rounded raised onClick={() => setVisible(true)} /> */}
                </div>
            </div>
            <div className="col-12">
                <span className="font-semibold text-primary">
                    <p>Tìm kiếm</p>
                </span>
                <span className="p-input-icon-left w-full">
                    <i className="pi pi-search" />
                    <InputText
                        value={filterRequest?.searchValue || ''}
                        placeholder="Nhập mã sinh viên hoặc tên của sinh viên để tìm kiếm"
                        onChange={(e) => setFilterRequest({ ...filterRequest, searchValue: e.target.value })}
                        className="w-full"
                    />
                </span>
            </div>
        </React.Fragment>
    );

    const headerSeparate = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <p className="text-900 font-bold">Kết quả phân lớp chuyên ngành sinh viên</p>
            <div className="flex align-items-center ">
                <Button className="mr-2" icon="pi pi-refresh" rounded raised onClick={refetchSeparate} />
            </div>
        </div>
    );

    const queryClient = useQueryClient();
    useEffect(() => {
        if (!!getUserId() && data && !data?.last && data.content?.length > 0) {
            queryClient.prefetchQuery(
                [
                    QueryKey,
                    getUserId(),
                    pageable.pageNumber + 1,
                    pageable.rows,
                    pageable.sortField,
                    pageable.sortOrder,
                    { ...filterRequest, systemRole: 'student' },
                ],
                () =>
                    getPageUser(
                        getUserId(),
                        pageable?.pageNumber + 1,
                        pageable?.rows,
                        pageable.sortField,
                        pageable.sortOrder,
                        { ...filterRequest, systemRole: 'student' },
                    ),
            );
        }
    }, [data, filterRequest, pageable.pageNumber, pageable.rows, pageable.sortField, pageable.sortOrder, queryClient]);

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
                                ) : col.field === 'address' ? (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                            {rowData['formattedAddress']}
                                        </div>
                                    </div>
                                ) : col.field === 'gender' ? (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                            {rowData[col.field] === 'unknown'
                                                ? 'Không biết'
                                                : rowData[col.field] === 'male'
                                                ? 'Nam'
                                                : rowData[col.field] === 'female'
                                                ? 'Nữ'
                                                : '-'}
                                        </div>
                                    </div>
                                ) : col.field === 'typeOfEducation' ? (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                            {rowData[col.field] === 'general_program'
                                                ? 'Đại trà'
                                                : rowData[col.field] === 'high_quality_program'
                                                ? 'Chất lượng cao'
                                                : '-'}
                                        </div>
                                    </div>
                                ) : col.field === 'action' ? (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        <Button
                                            text
                                            className="mr-2"
                                            icon="pi pi-pencil"
                                            rounded
                                            raised
                                            tooltip="Chỉnh sửa thông tin của sinh viên"
                                            tooltipOptions={{ position: 'left' }}
                                            onClick={() => studentRef.current.showForm(rowData)}
                                        />
                                        <Button
                                            text
                                            icon="pi pi-eye"
                                            rounded
                                            raised
                                            onClick={() => window.location.assign(`/admin/student/${rowData?.id}`)}
                                            tooltip="Xem các học phần của sinh viên"
                                            tooltipOptions={{ position: 'left' }}
                                        />
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
            <StudentForm ref={studentRef} />
            <Dialog
                visible={visible}
                style={{ width: '80vw' }}
                pt={{ header: { className: 'p-0' } }}
                onHide={() => setVisible(false)}
            >
                <div className="flex col-12">
                    <div className="col-12">
                        <h2>
                            Phân lớp chuyên ngành cho sinh viên
                            <Divider />
                        </h2>
                        <div className="p-inputgroup flex-1">
                            <Dropdown
                                value={schoolYear}
                                onChange={(e) => setSchoolYear(e?.target.value)}
                                options={schoolYearOptions}
                                placeholder="Hãy chọn năm học..."
                            />
                            <Button
                                className={`font-bold`}
                                icon={'pi pi-send'}
                                iconPos="right"
                                label={'Bắt đầu phân chia lớp'}
                                loading={loading}
                                onClick={handleOnSeparateStudent}
                                pt={{ icon: { className: 'pl-2' } }}
                            />
                        </div>
                    </div>
                </div>
                <div className="card col-12">
                    <DataTable
                        value={
                            !!studentSeparates && studentSeparates?.content?.length > 0 ? studentSeparates?.content : []
                        }
                        header={headerSeparate}
                        tableStyle={{ minWidth: '60rem' }}
                        paginator
                        scrollable
                        resizableColumns
                        stripedRows
                        lazy
                        rows={10}
                        first={pageable.pageNumber * pageable.rows}
                        onPage={(e) => setPageable({ ...pageable, pageNumber: e.page })}
                        totalRecords={
                            studentSeparates && studentSeparates.totalElements ? studentSeparates.totalElements : 0
                        }
                    >
                        {columnsSeparate.map((col, i) => (
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
                                    ) : col.field === 'address' ? (
                                        <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                            <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                                {rowData['formattedAddress']}
                                            </div>
                                        </div>
                                    ) : col.field === 'action' ? (
                                        <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                            <Button
                                                text
                                                icon="pi pi-pencil"
                                                rounded
                                                raised
                                                onClick={() => studentRef.current.showForm(rowData)}
                                            />
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
            </Dialog>
            <Toast ref={toast} />
        </React.Fragment>
    );
};

export default StudentManagement;
