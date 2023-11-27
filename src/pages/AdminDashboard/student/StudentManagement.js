import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useQuery } from '@tanstack/react-query';
import { getUserId } from '~/components/authentication/AuthUtils';
import { useRef } from 'react';
import { getPageUser } from '~/api/user/UserService';
import StudentForm from './StudentForm';

const QueryKey = 'Student-Management';

const StudentManagement = () => {
    const { data, refetch } = useQuery(
        [QueryKey, getUserId()],
        () => getPageUser(getUserId(), 0, 10, 'id', 0, { systemRole: 'student' }),
        {
            enabled: !!getUserId(),
        },
    );

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
        { field: 'address', header: 'Address' },
        { field: 'action', header: 'Action' },
    ];

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2 p-3">
            <h2 className="text-900 font-bold">Student Management</h2>
            <div className="flex align-items-center ">
                <Button className="p-5 text-5xl mr-2" icon="pi pi-refresh" rounded raised onClick={refetch} />
                <Button
                    className="p-5 text-5xl"
                    icon="pi pi-plus"
                    rounded
                    raised
                    onClick={() => studentRef.current.showForm()}
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
                    size="large"
                    tableStyle={{ minWidth: '60rem' }}
                    showGridlines
                    rows={5}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    className="text-3xl"
                >
                    {columns.map((col, i) => (
                        <Column
                            className="text-center p-4"
                            key={col.field}
                            field={col.field}
                            header={col.header}
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
        </React.Fragment>
    );
};

export default StudentManagement;
