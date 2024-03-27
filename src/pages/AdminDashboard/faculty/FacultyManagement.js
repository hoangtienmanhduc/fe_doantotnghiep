import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserId } from '~/components/authentication/AuthUtils';
import { useRef } from 'react';
import { getPageFacultyInfo } from '~/api/faculty/FacultyService';
import FacultyForm from './FacultyForm';
import moment from 'moment';
const initialPageable = {
    rows: 10,
    pageNumber: 0,
    sortField: 'id',
    sortOrder: -1,
};

const QueryKey = 'Faculty-Management';

const FacultyManagement = () => {
    const [pageable, setPageable] = useState({ ...initialPageable });

    const { data, refetch } = useQuery(
        [QueryKey, getUserId(), pageable.pageNumber, pageable.rows, pageable.sortField, pageable.sortOrder, {}],
        () =>
            getPageFacultyInfo(
                getUserId(),
                pageable?.pageNumber,
                pageable?.rows,
                pageable.sortField,
                pageable.sortOrder,
                {},
            ),
        {
            enabled: !!getUserId(),
        },
    );

    const facultyRef = useRef(null);
    const columns = [
        { field: 'code', header: 'Mã khoa' },
        { field: 'name', header: 'Tên khoa' },
        { field: 'establishmentDate', header: 'Ngày thành lập' },
        { field: 'logo', header: 'Logo' },
        { field: 'headName', header: 'Tên trưởng khoa' },
        { field: 'headEmail', header: 'Email trưởng khoa' },
        { field: 'headPhone', header: 'Số điện thoại trưởng khoa' },
        { field: 'action', header: 'Thao tác' },
    ];

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <p className="text-900 font-bold m-0">QUẢN LÝ KHOA</p>
            <div className="flex align-items-center ">
                <Button className="mr-2" icon="pi pi-refresh" rounded raised onClick={refetch} />
                <Button className="" icon="pi pi-plus" rounded raised onClick={() => facultyRef.current.showForm()} />
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
                    {},
                ],
                () =>
                    getPageFacultyInfo(
                        getUserId(),
                        pageable?.pageNumber + 1,
                        pageable?.rows,
                        pageable.sortField,
                        pageable.sortOrder,
                        {},
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
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
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
                                ) : col.field === 'action' ? (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        <Button
                                            text
                                            icon="pi pi-pencil"
                                            rounded
                                            raised
                                            onClick={() => facultyRef.current.showForm(rowData)}
                                        />
                                    </div>
                                ) : col.field === 'logo' ? (
                                    rowData[col.field] ? (
                                        <div className="flex justify-content-center" style={{ width: '100%' }}>
                                            <div className="p-1 border-round-lg bg-gray-50 hover:bg-white">
                                                <img src={rowData[col.field]} height={50} width={50} alt={'logo'} />
                                            </div>
                                        </div>
                                    ) : (
                                        '-'
                                    )
                                ) : (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        {rowData[col.field]
                                            ? col.field !== 'establishmentDate'
                                                ? rowData[col.field]
                                                : moment(rowData[col.field]).format('DD/MM/yyyy')
                                            : '-'}
                                    </div>
                                )
                            }
                        />
                    ))}
                </DataTable>
            </div>
            <FacultyForm ref={facultyRef} />
        </React.Fragment>
    );
};

export default FacultyManagement;
