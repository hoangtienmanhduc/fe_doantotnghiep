import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserId } from '~/components/authentication/AuthUtils';
import { useRef } from 'react';
import SectionForm from './SectionForm';
import { getPageSectionInfo } from '~/api/section/SectionService';

const QueryKey = 'Section-Management';
const initialPageable = {
    rows: 10,
    pageNumber: 0,
    sortField: 'id',
    sortOrder: -1,
};
const SectionManagement = () => {
    const [pageable, setPageable] = useState({ ...initialPageable });

    const { data, refetch } = useQuery(
        [QueryKey, getUserId(), pageable.pageNumber, pageable.rows, pageable.sortField, pageable.sortOrder, {}],
        () =>
            getPageSectionInfo(
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

    const sectionRef = useRef(null);
    const columns = [
        { field: 'termName', header: 'Thuộc học kỳ' },
        { field: 'courseName', header: 'Thuộc môn học' },
        { field: 'courseCode', header: 'Mã môn học' },
        { field: 'name', header: 'Tên học phần' },
        { field: 'code', header: 'Mã học phần' },
        { field: 'openDate', header: 'Thời gian mở đăng ký' },
        { field: 'lockDate', header: 'Thời gian khoá đăng ký' },
        { field: 'description', header: 'Mô tả học phần' },
        { field: 'action', header: 'Thao tác' },
    ];

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <p className="text-900 font-bold">QUẢN LÝ HỌC PHẦN</p>
            <div className="flex align-items-center ">
                <Button className="mr-2" icon="pi pi-refresh" rounded raised onClick={refetch} />
                <Button className="" icon="pi pi-plus" rounded raised onClick={() => sectionRef.current.showForm({})} />
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
                    getPageSectionInfo(
                        getUserId(),
                        pageable?.pageNumber + 1,
                        pageable?.rows,
                        pageable.sortField,
                        pageable.sortOrder,
                        {},
                    ),
            );
        }
    }, [data, pageable, queryClient]);

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
                            className="text-center p-4"
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
                                ) : col.field === 'action' ? (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        <Button
                                            text
                                            icon="pi pi-pencil"
                                            rounded
                                            raised
                                            onClick={() => sectionRef.current.showForm(rowData)}
                                        />
                                    </div>
                                ) : col.field === 'lockDate' || col.field === 'openDate' ? (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        {new Date(rowData[col.field]).toLocaleDateString()}
                                    </div>
                                ) : col.field === 'sectionType' ? (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        {rowData[col.field] === 'elective'
                                            ? 'Tự chọn'
                                            : rowData[col.field] === 'compulsory'
                                            ? 'Bắt buộc'
                                            : '-'}
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
            <SectionForm ref={sectionRef} />
        </React.Fragment>
    );
};

export default SectionManagement;
