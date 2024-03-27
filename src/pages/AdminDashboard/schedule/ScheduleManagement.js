// import React, { useEffect, useState } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';
// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import { getUserId } from '~/components/authentication/AuthUtils';
// import { useRef } from 'react';
// import { MultiSelect } from 'primereact/multiselect';
// import { getPageSchedule } from '~/api/schedule/ScheduleSevice';
// import { Dialog } from 'primereact/dialog';
// import { InputText } from 'primereact/inputtext';

// const QueryKey = 'Schedule-Management';
// const initialPageable = {
//     rows: 10,
//     pageNumber: 0,
//     sortField: 'id',
//     sortOrder: -1,
// };
// const ScheduleManagement = () => {
//     const [pageable, setPageable] = useState({ ...initialPageable });

//     const [filterRequest, setFilterRequest] = useState({});

//     const [visible, setVisible] = useState(false);

//     const { data, refetch } = useQuery(
//         [
//             QueryKey,
//             getUserId(),
//             pageable.pageNumber,
//             pageable.rows,
//             pageable.sortField,
//             pageable.sortOrder,
//             filterRequest,
//         ],
//         () =>
//             getPageSchedule(getUserId(), pageable.pageNumber, pageable.rows, pageable.sortField, pageable.sortOrder, {
//                 ...filterRequest,
//             }),
//         {
//             enabled: !!getUserId(),
//         },
//     );

//     const lecturerRef = useRef(null);
//     const columns = [
//         { field: 'code', header: 'Mã lớp học phần' },
//         { field: 'action', header: 'Thao tác' },
//         { field: 'action', header: 'Thao tác' },
//         { field: 'action', header: 'Thao tác' },
//     ];

//     const header = (
//         <React.Fragment>
//             <div className="flex flex-wrap align-items-center justify-content-between gap-2">
//                 <p className="text-900 font-bold">QUẢN LÝ THỜI KHOÁ BIỂU</p>
//                 <div className="flex align-items-center ">
//                     <Button
//                         className="mr-2"
//                         icon="pi pi-filter"
//                         rounded
//                         tooltip="Lọc"
//                         raised
//                         onClick={() => setVisible(true)}
//                     />
//                     <Button className="mr-2" icon="pi pi-refresh" rounded raised onClick={refetch} />
//                     <Button
//                         className=""
//                         icon="pi pi-plus"
//                         rounded
//                         raised
//                         onClick={() => lecturerRef.current.showForm()}
//                     />
//                 </div>
//             </div>
//             <div className="col-12">
//                 <span className="font-semibold text-primary">
//                     <p>Tìm kiếm</p>
//                 </span>
//                 <span className="w-full">
//                     <InputText
//                         value={data?.searchValue || ''}
//                         placeholder="Nhập mã lớp học phần để tìm kiếm"
//                         onChange={(e) => {}}
//                         className="w-full"
//                     />
//                 </span>
//             </div>
//         </React.Fragment>
//     );

//     const queryClient = useQueryClient();
//     useEffect(() => {
//         if (!!getUserId() && data && !data?.last && data.content?.length > 0) {
//             queryClient.prefetchQuery(
//                 [
//                     QueryKey,
//                     getUserId(),
//                     pageable.pageNumber + 1,
//                     pageable.rows,
//                     pageable.sortField,
//                     pageable.sortOrder,
//                     {
//                         ...filterRequest,
//                     },
//                 ],
//                 () =>
//                     getPageSchedule(
//                         getUserId(),
//                         pageable?.pageNumber + 1,
//                         pageable?.rows,
//                         pageable.sortField,
//                         pageable.sortOrder,
//                         {
//                             ...filterRequest,
//                         },
//                     ),
//             );
//         }
//     }, [data, filterRequest, pageable.pageNumber, pageable.rows, pageable.sortField, pageable.sortOrder, queryClient]);

//     return (
//         <React.Fragment>
//             <div className="card col-12">
//                 <DataTable
//                     value={!!data && data?.content?.length > 0 ? data?.content : []}
//                     header={header}
//                     tableStyle={{ minWidth: '60rem' }}
//                     paginator
//                     scrollable
//                     resizableColumns
//                     stripedRows
//                     lazy
//                     rows={10}
//                     first={pageable.pageNumber * pageable.rows}
//                     onPage={(e) => setPageable({ ...pageable, pageNumber: e.page })}
//                     totalRecords={data && data.totalElements ? data.totalElements : 0}
//                 >
//                     {columns.map((col, i) => (
//                         <Column
//                             className="text-center"
//                             key={col.field}
//                             field={col.field}
//                             sortable
//                             header={col.header}
//                             body={(rowData) =>
//                                 col.field === 'deleted' ? (
//                                     rowData[col.field] ? (
//                                         <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
//                                             Có
//                                         </div>
//                                     ) : (
//                                         <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
//                                             Không
//                                         </div>
//                                     )
//                                 ) : col.field === 'address' ? (
//                                     <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
//                                         <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
//                                             {rowData['formattedAddress']}
//                                         </div>
//                                     </div>
//                                 ) : col.field === 'action' ? (
//                                     <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
//                                         <Button
//                                             text
//                                             icon="pi pi-pencil"
//                                             rounded
//                                             raised
//                                             onClick={() => lecturerRef.current.showForm(rowData)}
//                                         />
//                                     </div>
//                                 ) : (
//                                     <div className="overflow-dot overflow-text-2" style={{ width: '100%' }}>
//                                         {rowData[col.field]}
//                                     </div>
//                                 )
//                             }
//                         />
//                     ))}
//                 </DataTable>
//             </div>
//             <Dialog
//                 pt={{ header: { className: 'pb-0' }, headerTitle: { className: 'text-2xl' } }}
//                 header="Bộ lọc"
//                 visible={visible}
//                 style={{ width: '50vw' }}
//                 onHide={() => setVisible(false)}
//             >
//                 <hr />
//                 <div className="w-full">
//                     <div className="grid col-12 justify-content-between align-items-center">
//                         <div className="col-12">
//                             <span className="font-semibold text-primary">
//                                 <p>Thuộc Học kỳ</p>
//                             </span>
//                             <MultiSelect
//                                 value={filterRequest?.termIds || null}
//                                 onChange={(e) => setFilterRequest({ ...filterRequest, termIds: [...e.value] })}
//                                 options={[]}
//                                 optionValue="id"
//                                 optionLabel="name"
//                                 filter
//                                 placeholder="Chọn học kỳ để lọc lớp học phần"
//                                 maxSelectedLabels={3}
//                                 className="w-full"
//                             />
//                         </div>
//                         <div className="col-12">
//                             <span className="font-semibold text-primary">
//                                 <p>Thuộc học phần</p>
//                             </span>
//                             <MultiSelect
//                                 value={filterRequest?.sectionIds || null}
//                                 onChange={(e) => setFilterRequest({ ...filterRequest, sectionIds: [...e.value] })}
//                                 options={[]}
//                                 optionValue="id"
//                                 optionLabel="name"
//                                 filter
//                                 placeholder="Chọn tên học phần để lọc lớp học phần"
//                                 maxSelectedLabels={3}
//                                 className="w-full"
//                             />
//                         </div>
//                         <div className="col-12">
//                             <span className="font-semibold text-primary">
//                                 <p>Giảng viên giảng dạy</p>
//                             </span>
//                             <MultiSelect
//                                 value={filterRequest?.lecturerIds || null}
//                                 onChange={(e) => setFilterRequest({ ...filterRequest, lecturerIds: [...e.value] })}
//                                 options={[]}
//                                 optionLabel="name"
//                                 optionValue="id"
//                                 filter
//                                 placeholder="Chọn giảng viên để lọc lớp học phần"
//                                 maxSelectedLabels={3}
//                                 className="w-full"
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </Dialog>
//         </React.Fragment>
//     );
// };

// export default ScheduleManagement;
