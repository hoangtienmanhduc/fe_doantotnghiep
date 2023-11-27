import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getUserId } from '~/components/authentication/AuthUtils';
import { useRef } from 'react';
import { getPageUser } from '~/api/user/UserService';
import StudentForm from './StudentForm';
import { useCallback } from 'react';
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { getListAcademicYearInfo } from '~/api/academic-year/AcademicYearService';
import { Toast } from 'primereact/toast';
import { da } from 'date-fns/locale';
import { separateStudentsByClass } from '~/api/specialization/SpecializationClassService';
import { HTTP_STATUS_OK } from '~/utils/Constants';

const QueryKey = 'Student-Management';
const QueryKeyAcademicYear = 'Academic-Year-Options';

const StudentManagement = () => {
    const { data, refetch } = useQuery(
        [QueryKey, getUserId()],
        () => getPageUser(getUserId(), 0, 10, 'id', 0, { systemRole: 'student' }),
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
        { field: 'specializationClassName', header: 'Specialization Class Name' },
    ];

    const { data: academicYearOptions } = useQuery(
        [QueryKeyAcademicYear, getUserId()],
        () => getListAcademicYearInfo(getUserId(), {}, null, true),
        { enabled: !!getUserId() },
    );
    const toast = useRef(null);
    const [schoolYear, setSchoolYear] = useState(null);
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(false);
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
                <Button className="p-5 text-5xl mr-2" icon="pi pi-refresh" rounded raised onClick={refetch} />
                <Button
                    className="p-5 text-5xl mr-2"
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

    return (
        <React.Fragment>
            <div className="card">
                <DataTable
                    value={!!data && data?.content?.length > 0 ? data?.content : []}
                    header={header}
                    tableStyle={{ minWidth: '60rem' }}
                    className="text-2xl"
                    paginator
                    scrollable
                    scrollHeight="400px"
                    resizableColumns
                    stripedRows
                    rows={5}
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
                                            className="p-5 text-5xl"
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
                                options={academicYearOptions}
                                optionLabel="name"
                                optionValue="name"
                                placeholder="Select Academic Year"
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
                {/* <div className="card">
                    <DataTable
                        value={!!dataList && dataList.length > 0 ? dataList : []}
                        tableStyle={{ minWidth: '60rem' }}
                        className="text-2xl"
                        paginator
                        scrollable
                        scrollHeight="400px"
                        resizableColumns
                        stripedRows
                        rows={5}
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
                                                className="p-5 text-5xl"
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
                </div> */}
            </Dialog>
            <Toast ref={toast} />
        </React.Fragment>
    );
};

export default StudentManagement;
