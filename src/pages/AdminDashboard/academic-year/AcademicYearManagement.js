import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useQuery } from '@tanstack/react-query';
import { getUserId } from '~/components/authentication/AuthUtils';
import { useRef } from 'react';
import AcademicYearForm from './AcademicYearForm';
import { getPageAcademicYearInfo } from '~/api/academic-year/AcademicYearService';

const QueryKey = 'Academic-Year-Management';

const AcademicYearManagement = () => {
    const { data, refetch } = useQuery([QueryKey, getUserId()], () => getPageAcademicYearInfo(getUserId()), {
        enabled: !!getUserId(),
    });

    const academicRef = useRef(null);
    const columns = [
        { field: 'name', header: 'Name' },
        { field: 'action', header: 'Action' },
    ];

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2 p-3">
            <h2 className="text-900 font-bold">Academic Year Management</h2>
            <div className="flex align-items-center ">
                <Button className="p-5 text-5xl mr-2" icon="pi pi-refresh" rounded raised onClick={refetch} />
                <Button
                    className="p-5 text-5xl"
                    icon="pi pi-plus"
                    rounded
                    raised
                    onClick={() => academicRef.current.showForm()}
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
                                ) : col.field === 'action' ? (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        <Button
                                            text
                                            className="p-5 text-5xl"
                                            icon="pi pi-pencil"
                                            rounded
                                            raised
                                            onClick={() => academicRef.current.showForm(rowData)}
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
            <AcademicYearForm ref={academicRef} />
        </React.Fragment>
    );
};

export default AcademicYearManagement;
