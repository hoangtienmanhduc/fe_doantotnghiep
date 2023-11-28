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

    const { data, refetch } = useQuery(
        [
            QueryKey,
            getUserId(),
            pageable.pageNumber,
            pageable.rows,
            pageable.sortField,
            pageable.sortOrder,
            { systemRole: 'student' },
        ],
        () =>
            getPageUser(getUserId(), pageable.pageNumber, pageable.rows, pageable.sortField, pageable.sortOrder, {
                systemRole: 'student',
            }),
        {
            enabled: !!getUserId(),
        },
    );

    const [visible, setVisible] = useState(false);
    const studentRef = useRef(null);
    const columns = [
        { field: 'username', header: 'Username' },
        { field: 'email', header: 'Email' },
        { field: 'firstName', header: 'Firstname' },
        { field: 'lastName', header: 'Lastname' },
        { field: 'gender', header: 'Gender' },
        { field: 'code', header: 'Code' },
        { field: 'dob', header: 'Date Of Birth' },
        { field: 'cinumber', header: 'CI Number' },
        { field: 'specializationName', header: 'Specialization Name' },
        { field: 'specializationClassName', header: 'Specialization Class Name' },
        { field: 'typeOfEducation', header: 'Type Of Education' },
        { field: 'schoolYear', header: 'School Year' },
        { field: 'address', header: 'Address' },
        { field: 'action', header: 'Action' },
    ];

    const columnsSeparate = [
        { field: 'username', header: 'Username' },
        { field: 'email', header: 'Email' },
        { field: 'firstName', header: 'Firstname' },
        { field: 'lastName', header: 'Lastname' },
        { field: 'code', header: 'Code' },
        { field: 'specializationName', header: 'Specialization Name' },
        { field: 'schoolYear', header: 'School Year' },
        { field: 'specializationClassName', header: 'Specialization Class Name' },
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
                    detail: 'Separate Students Class successful !!',
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
                detail: 'Please select a school year first !!!',
            });
            return;
        }

        setLoading(true);
        mutate(schoolYear);
    }, [mutate, schoolYear]);

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2 p-3">
            <h2 className="text-900 font-bold">Student Management</h2>
            <div className="flex align-items-center ">
                <Button className="p-5 text-xl mr-2" icon="pi pi-refresh" rounded raised onClick={refetch} />
                <Button
                    className="p-5 text-xl mr-2"
                    icon="pi pi-plus"
                    rounded
                    raised
                    onClick={() => studentRef.current.showForm()}
                />
                <Button
                    className="p-4"
                    label="Separate Student By School Year"
                    rounded
                    raised
                    onClick={() => setVisible(true)}
                />
            </div>
        </div>
    );

    const headerSeparate = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2 p-3">
            <h2 className="text-900 font-bold">Student Separated</h2>
            <div className="flex align-items-center ">
                <Button className="p-5 text-xl mr-2" icon="pi pi-refresh" rounded raised onClick={refetchSeparate} />
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
                    { systemRole: 'student' },
                ],
                () =>
                    getPageUser(
                        getUserId(),
                        pageable?.pageNumber + 1,
                        pageable?.rows,
                        pageable.sortField,
                        pageable.sortOrder,
                        { systemRole: 'student' },
                    ),
            );
        }
    }, [data, pageable.pageNumber, pageable.rows, pageable.sortField, pageable.sortOrder, queryClient]);

    return (
        <React.Fragment>
            <div className="card col-12">
                <DataTable
                    value={!!data && data?.content?.length > 0 ? data?.content : []}
                    header={header}
                    size="large"
                    tableStyle={{ minWidth: '60rem' }}
                    className="text-2xl"
                    paginator
                    scrollable
                    scrollHeight="400px"
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
                            className="text-center p-4"
                            key={col.field}
                            field={col.field}
                            header={col.header}
                            sortable
                            body={(rowData) =>
                                col.field === 'deleted' ? (
                                    rowData[col.field] ? (
                                        <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                            Yes
                                        </div>
                                    ) : (
                                        <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                            No
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
                                            className="p-5 text-xl"
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
            <StudentForm ref={studentRef} />
            <Dialog visible={visible} style={{ width: '80vw' }} onHide={() => setVisible(false)}>
                <div className="flex col-12 p-3">
                    <div className="col-6">
                        <h2>School Year</h2>
                        <span className="w-full">
                            <Dropdown
                                value={schoolYear}
                                onChange={(e) => setSchoolYear(e?.target.value)}
                                options={schoolYearOptions}
                                placeholder="Select School Year"
                                className="w-full p-4"
                            />
                        </span>
                    </div>
                    <div className="flex justify-content-end col-6">
                        <Button
                            className={`p-button-lg font-bold h-full p-3`}
                            icon={'pi pi-send'}
                            iconPos="right"
                            label={'Start separate students'}
                            loading={loading}
                            onClick={handleOnSeparateStudent}
                            pt={{ icon: { className: 'pl-3' } }}
                        />
                    </div>
                </div>
                <div className="card col-12">
                    <DataTable
                        value={
                            !!studentSeparates && studentSeparates?.content?.length > 0 ? studentSeparates?.content : []
                        }
                        header={headerSeparate}
                        size="large"
                        tableStyle={{ minWidth: '60rem' }}
                        className="text-2xl"
                        paginator
                        scrollable
                        scrollHeight="400px"
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
                                className="text-center p-4"
                                key={col.field}
                                field={col.field}
                                header={col.header}
                                sortable
                                body={(rowData) =>
                                    col.field === 'deleted' ? (
                                        rowData[col.field] ? (
                                            <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                                Yes
                                            </div>
                                        ) : (
                                            <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                                No
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
                                                className="p-5 text-xl"
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
            <Toast ref={toast} className="p-3" />
        </React.Fragment>
    );
};

export default StudentManagement;
