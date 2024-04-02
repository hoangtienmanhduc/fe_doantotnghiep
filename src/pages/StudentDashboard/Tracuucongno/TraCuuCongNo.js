/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRefId, getUserId } from '~/components/authentication/AuthUtils';
import { getListTermInfo } from '~/api/term/TermService';
import { Dropdown } from 'primereact/dropdown';
import { getListRegistration, getPageRegistrationInfo } from '~/api/registration/RegistrationService';

const QueryKeyTerm = 'Term-Options';
const QueryKeySectionClassStudent = 'Section-Class-Student-Register';

const Tracuucongno = () => {
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [selectCollapse, setSelectCollapse] = useState([]);
    const { data: termOptions } = useQuery([QueryKeyTerm, getUserId()], () => getListTermInfo(getUserId()), {
        enabled: !!getUserId(),
    });

    const { data: registrationList } = useQuery(
        [QueryKeySectionClassStudent, getRefId(), selectedTerm],
        () =>
            getListRegistration(getUserId(), {
                termId: !!selectedTerm ? (selectedTerm === 'tatca' ? null : selectedTerm) : null,
                sectionClassType: 'theory',
            }),
        {
            enabled: !!getUserId(),
        },
    );

    const totalAllFee = useMemo(() => {
        let credits = 0;
        if (!!registrationList && registrationList?.length > 0) {
            if (!selectedTerm || selectedTerm === 'tatca') {
                registrationList.map((registration) => (credits += registration.costCredits));
            } else {
                registrationList
                    .filter((registration) => registration.termId === selectedTerm)
                    .map((registration) => (credits += registration.costCredits));
            }
        }

        let debt = 0;
        if (!!registrationList && registrationList?.length > 0) {
            if (!selectedTerm || selectedTerm === 'tatca') {
                registrationList.map((registration) => (debt += registration.debt));
            } else {
                registrationList
                    .filter((registration) => registration.termId === selectedTerm)
                    .map((registration) => (debt += registration.debt));
            }
        }

        let totalFee = 0;
        if (!!registrationList && registrationList?.length > 0) {
            if (!selectedTerm || selectedTerm === 'tatca') {
                registrationList.map((registration) => (totalFee += registration.total));
            } else {
                registrationList
                    .filter((registration) => registration.termId === selectedTerm)
                    .map((registration) => (totalFee += registration.total));
            }
        }

        return { debt: debt, totalFee: totalFee };
    }, [registrationList, selectedTerm]);

    const renderRegistrations = useCallback(() => {
        if (!!registrationList && registrationList?.length > 0) {
            if (!!selectedTerm && selectedTerm !== 'tatca') {
                return registrationList
                    .filter((registration) => registration?.termId === selectedTerm)
                    .map((registration, idx) => {
                        return (
                            <tr key={registration?.id}>
                                <td style={{ fontWeight: 'normal', textAlign: 'center' }}>{registration.termName}</td>
                                <td style={{ fontWeight: 'normal', textAlign: 'center' }}>
                                    {registration.sectionClassCode}
                                </td>
                                <td style={{ fontWeight: 'normal', textAlign: 'center' }}>
                                    {registration.sectionName}
                                </td>
                                <td style={{ fontWeight: 'normal', textAlign: 'center' }}>
                                    {registration.costCredits}
                                </td>
                                <td style={{ fontWeight: 'normal', textAlign: 'center' }}>{registration.initialFee}</td>
                                <td style={{ fontWeight: 'normal', textAlign: 'center' }}>
                                    {registration.discountAmount}
                                </td>
                                <td style={{ fontWeight: 'normal', textAlign: 'center' }}>
                                    {registration.discountFee}
                                </td>
                                <td style={{ fontWeight: 'normal', textAlign: 'center' }}>{registration.total}</td>
                                <td style={{ fontWeight: 'normal', textAlign: 'center' }}>
                                    {registration.type === 'new_learning'
                                        ? 'Đăng ký học mới'
                                        : registration.type === 'again_learning'
                                        ? 'Đăng ký học lại'
                                        : registration.type === 'improve_learning'
                                        ? 'Đăng ký học cải thiện'
                                        : '-'}
                                </td>
                                <td style={{ fontWeight: 'normal', textAlign: 'center' }}>
                                    {registration.status === 'registered'
                                        ? 'Đã đăng ký'
                                        : registration.status === 'canceled'
                                        ? 'Xoá bỏ đăng ký'
                                        : '-'}
                                </td>
                                <td style={{ fontWeight: 'normal', textAlign: 'center' }}>{'-'}</td>
                                <td style={{ fontWeight: 'normal', textAlign: 'center' }}>{registration.total}</td>

                                <td style={{ fontWeight: 'normal', textAlign: 'center' }}>
                                    {registration.plusDeductions}
                                </td>
                                <td style={{ fontWeight: 'normal', textAlign: 'center' }}>
                                    {registration.minusDeductions}
                                </td>
                                <td style={{ fontWeight: 'normal', textAlign: 'center' }}>{registration.debt}</td>
                                <td style={{ fontWeight: 'normal', textAlign: 'center' }}>
                                    {registration.tuitionStatus}
                                </td>
                                <td style={{ fontWeight: 'normal', textAlign: 'center' }}>{'-'}</td>
                            </tr>
                        );
                    });
            } else {
                if (!!termOptions && termOptions?.length > 0) {
                    let holderHtml = [];

                    for (let i = 0; i < termOptions.length; i++) {
                        let credits = 0;
                        let initialFee = 0;
                        let discountFee = 0;
                        let plusDeductions = 0;
                        let minusDeductions = 0;
                        let totalFee = 0;
                        if (
                            registrationList?.filter((registration) => registration.termName === termOptions[i].name)
                                ?.length > 0
                        ) {
                            holderHtml.push(
                                registrationList
                                    ?.filter((registration) => registration.termName === termOptions[i].name)
                                    .map((registration) => {
                                        credits += registration?.costCredits;
                                        initialFee += registration?.initialFee;
                                        discountFee += registration?.discountFee;
                                        plusDeductions += registration?.plusDeductions;
                                        minusDeductions += registration?.minusDeductions;
                                        totalFee += registration?.total;
                                        return (
                                            <React.Fragment key={registration?.id}>
                                                <tr
                                                    style={{
                                                        backgroundColor: 'rgba(215, 237, 247, 0.15)',
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() => {
                                                        if (selectCollapse.includes(registration?.id)) {
                                                            setSelectCollapse(
                                                                selectCollapse.filter(
                                                                    (item) => item !== registration?.id,
                                                                ),
                                                            );
                                                        } else {
                                                            setSelectCollapse([...selectCollapse, registration?.id]);
                                                        }
                                                    }}
                                                >
                                                    <td
                                                        style={{ fontWeight: 'semibold', height: '30px' }}
                                                        className="text-primary"
                                                        colSpan="19"
                                                    >
                                                        <i className="pi pi-angle-right"></i>
                                                        Đợt: {registration.termName}
                                                    </td>
                                                </tr>
                                                {!selectCollapse.includes(registration?.id) && (
                                                    <tr className={``}>
                                                        <td style={{ fontWeight: 'normal', textAlign: 'center' }}></td>
                                                        <td style={{ fontWeight: 'normal', textAlign: 'center' }}>
                                                            {registration.termName}
                                                        </td>
                                                        <td style={{ fontWeight: 'normal', textAlign: 'center' }}>
                                                            {registration.sectionClassCode}
                                                        </td>
                                                        <td style={{ fontWeight: 'normal', textAlign: 'center' }}>
                                                            {registration.sectionName}
                                                        </td>
                                                        <td style={{ fontWeight: 'normal', textAlign: 'center' }}>
                                                            {registration.costCredits}
                                                        </td>
                                                        <td style={{ fontWeight: 'normal', textAlign: 'center' }}>
                                                            {registration.initialFee}
                                                        </td>
                                                        <td style={{ fontWeight: 'normal', textAlign: 'center' }}>
                                                            {registration.discountAmount}
                                                        </td>
                                                        <td style={{ fontWeight: 'normal', textAlign: 'center' }}>
                                                            {registration.discountFee}
                                                        </td>
                                                        <td style={{ fontWeight: 'normal', textAlign: 'center' }}>
                                                            {registration.initialFee}
                                                        </td>
                                                        <td style={{ fontWeight: 'normal', textAlign: 'center' }}>
                                                            {registration.type === 'new_learning'
                                                                ? 'Đăng ký học mới'
                                                                : registration.type === 'again_learning'
                                                                ? 'Đăng ký học lại'
                                                                : registration.type === 'improve_learning'
                                                                ? 'Đăng ký học cải thiện'
                                                                : '-'}
                                                        </td>
                                                        <td style={{ fontWeight: 'normal', textAlign: 'center' }}>
                                                            {registration.status === 'registered'
                                                                ? 'Đã đăng ký'
                                                                : registration.status === 'canceled'
                                                                ? 'Xoá bỏ đăng ký'
                                                                : '-'}
                                                        </td>
                                                        <td style={{ fontWeight: 'normal', textAlign: 'center' }}>
                                                            {'-'}
                                                        </td>
                                                        <td style={{ fontWeight: 'normal', textAlign: 'center' }}>
                                                            {registration.total}
                                                        </td>
                                                        <td style={{ fontWeight: 'normal', textAlign: 'center' }}>
                                                            {registration.plusDeductions}
                                                        </td>
                                                        <td style={{ fontWeight: 'normal', textAlign: 'center' }}>
                                                            {registration.minusDeductions}
                                                        </td>
                                                        <td style={{ fontWeight: 'normal', textAlign: 'center' }}>
                                                            {registration.total}
                                                        </td>
                                                        <td
                                                            className="text-white"
                                                            style={{ fontWeight: 'normal', textAlign: 'center' }}
                                                        >
                                                            {registration.tuitionStatus === 'paid' ? (
                                                                <i className="pi pi-check p-2 border-circle bg-green-300"></i>
                                                            ) : (
                                                                <i className="pi pi-times p-2 border-circle bg-red-300"></i>
                                                            )}
                                                        </td>

                                                        <td
                                                            className="text-white"
                                                            style={{ fontWeight: 'normal', textAlign: 'center' }}
                                                        >
                                                            {!!registration.tuitionInvestigateStatus ? (
                                                                <i className="pi pi-check p-2 border-circle bg-green-300"></i>
                                                            ) : (
                                                                <i className="pi pi-times p-2 border-circle bg-red-300"></i>
                                                            )}
                                                        </td>
                                                    </tr>
                                                )}
                                                <tr className="text-center font-bold">
                                                    <td style={{ height: '30px' }} rowSpan="1"></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>{credits}</td>
                                                    <td>{initialFee}</td>
                                                    <td></td>
                                                    <td>{discountFee}</td>
                                                    <td>{initialFee}</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>{totalFee}</td>
                                                    <td>{plusDeductions}</td>
                                                    <td>{minusDeductions}</td>
                                                    <td>{totalFee}</td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </React.Fragment>
                                        );
                                    }),
                            );
                        }
                    }

                    return holderHtml;
                }
            }
        } else {
            return;
        }
    }, [registrationList, selectedTerm, selectCollapse]);

    return (
        <div className="w-full">
            <div className="mb-3">
                <div
                    style={{
                        textAlign: 'center',
                        marginTop: '15px',
                    }}
                >
                    <h1 style={{ color: '#006994' }}>TRA CỨU CÔNG NỢ</h1>
                </div>
                <div className="flex align-items-center w-full justify-content-center">
                    <h3 className="text-primary mr-2">Học kỳ</h3>
                    <div>
                        <Dropdown
                            value={selectedTerm || 'tatca'}
                            onChange={(e) => {
                                setSelectedTerm(e.target.value);
                            }}
                            options={
                                !!termOptions && termOptions?.length > 0
                                    ? [{ id: 'tatca', name: 'Tất cả' }, ...termOptions]
                                    : [{ id: 'tatca', name: 'Tất cả' }]
                            }
                            optionLabel="name"
                            optionValue="id"
                            placeholder="Hãy chọn học kỳ để tra cứu công nợ"
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
            <hr />
            <div className="w-full overflow-x-auto">
                <table border="1" className="w-max">
                    <thead>
                        <tr style={{ backgroundColor: 'rgba(243, 247, 249, 0.27)', color: 'rgb(29, 161, 242)' }}>
                            <th style={{ width: '2rem', height: '70px' }} rowSpan="1"></th>
                            <th style={{ width: '10rem', height: '70px' }} rowSpan="1">
                                Học kỳ
                            </th>
                            <th style={{ width: '8rem', height: '70px' }} rowSpan="1">
                                Mã LHP
                            </th>
                            <th style={{ width: '10rem', height: '70px' }} rowSpan="1">
                                Nội dung
                            </th>
                            <th style={{ width: '6rem', height: '70px' }} rowSpan="1">
                                Số TC
                            </th>
                            <th style={{ width: '6rem', height: '70px' }} rowSpan="1">
                                Mức phí ban đầu
                            </th>
                            <th style={{ width: '6rem', height: '70px' }} rowSpan="1">
                                % Miễn giảm
                            </th>
                            <th style={{ width: '6rem', height: '70px' }} rowSpan="1">
                                Số tiền miễn giảm
                            </th>
                            <th style={{ width: '6rem', height: '70px' }} rowSpan="1">
                                Mức nộp
                            </th>
                            <th style={{ width: '10rem', height: '70px' }} rowSpan="1">
                                Loại ĐK
                            </th>
                            <th style={{ width: '6rem', height: '70px' }} rowSpan="1">
                                Trạng thái ĐK
                            </th>
                            <th style={{ width: '6rem', height: '70px' }} rowSpan="1">
                                Ngày nộp
                            </th>
                            <th style={{ width: '6rem', height: '70px' }} rowSpan="1">
                                Số tiền nộp
                            </th>
                            <th style={{ width: '6rem', height: '70px' }} rowSpan="1">
                                Khấu trừ (+)
                            </th>
                            <th style={{ width: '6rem', height: '70px' }} rowSpan="1">
                                Trừ nợ (-)
                            </th>
                            <th style={{ width: '6rem', height: '70px' }} rowSpan="1">
                                Công nợ
                            </th>
                            <th style={{ width: '6rem', height: '70px' }} rowSpan="1">
                                Trạng Thái Đóng
                            </th>
                            <th style={{ width: '6rem', height: '70px' }} rowSpan="1">
                                Không truy cứu công nợ
                            </th>
                        </tr>
                    </thead>
                    {/* Render Thông tin công nợ theo kỳ (Selected Term)*/}
                    <tbody>
                        {renderRegistrations()}
                        {/* Dòng tổng kết cuối */}
                    </tbody>
                </table>
            </div>
            {/* <div style={{ marginTop: '20px', marginLeft: '10px' }}>
                    <button
                        style={{ width: '25px', height: '25px' }}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            style={{ width: '25px', height: '25px', marginLeft: '5px' }}
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        style={{ width: '25px', height: '25px', marginLeft: '5px' }}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div> */}
            <div className="flex justify-content-between col-12 text-lg font-semibold border-1 border-200 border-round-md mt-3 surface-100">
                <div style={{ display: 'flex' }}>
                    <p>Tổng nộp học phí: </p>
                    <p style={{ marginLeft: '5px', color: 'red' }}>
                        {totalAllFee?.totalFee
                            ? new Intl.NumberFormat('vn', {
                                  style: 'currency',
                                  currency: 'VND',
                              }).format(totalAllFee.totalFee)
                            : new Intl.NumberFormat('vn', {
                                  style: 'currency',
                                  currency: 'VND',
                              }).format(0)}
                    </p>
                </div>
                <div style={{ display: 'flex' }}>
                    <p>Tổng nộp khoản thu khác: </p>
                    <p style={{ marginLeft: '5px', color: 'red' }}>
                        {new Intl.NumberFormat('vn', {
                            style: 'currency',
                            currency: 'VND',
                        }).format(0)}
                    </p>
                </div>
                <div style={{ display: 'flex' }}>
                    <p>Tổng công nợ: </p>
                    <p style={{ marginLeft: '5px', color: 'red' }}>
                        {totalAllFee?.debt
                            ? new Intl.NumberFormat('vn', {
                                  style: 'currency',
                                  currency: 'VND',
                              }).format(totalAllFee.debt)
                            : new Intl.NumberFormat('vn', {
                                  style: 'currency',
                                  currency: 'VND',
                              }).format(0)}
                    </p>
                </div>
                <div style={{ display: 'flex' }}>
                    <p>Tổng công nợ thu khác: </p>
                    <p style={{ marginLeft: '5px', color: 'red' }}>
                        {' '}
                        {new Intl.NumberFormat('vn', {
                            style: 'currency',
                            currency: 'VND',
                        }).format(0)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Tracuucongno;
