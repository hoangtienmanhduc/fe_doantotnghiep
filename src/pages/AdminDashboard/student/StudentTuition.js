import { useQuery } from '@tanstack/react-query';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { changeStudentTuitionStatus, getPageStudentTuition } from '~/api/registration/RegistrationService';
import { getListSectionInfo } from '~/api/section/SectionService';
import { getListTermInfo } from '~/api/term/TermService';
import { getRefId, getUserId } from '~/components/authentication/AuthUtils';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Dropdown } from 'primereact/dropdown';
import { showNotification } from '~/components/notification/NotificationService';
import { HTTP_STATUS_OK } from '~/utils/Constants';
import { useParams } from 'react-router-dom';
const QueryKeySectionOptions = 'Section-Options';
const QueryKeyTerm = 'Term-Options';

const QueryKey = 'Tuition-Student-Page';
const initialPageable = {
    rows: 10,
    pageNumber: 0,
    sortField: 'id',
    sortOrder: -1,
};
const StudentTuition = () => {
    const { id: idString } = useParams();
    const id = useMemo(() => {
        return !!idString ? parseInt(idString) : null;
    }, [idString]);

    const [pageable, setPageable] = useState({ ...initialPageable });
    const [filterRequest, setFilterRequest] = useState({ studentId: id });
    const [tuitionStatus, setTuitionStatus] = useState(null);
    const studentSectionRef = useRef(null);
    const op = useRef(null);

    const { data: sectionOptions } = useQuery(
        [QueryKeySectionOptions, getUserId()],
        () => getListSectionInfo(getUserId(), {}, null, true),
        { enabled: !!getUserId() },
    );

    const { data: termOptions } = useQuery([QueryKeyTerm, getUserId()], () => getListTermInfo(getUserId()), {
        enabled: !!getUserId(),
    });

    // Student Section DataPage
    const { data, refetch } = useQuery(
        [QueryKey, getUserId(), getRefId(), { ...pageable }, { ...filterRequest }],
        () =>
            getPageStudentTuition(
                getUserId(),
                pageable.pageNumber,
                pageable.rows,
                pageable.sortField,
                pageable.sortOrder,
                { ...filterRequest },
            ),
        { enabled: !!getUserId() && !!getRefId() },
    );

    const columns = [
        { field: 'termName', header: 'Thuộc học kỳ' },
        { field: 'sectionName', header: 'Tên học phần' },
        { field: 'sectionCode', header: 'Mã học phần' },
        { field: 'initialFee', header: 'Học phí' },
        { field: 'status', header: 'Trạng thái đóng' },
        { field: 'paymentDate', header: 'Ngày chi trả' },
        { field: 'action', header: 'Thao tác' },
    ];

    const handleOnChangeStatus = useCallback(
        async (id) => {
            if (!tuitionStatus) {
                showNotification('error', 'Lỗi', 'Trạng thái đóng học phí không được để trống !!');
                return;
            }

            if (!id) {
                showNotification('error', 'Lỗi', 'Mã công nợ sinh viên không được để trống !!');
                return;
            }

            const toPostData = {
                id: id,
                status: tuitionStatus,
            };

            const response = await changeStudentTuitionStatus(getUserId(), toPostData);

            if (response === HTTP_STATUS_OK) {
                showNotification('success', 'Thành công', 'Cập nhật trạng thái công nợ thành công !!');
                setTuitionStatus(null);
                return;
            }
        },
        [tuitionStatus],
    );

    const header = () => {
        return (
            <React.Fragment>
                <div className="col-12 surface-50 border-round-xl">
                    <div className="w-full">
                        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                            <p className="text-900 font-bold">QUẢN LÝ HỌC PHÍ CỦA SINH VIÊN</p>
                            <div className="flex align-items-center ">
                                <Button className="mr-2" icon="pi pi-refresh" rounded raised onClick={refetch} />
                                <Button
                                    icon="pi pi-plus"
                                    rounded
                                    raised
                                    onClick={() => studentSectionRef.current.showForm({}, 'create')}
                                />
                            </div>
                        </div>
                        <div className="grid col-12 justify-content-between align-items-center m-0">
                            <div className="w-full grid m-0 jutify-content-between align-items-center">
                                <div className="col-4">
                                    <span className="font-semibold text-primary">
                                        <p className="mb-0">Thuộc Học kỳ</p>
                                    </span>
                                    <MultiSelect
                                        value={filterRequest?.termIds || null}
                                        onChange={(e) => setFilterRequest({ ...filterRequest, termIds: [...e.value] })}
                                        options={termOptions}
                                        optionValue="id"
                                        optionLabel="name"
                                        filter
                                        placeholder="Chọn học kỳ để lọc lớp học phần"
                                        maxSelectedLabels={3}
                                        className="w-full"
                                    />
                                </div>
                                <div className="col-4">
                                    <span className="font-semibold text-primary">
                                        <p className="mb-0">Thuộc học phần</p>
                                    </span>
                                    <MultiSelect
                                        value={filterRequest?.sectionIds || null}
                                        onChange={(e) =>
                                            setFilterRequest({ ...filterRequest, sectionIds: [...e.value] })
                                        }
                                        options={sectionOptions}
                                        optionValue="id"
                                        optionLabel="name"
                                        filter
                                        placeholder="Chọn tên học phần để lọc lớp học phần"
                                        maxSelectedLabels={3}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="col-12 p-2">
                        <span className="font-semibold text-primary">
                            <p className="m-0">Tìm kiếm</p>
                        </span>
                        <span className="p-input-icon-left w-full">
                            <i className="pi pi-search" />
                            <InputText
                                value={filterRequest?.searchValue || ''}
                                placeholder="Nhập mã lớp học phần để tìm kiếm"
                                onChange={(e) => setFilterRequest({ ...filterRequest, searchValue: e.target.value })}
                                className="w-full"
                            />
                        </span>
                    </div>
                </div>
            </React.Fragment>
        );
    };

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
                            key={i}
                            field={col.field}
                            header={col.header}
                            sortable
                            body={(rowData) =>
                                col.field === 'status' ? (
                                    rowData[col.field] === 'paid' ? (
                                        <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                            Đã đóng
                                        </div>
                                    ) : (
                                        <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                            Chưa đóng
                                        </div>
                                    )
                                ) : col.field === 'action' ? (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        <Button
                                            icon="pi pi-arrow-right-arrow-left"
                                            tooltip="Đổi trạng thái đăng ký"
                                            tooltipOptions={{ position: 'left' }}
                                            rounded
                                            className="mr-2"
                                            raised
                                            onClick={(e) => {
                                                op.current.toggle(e);
                                            }}
                                        />
                                        <OverlayPanel ref={op} showCloseIcon>
                                            <div className="w-20rem p-0">
                                                <p>Trạng thái đóng học phí</p>
                                                <span className="w-full">
                                                    <Dropdown
                                                        value={tuitionStatus || null}
                                                        onChange={(e) => setTuitionStatus(e.target.value)}
                                                        options={[
                                                            { key: 'paid', label: 'Đã đóng' },
                                                            { key: 'unpaid', label: 'Chưa đóng' },
                                                        ]}
                                                        optionLabel="label"
                                                        optionValue="key"
                                                        placeholder="Hãy chọn trạng thái đóng học phí"
                                                        className="w-full"
                                                    />
                                                </span>
                                            </div>
                                            <hr />
                                            <div className="w-full">
                                                <Button
                                                    className={`w-full font-bold`}
                                                    icon={'pi pi-check'}
                                                    label={'Xác nhận'}
                                                    onClick={() => handleOnChangeStatus(rowData.id)}
                                                />
                                            </div>
                                        </OverlayPanel>
                                    </div>
                                ) : col.field === 'paymentDate' ? (
                                    <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
                                        {rowData[col.field]
                                            ? new Date(rowData[col.field]).toLocaleDateString()
                                            : 'Hiện tại chưa chi trả'}
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
        </React.Fragment>
    );
};

export default StudentTuition;
