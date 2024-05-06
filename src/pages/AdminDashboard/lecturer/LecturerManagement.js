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
        { field: 'username', header: 'Tên người dùng' },
        { field: 'email', header: 'Email' },
        { field: 'firstName', header: 'Họ đệm' },
        { field: 'lastName', header: 'Tên' },
        { field: 'gender', header: 'Giới tính' },
        { field: 'code', header: 'Mã giảng viên' },
        { field: 'dob', header: 'Ngày sinh' },
        { field: 'cinumber', header: 'Số căn cước công dân' },
        { field: 'specializationName', header: 'Thuộc chuyên ngành' },
        { field: 'title', header: 'Chức tước' },
        { field: 'address', header: 'Địa chỉ' },
        { field: 'action', header: 'Thao tác' },
    ];

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2x">
            <p className="text-900 font-bold">QUẢN LÝ GIẢNG VIÊN</p>
            <div className="flex align-items-center ">
                <Button className="mr-2" icon="pi pi-refresh" rounded raised onClick={refetch} />
                <Button className="" icon="pi pi-plus" rounded raised onClick={() => lecturerRef.current.showForm()} />
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
                            sortable
                            header={col.header}
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
                                            onClick={() => lecturerRef.current.showForm(rowData)}
                                        />
                                    </div>
                                ) : col.field === 'gender' ? (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        {rowData[col.field] === 'male'
                                            ? 'Nam'
                                            : rowData[col.field] === 'female'
                                            ? 'Nữ'
                                            : 'Không biết'}
                                    </div>
                                ) : col.field === 'title' ? (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        {rowData[col.field] === 'doctor'
                                            ? 'Tiến sĩ'
                                            : rowData[col.field] === 'master'
                                            ? 'Thạc sĩ'
                                            : 'Giảng viên'}
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
            <LecturerForm ref={lecturerRef} />
        </React.Fragment>
    );
};

export default LecturerManagement;
