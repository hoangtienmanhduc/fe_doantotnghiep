import React, { useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserId } from '~/components/authentication/AuthUtils';
import { useRef } from 'react';
import { getPageUser } from '~/api/user/UserService';
import { useState } from 'react';
import { Toast } from 'primereact/toast';

import { InputText } from 'primereact/inputtext';
import StaffForm from './StaffForm';

const QueryKey = 'Staff-Management';
const initialPageable = {
    rows: 10,
    pageNumber: 0,
    sortField: 'id',
    sortOrder: -1,
};
const StaffManagement = () => {
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
            { ...filterRequest, systemRole: 'staff' },
        ],
        () =>
            getPageUser(getUserId(), pageable.pageNumber, pageable.rows, pageable.sortField, pageable.sortOrder, {
                ...filterRequest,
                systemRole: 'staff',
            }),
        {
            enabled: !!getUserId(),
        },
    );

    const staffRef = useRef(null);
    const columns = [
        { field: 'username', header: 'Tên người dùng' },
        { field: 'email', header: 'Email' },
        { field: 'firstName', header: 'Tên' },
        { field: 'lastName', header: 'Họ đệm' },
        { field: 'gender', header: 'Giới tính' },
        { field: 'code', header: 'Mã nhân viên' },
        { field: 'dob', header: 'Ngày sinh' },
        { field: 'cinumber', header: 'Số căn cước công dân' },
        { field: 'address', header: 'Địa chỉ' },
        { field: 'action', header: 'Thao tác' },
    ];

    const toast = useRef(null);

    const header = (
        <React.Fragment>
            <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                <p className="text-900 font-bold">QUẢN LÝ NHÂN VIÊN</p>
                <div className="flex align-items-center ">
                    <Button className="mr-2" icon="pi pi-refresh" rounded raised onClick={refetch} />
                    <Button
                        className="mr-2"
                        icon="pi pi-plus"
                        rounded
                        raised
                        onClick={() => staffRef.current.showForm()}
                    />
                </div>
            </div>
            <div className="col-12">
                <span className="font-semibold text-primary">
                    <p>Tìm kiếm</p>
                </span>
                <span className="p-input-icon-left w-full">
                    <InputText
                        value={filterRequest?.searchValue || ''}
                        placeholder="Nhập mã nhân viên hoặc tên của nhân viên để tìm kiếm"
                        onChange={(e) => setFilterRequest({ ...filterRequest, searchValue: e.target.value })}
                        className="w-full"
                    />
                </span>
            </div>
        </React.Fragment>
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
                    { ...filterRequest, systemRole: 'staff' },
                ],
                () =>
                    getPageUser(
                        getUserId(),
                        pageable?.pageNumber + 1,
                        pageable?.rows,
                        pageable.sortField,
                        pageable.sortOrder,
                        { ...filterRequest, systemRole: 'staff' },
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
                                ) : col.field === 'action' ? (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        <Button
                                            text
                                            className="mr-2"
                                            icon="pi pi-pencil"
                                            rounded
                                            raised
                                            tooltip="Chỉnh sửa thông tin của nhân viên"
                                            tooltipOptions={{ position: 'left' }}
                                            onClick={() => staffRef.current.showForm(rowData)}
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
            <StaffForm ref={staffRef} />
            <Toast ref={toast} />
        </React.Fragment>
    );
};

export default StaffManagement;
