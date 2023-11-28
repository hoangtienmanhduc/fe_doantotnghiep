import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserId } from '~/components/authentication/AuthUtils';
import { useRef } from 'react';
import LecturerForm from './LecturerForm';
import { getPageUser } from '~/api/user/UserService';

const QueryKey = 'Lecturer-Management';
const initialPageable = {
    rows: 10,
    pageNumber: 0,
    sortField: 'id',
    sortOrder: -1,
};
const LecturerManagement = () => {
    const [pageable, setPageable] = useState({ ...initialPageable });

    const { data, refetch } = useQuery(
        [
            QueryKey,
            getUserId(),
            pageable.pageNumber,
            pageable.rows,
            pageable.sortField,
            pageable.sortOrder,
            { systemRole: 'lecturer' },
        ],
        () =>
            getPageUser(getUserId(), pageable.pageNumber, pageable.rows, pageable.sortField, pageable.sortOrder, {
                systemRole: 'lecturer',
            }),
        {
            enabled: !!getUserId(),
        },
    );

    const lecturerRef = useRef(null);
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
        { field: 'title', header: 'Title' },
        { field: 'position', header: 'position' },
        { field: 'address', header: 'Address' },
        { field: 'action', header: 'Action' },
    ];

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2 p-3">
            <h2 className="text-900 font-bold">Lecturer Management</h2>
            <div className="flex align-items-center ">
                <Button className="p-5 text-xl mr-2" icon="pi pi-refresh" rounded raised onClick={refetch} />
                <Button
                    className="p-5 text-xl"
                    icon="pi pi-plus"
                    rounded
                    raised
                    onClick={() => lecturerRef.current.showForm()}
                />
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
                    { systemRole: 'lecturer' },
                ],
                () =>
                    getPageUser(
                        getUserId(),
                        pageable?.pageNumber + 1,
                        pageable?.rows,
                        pageable.sortField,
                        pageable.sortOrder,
                        { systemRole: 'lecturer' },
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
                            sortable
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
                                            className="p-5 text-xl"
                                            icon="pi pi-pencil"
                                            rounded
                                            raised
                                            onClick={() => lecturerRef.current.showForm(rowData)}
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
                    {console.log(data)}
                </DataTable>
            </div>
            <LecturerForm ref={lecturerRef} />
        </React.Fragment>
    );
};

export default LecturerManagement;
