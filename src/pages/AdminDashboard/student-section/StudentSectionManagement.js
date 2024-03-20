import React, { useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserId } from '~/components/authentication/AuthUtils';
import { useRef } from 'react';
import { getPageUser } from '~/api/user/UserService';
import StudentForm from './StudentForm';
import { useState } from 'react';
import { Toast } from 'primereact/toast';
import { separateStudentsByClass } from '~/api/specialization/SpecializationClassService';
import { HTTP_STATUS_OK } from '~/utils/Constants';

const QueryKey = 'Student-Section-Management';
const initialPageable = {
    rows: 10,
    pageNumber: 0,
    sortField: 'id',
    sortOrder: -1,
};
const StudentSectionManagement = () => {
    const [pageable, setPageable] = useState({ ...initialPageable });

    const { data, refetch } = useQuery(
        [QueryKey, getUserId(), pageable.pageNumber, pageable.rows, pageable.sortField, pageable.sortOrder, {}],
        () => getPageUser(getUserId(), pageable.pageNumber, pageable.rows, pageable.sortField, pageable.sortOrder, {}),
        {
            enabled: !!getUserId(),
        },
    );

    const [visible, setVisible] = useState(false);
    const studentRef = useRef(null);
    const columns = [
        { field: 'username', header: 'Tên người dùng' },
        { field: 'email', header: 'Email' },
        { field: 'firstName', header: 'Tên' },
        { field: 'lastName', header: 'Họ đệm' },
        { field: 'gender', header: 'Giới tính' },
        { field: 'code', header: 'Mã sinh viên' },
        { field: 'dob', header: 'Ngày sinh' },
        { field: 'cinumber', header: 'Số căn cước công dân' },
        { field: 'specializationName', header: 'Thuộc chuyên ngành' },
        { field: 'specializationClassName', header: 'Thuộc lớp chuyên ngành' },
        { field: 'typeOfEducation', header: 'Loại hình đào tạo' },
        { field: 'schoolYear', header: 'Niên khoá' },
        { field: 'address', header: 'Địa chỉ' },
        { field: 'action', header: 'Thao tác' },
    ];

    const toast = useRef(null);

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <p className="text-900 font-bold">QUẢN LÝ ĐĂNG KÝ HỌC PHẦN</p>
            <div className="flex align-items-center ">
                <Button className="mr-2" icon="pi pi-refresh" rounded raised onClick={refetch} />
                <Button
                    className="mr-2"
                    icon="pi pi-plus"
                    rounded
                    raised
                    onClick={() => studentRef.current.showForm()}
                />
                <Button label="Phân lớp chuyên ngành" rounded raised onClick={() => setVisible(true)} />
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
                    getPageUser(
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
                                ) : col.field === 'action' ? (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        <Button
                                            text
                                            icon="pi pi-pencil"
                                            rounded
                                            raised
                                            onClick={() => studentRef.current.showForm(rowData)}
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
            <StudentForm ref={studentRef} />
            <Toast ref={toast} />
        </React.Fragment>
    );
};

export default StudentSectionManagement;
