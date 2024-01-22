import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserId } from '~/components/authentication/AuthUtils';
import { useRef } from 'react';
import SpecializationClassForm from './SpecializationClassForm';
import { getPageSpecializationClassInfo } from '~/api/specialization/SpecializationClassService';

const QueryKey = 'Specialization-Class-Management';
const initialPageable = {
    rows: 10,
    pageNumber: 0,
    sortField: 'id',
    sortOrder: -1,
};
const SpecializationClassManagement = () => {
    const [pageable, setPageable] = useState({ ...initialPageable });

    const { data, refetch } = useQuery(
        [QueryKey, getUserId(), pageable.pageNumber, pageable.rows, pageable.sortField, pageable.sortOrder, {}],
        () =>
            getPageSpecializationClassInfo(
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

    const specializationClassRef = useRef(null);
    const columns = [
        { field: 'specializationName', header: 'Tên chuyên ngành' },
        { field: 'specializationCode', header: 'Mã chuyên ngành' },
        { field: 'name', header: 'Tên lớp chuyên ngành' },
        { field: 'schoolYear', header: 'Niên khoá' },
        { field: 'action', header: 'Thao tác' },
    ];

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <p className="text-900 font-bold">QUẢN LÝ LỚP CHUYÊN NGÀNH</p>
            <div className="flex align-items-center ">
                <Button className="mr-2" icon="pi pi-refresh" rounded raised onClick={refetch} />
                <Button icon="pi pi-plus" rounded raised onClick={() => specializationClassRef.current.showForm()} />
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
                    getPageSpecializationClassInfo(
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
                            sortable
                            field={col.field}
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
                                            onClick={() => specializationClassRef.current.showForm(rowData)}
                                        />
                                    </div>
                                ) : (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        {rowData[col.field] ? rowData[col.field] : '-'}
                                    </div>
                                )
                            }
                        />
                    ))}
                </DataTable>
            </div>
            <SpecializationClassForm ref={specializationClassRef} />
        </React.Fragment>
    );
};

export default SpecializationClassManagement;
