import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useQuery } from '@tanstack/react-query';
import { getUserId } from '~/components/authentication/AuthUtils';
import { useRef } from 'react';
import SectionForm from './SectionForm';
import { getPageSectionInfo } from '~/api/section/SectionService';

const QueryKey = 'Section-Management';

const SectionManagement = () => {
    const { data, refetch } = useQuery([QueryKey, getUserId()], () => getPageSectionInfo(getUserId()), {
        enabled: !!getUserId(),
    });

    const sectionRef = useRef(null);
    const columns = [
        { field: 'courseName', header: 'Course Name' },
        { field: 'courseCode', header: 'Course Code' },
        { field: 'termName', header: 'Term Name' },
        { field: 'name', header: 'Name' },
        { field: 'code', header: 'Code' },
        { field: 'theoryPeriods', header: 'Theory Periods' },
        { field: 'practicePeriods', header: 'Practice Periods' },
        { field: 'sectionType', header: 'Section Type' },
        { field: 'createdAt', header: 'Created At' },
        { field: 'deleted', header: 'Deleted' },
        { field: 'action', header: 'Action' },
    ];

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2 p-3">
            <h2 className="text-900 font-bold">Sections Management</h2>
            <div className="flex align-items-center ">
                <Button className="p-5 text-5xl mr-2" icon="pi pi-refresh" rounded raised onClick={refetch} />
                <Button
                    className="p-5 text-5xl"
                    icon="pi pi-plus"
                    rounded
                    raised
                    onClick={() => sectionRef.current.showForm({})}
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
                                ) : col.field === 'action' ? (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        <Button
                                            text
                                            className="p-5 text-5xl"
                                            icon="pi pi-pencil"
                                            rounded
                                            raised
                                            onClick={() => sectionRef.current.showForm(rowData)}
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
            <SectionForm ref={sectionRef} />
        </React.Fragment>
    );
};

export default SectionManagement;
