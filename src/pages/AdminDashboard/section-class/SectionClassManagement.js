import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserId } from '~/components/authentication/AuthUtils';
import { useRef } from 'react';
import { getPageSectionClassInfo } from '~/api/section/SectionClassService';
import SectionClassForm from './SectionClassForm';

const QueryKey = 'Section-Class-Management';
const initialPageable = {
    rows: 10,
    pageNumber: 0,
    sortField: 'id',
    sortOrder: -1,
};
const SectionClassManagement = () => {
    const [pageable, setPageable] = useState({ ...initialPageable });

    const { data, refetch } = useQuery(
        [QueryKey, getUserId(), pageable.pageNumber, pageable.rows, pageable.sortField, pageable.sortOrder, {}],
        () => getPageSectionClassInfo(getUserId()),
        {
            enabled: !!getUserId(),
        },
    );

    const sectionClassRef = useRef(null);
    const columns = [
        { field: 'sectionName', header: 'Section Name' },
        { field: 'sectionCode', header: 'Section Code' },
        { field: 'lecturerName', header: 'Lecturer Name' },
        { field: 'lecturerCode', header: 'Lecturer Code' },
        { field: 'classCode', header: 'Class Code' },
        { field: 'room', header: 'Room' },
        { field: 'periodFrom', header: 'Period From' },
        { field: 'periodTo', header: 'Period To' },
        { field: 'numberOfStudents', header: 'Number of Students' },
        { field: 'dayInWeek', header: 'Day in Week' },
        { field: 'sectionClassType', header: 'Section Class Type' },
        { field: 'startedAt', header: 'Started At' },
        { field: 'note', header: 'Note' },
        { field: 'action', header: 'Action' },
    ];

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2 p-3">
            <h2 className="text-900 font-bold">Section Class Management</h2>
            <div className="flex align-items-center ">
                <Button className="p-5 text-xl mr-2" icon="pi pi-refresh" rounded raised onClick={refetch} />
                <Button
                    className="p-5 text-xl"
                    icon="pi pi-plus"
                    rounded
                    raised
                    onClick={() => sectionClassRef.current.showForm()}
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
                    {},
                ],
                () =>
                    getPageSectionClassInfo(
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
                                ) : col.field === 'action' ? (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        <Button
                                            text
                                            className="p-5 text-xl"
                                            icon="pi pi-pencil"
                                            rounded
                                            raised
                                            onClick={() => sectionClassRef.current.showForm(rowData)}
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
            <SectionClassForm ref={sectionClassRef} />
        </React.Fragment>
    );
};

export default SectionClassManagement;
