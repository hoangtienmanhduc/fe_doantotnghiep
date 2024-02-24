import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserId } from '~/components/authentication/AuthUtils';
import { useRef } from 'react';
import AcademicYearForm from './AcademicYearForm';
import { getPageAcademicYearInfo } from '~/api/academic-year/AcademicYearService';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const QueryKey = 'Academic-Year-Management';
const initialPageable = {
    rows: 10,
    pageNumber: 0,
    sortField: 'id',
    sortOrder: -1,
};
const AcademicYearManagement = () => {
    const [pageable, setPageable] = useState({ ...initialPageable });
    const toast = useRef();
    const { data, refetch } = useQuery(
        [QueryKey, getUserId(), pageable.pageNumber, pageable.rows, pageable.sortField, pageable.sortOrder, {}],
        () => getPageAcademicYearInfo(getUserId()),
        {
            enabled: !!getUserId(),
        },
    );

    const academicRef = useRef(null);
    const columns = [
        { field: 'name', header: 'Niên khoá' },
        { field: 'action', header: 'Thao tác' },
    ];

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <p className="text-900 font-bold m-0">QUẢN LÝ NIÊN KHOÁ</p>
            <div className="flex align-items-center ">
                <Button className="mr-2" icon="pi pi-refresh" rounded raised onClick={refetch} />
                <Button className="" icon="pi pi-plus" rounded raised onClick={() => academicRef.current.showForm()} />
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
                    getPageAcademicYearInfo(
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

    const accept = () => {
        toast.current.show({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'Xoá niên khoá thành công !!',
            life: 3000,
        });
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'Huỷ xoá niên khoá', life: 3000 });
    };

    const deleteConfirm = () => {
        confirmDialog({
            message: 'Bạn có chắc xoá niên khoá này không?',
            header: 'Xác nhân xoá',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
            reject,
        });
    };

    return (
        <React.Fragment>
            <div className="col-12">
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
                                ) : col.field === 'action' ? (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        <Button
                                            className="mr-2"
                                            text
                                            icon="pi pi-pencil"
                                            rounded
                                            raised
                                            onClick={() => academicRef.current.showForm(rowData)}
                                        />
                                        <Button text icon="pi pi-times" rounded raised onClick={deleteConfirm} />
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
            <AcademicYearForm ref={academicRef} />
            <ConfirmDialog />
            <Toast ref={toast} />
        </React.Fragment>
    );
};

export default AcademicYearManagement;
