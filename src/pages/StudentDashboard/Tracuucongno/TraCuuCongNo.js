/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styles from './Tracuucongno.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import { useQuery } from '@tanstack/react-query';
import { getRefId, getUserId } from '~/components/authentication/AuthUtils';
import { getListTermInfo } from '~/api/term/TermService';
import { Dropdown } from 'primereact/dropdown';
import { getListStudentSectionClassInfo } from '~/api/section/SectionClassService';
import { Divider } from 'primereact/divider';

const QueryKeyTerm = 'Term-Options';
const QueryKeySectionClassStudent = 'Section-Class-Student-Register';

const Tracuucongno = () => {
    const { data: termOptions } = useQuery([QueryKeyTerm, getUserId()], () => getListTermInfo(getUserId()), {
        enabled: !!getUserId(),
    });

    const [selectedTerm, setSelectedTerm] = useState(null);

    const handleOnChange = () => {};

    // const data = [
    //     {
    //         semester: '2023_HK2 (2023-2024)',
    //         items: [
    //             {
    //                 Đợt: 'HK2 (2023-2024)',
    //                 Mã: '4203001549',
    //                 'Mã LHP': '420300154901',
    //                 'Nội dung': 'Kiến trúc và Thiết kế phần mềm',
    //                 'Số TC': 2,
    //                 'Mức phí ban đầu': '3,010,000',
    //                 '% Miễn giảm': '',
    //                 'Số tiền miễn giảm': '0',
    //                 'Mức nộp': '3,010,000',
    //                 'Trạng thái ĐK': 'Đăng ký học lại',
    //                 'Ngày nộp': '31/07/2023',
    //                 'Số tiền nộp': '3,010,000',
    //                 'Khấu trừ (+)': '0',
    //                 'Trừ nợ (-)': '0',
    //                 'Công nợ': '0',
    //                 'Trạng Thái': '',
    //                 'Không truy cứu công nợ': '',
    //             },
    //             {
    //                 Đợt: 'HK2 (2023-2024)',
    //                 Mã: '4203001550',
    //                 'Mã LHP': '420300155001',
    //                 'Nội dung': 'Lập trình web',
    //                 'Số TC': 3,
    //                 'Mức phí ban đầu': '2,500,000',
    //                 '% Miễn giảm': '',
    //                 'Số tiền miễn giảm': '0',
    //                 'Mức nộp': '2,500,000',
    //                 'Trạng thái ĐK': 'Đăng ký học lại',
    //                 'Ngày nộp': '30/07/2023',
    //                 'Số tiền nộp': '2,500,000',
    //                 'Khấu trừ (+)': '0',
    //                 'Trừ nợ (-)': '0',
    //                 'Công nợ': '0',
    //                 'Trạng Thái': '',
    //                 'Không truy cứu công nợ': '',
    //             },
    //         ],
    //     },
    //     {
    //         semester: '2023_HK1 (2023-2024)',
    //         items: [
    //             {
    //                 Đợt: 'HK1 (2023-2024)',
    //                 Mã: '4203001549',
    //                 'Mã LHP': '420300154901',
    //                 'Nội dung': 'Kiến trúc và Thiết kế phần mềm',
    //                 'Số TC': 4,
    //                 'Mức phí ban đầu': '3,010,000',
    //                 '% Miễn giảm': '',
    //                 'Số tiền miễn giảm': '0',
    //                 'Mức nộp': '3,010,000',
    //                 'Trạng thái ĐK': 'Đăng ký học lại',
    //                 'Ngày nộp': '31/07/2023',
    //                 'Số tiền nộp': '3,010,000',
    //                 'Khấu trừ (+)': '0',
    //                 'Trừ nợ (-)': '0',
    //                 'Công nợ': '0',
    //                 'Trạng Thái': '',
    //                 'Không truy cứu công nợ': '',
    //             },
    //             {
    //                 Đợt: 'HK1 (2023-2024)',
    //                 Mã: '4203001550',
    //                 'Mã LHP': '420300155001',
    //                 'Nội dung': 'Lập trình web',
    //                 'Số TC': 3,
    //                 'Mức phí ban đầu': '2,500,000',
    //                 '% Miễn giảm': '',
    //                 'Số tiền miễn giảm': '0',
    //                 'Mức nộp': '2,500,000',
    //                 'Trạng thái ĐK': 'Đăng ký học lại',
    //                 'Ngày nộp': '30/07/2023',
    //                 'Số tiền nộp': '2,500,000',
    //                 'Khấu trừ (+)': '0',
    //                 'Trừ nợ (-)': '0',
    //                 'Công nợ': '0',
    //                 'Trạng Thái': '',
    //                 'Không truy cứu công nợ': '',
    //             },
    //         ],
    //     },
    //     // Add more semesters and data as needed
    // ];

    //tính tiền
    return (
        <div className="w-full">
            <div className="w-full">
                <div>
                    <h1 className="text-primary">Tra cứu công nợ</h1>
                    <div className="flex align-items-center">
                        <h3 className="text-primary mr-2">Học kỳ</h3>
                        <div>
                            <Dropdown
                                value={selectedTerm || 'tatca'}
                                onChange={(e) => setSelectedTerm(e.value)}
                                options={[{ id: 'tatca', name: 'Tất cả' }, ...termOptions]}
                                optionLabel="name"
                                optionValue="id"
                                placeholder="Hãy chọn học kỳ để tra cứu công nợ"
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <table border="1" className="w-full overflow-x-auto">
                        <thead>
                            <tr style={{ backgroundColor: 'rgba(243, 247, 249, 0.27)', color: 'rgb(29, 161, 242)' }}>
                                <th style={{ width: '25px', height: '70px' }} rowSpan="1">
                                    Đợt
                                </th>
                                <th rowSpan="1">Mã</th>
                                <th rowSpan="1">Mã LHP</th>
                                <th rowSpan="1">Nội dung</th>
                                <th rowSpan="1">Số TC</th>
                                <th rowSpan="1">Mức phí ban đầu</th>
                                <th rowSpan="1">% Miễn giảm</th>
                                <th rowSpan="1">Số tiền miễn giảm</th>
                                <th rowSpan="1">Mức nộp</th>
                                <th rowSpan="1">Trạng thái ĐK</th>
                                <th rowSpan="1">Ngày nộp</th>
                                <th rowSpan="1">Số tiền nộp</th>
                                <th rowSpan="1">Khấu trừ (+)</th>
                                <th rowSpan="1">Trừ nợ (-)</th>
                                <th rowSpan="1">Công nợ</th>
                                <th rowSpan="1">Trạng Thái</th>
                                <th rowSpan="1">Không truy cứu công nợ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Render Thông tin công nợ theo kỳ (Selected Term)*/}

                            {/* {studentSetionList &&
                                studentSetionList?.length > 0 &&
                                studentSetionList?.map((item) => {
                                    return (
                                        <tr>
                                            <th style={{ fontWeight: 'normal' }}>{item.STT}</th>
                                            <th style={{ fontWeight: 'normal' }}>{item.Đợt}</th>
                                            <th style={{ fontWeight: 'normal' }}>{item.Mã}</th>
                                            <th style={{ fontWeight: 'normal' }}>{item['Mã LHP']}</th>
                                            <th style={{ fontWeight: 'normal' }}>{item['Nội dung']}</th>
                                            <th style={{ fontWeight: 'normal' }}>{item['Số TC']}</th>
                                            <th style={{ fontWeight: 'normal' }}>{item['Mức phí ban đầu']}</th>
                                            <th style={{ fontWeight: 'normal' }}>{item['% Miễn giảm']}</th>
                                            <th style={{ fontWeight: 'normal' }}>{item['Số tiền miễn giảm']}</th>
                                            <th style={{ fontWeight: 'normal' }}>{item['Mức nộp']}</th>
                                            <th style={{ fontWeight: 'normal' }}>{item['Trạng thái ĐK']}</th>
                                            <th style={{ fontWeight: 'normal' }}>{item['Ngày nộp']}</th>
                                            <th style={{ fontWeight: 'normal' }}>{item['Số tiền nộp']}</th>
                                            <th style={{ fontWeight: 'normal' }}>{item['Khấu trừ (+)']}</th>
                                            <th style={{ fontWeight: 'normal' }}>{item['Trừ nợ (-)']}</th>
                                            <th style={{ fontWeight: 'normal' }}>{item['Công nợ']}</th>
                                            <th style={{ fontWeight: 'normal' }}>{item['Trạng Thái']}</th>
                                            <th style={{ fontWeight: 'normal' }}>{item['Không truy cứu công nợ']}</th>
                                        </tr>
                                    );
                                })} */}

                            {/* {currentItems.map((semester, index) => (
                            <React.Fragment key={index}>
                                <tr
                                    style={{ backgroundColor: 'rgba(215, 237, 247, 0.15)', cursor: 'pointer' }}
                                    onClick={() => toggleDataVisibility(semester.semester)}
                                >
                                    <td style={{ fontWeight: 'bold', height: '30px' }} colSpan="19">
                                        - Đợt: {semester.semester}
                                    </td>
                                </tr>
                                {semesterVisibility[semester.semester] && (
                                    <>
                                        {semester.items.map((item, itemIndex) => (
                                            <tr key={itemIndex}>
                                                <th></th>
                                                <th style={{ fontWeight: 'normal' }}>{item.STT}</th>
                                                <th style={{ fontWeight: 'normal' }}>{item.Đợt}</th>
                                                <th style={{ fontWeight: 'normal' }}>{item.Mã}</th>
                                                <th style={{ fontWeight: 'normal' }}>{item['Mã LHP']}</th>
                                                <th style={{ fontWeight: 'normal' }}>{item['Nội dung']}</th>
                                                <th style={{ fontWeight: 'normal' }}>{item['Số TC']}</th>
                                                <th style={{ fontWeight: 'normal' }}>{item['Mức phí ban đầu']}</th>
                                                <th style={{ fontWeight: 'normal' }}>{item['% Miễn giảm']}</th>
                                                <th style={{ fontWeight: 'normal' }}>{item['Số tiền miễn giảm']}</th>
                                                <th style={{ fontWeight: 'normal' }}>{item['Mức nộp']}</th>
                                                <th style={{ fontWeight: 'normal' }}>{item['Trạng thái ĐK']}</th>
                                                <th style={{ fontWeight: 'normal' }}>{item['Ngày nộp']}</th>
                                                <th style={{ fontWeight: 'normal' }}>{item['Số tiền nộp']}</th>
                                                <th style={{ fontWeight: 'normal' }}>{item['Khấu trừ (+)']}</th>
                                                <th style={{ fontWeight: 'normal' }}>{item['Trừ nợ (-)']}</th>
                                                <th style={{ fontWeight: 'normal' }}>{item['Công nợ']}</th>
                                                <th style={{ fontWeight: 'normal' }}>{item['Trạng Thái']}</th>
                                                <th style={{ fontWeight: 'normal' }}>
                                                    {item['Không truy cứu công nợ']}
                                                </th>
                                            </tr>
                                        ))}
                                        <tr>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th>
                                                {semester.items.reduce((acc, item) => acc + (item['Số TC'] || 0), 0)}
                                            </th>
                                            <th>
                                                {semester.items
                                                    .reduce(
                                                        (acc, item) =>
                                                            acc +
                                                                parseFloat(item['Mức phí ban đầu'].replace(/,/g, '')) ||
                                                            0,
                                                        0,
                                                    )
                                                    .toLocaleString()}
                                            </th>
                                            <th></th>
                                            <th>
                                                {semester.items
                                                    .reduce(
                                                        (acc, item) =>
                                                            acc +
                                                                parseFloat(
                                                                    item['Số tiền miễn giảm'].replace(/,/g, ''),
                                                                ) || 0,
                                                        0,
                                                    )
                                                    .toLocaleString()}
                                            </th>
                                            <th>
                                                {semester.items
                                                    .reduce(
                                                        (acc, item) =>
                                                            acc + parseFloat(item['Mức nộp'].replace(/,/g, '')) || 0,
                                                        0,
                                                    )
                                                    .toLocaleString()}
                                            </th>
                                            <th></th>
                                            <th></th>
                                            <th>
                                                {semester.items
                                                    .reduce(
                                                        (acc, item) =>
                                                            acc + parseFloat(item['Số tiền nộp'].replace(/,/g, '')) ||
                                                            0,
                                                        0,
                                                    )
                                                    .toLocaleString()}
                                            </th>
                                            <th>
                                                {semester.items
                                                    .reduce(
                                                        (acc, item) =>
                                                            acc + parseFloat(item['Khấu trừ (+)'].replace(/,/g, '')) ||
                                                            0,
                                                        0,
                                                    )
                                                    .toLocaleString()}
                                            </th>
                                            <th>
                                                {semester.items
                                                    .reduce(
                                                        (acc, item) =>
                                                            acc + parseFloat(item['Trừ nợ (-)'].replace(/,/g, '')) || 0,
                                                        0,
                                                    )
                                                    .toLocaleString()}
                                            </th>
                                            <th>
                                                {semester.items
                                                    .reduce(
                                                        (acc, item) =>
                                                            acc + parseFloat(item['Công nợ'].replace(/,/g, '')) || 0,
                                                        0,
                                                    )
                                                    .toLocaleString()}
                                            </th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </>
                                )}
                            </React.Fragment>
                        ))} */}

                            {/* Dòng tổng kết cuối */}
                            <tr style={{ color: 'red', backgroundColor: 'rgb(255, 255, 206)' }}>
                                <th style={{ width: '25px', height: '70px' }} rowSpan="1"></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
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
                {/* <div
                    style={{
                        width: '40%',
                        marginTop: '15px',
                        marginLeft: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontWeight: 'bold',
                        fontSize: '15px',
                    }}
                >
                    <div style={{ display: 'flex' }}>
                        <p>Tổng nộp học phí: </p>
                        <p style={{ marginLeft: '5px', color: 'red' }}>
                            {isAllSelected
                                ? data
                                      .reduce((acc, semester) => {
                                          return (
                                              acc +
                                              semester.items.reduce(
                                                  (acc, item) =>
                                                      acc + parseFloat(item['Số tiền nộp'].replace(/,/g, '')) || 0,
                                                  0,
                                              )
                                          );
                                      }, 0)
                                      .toLocaleString()
                                : selectedSemesterData
                                      .reduce((acc, semester) => {
                                          return (
                                              acc +
                                              semester.items.reduce(
                                                  (acc, item) =>
                                                      acc + parseFloat(item['Số tiền nộp'].replace(/,/g, '')) || 0,
                                                  0,
                                              )
                                          );
                                      }, 0)
                                      .toLocaleString()}
                        </p>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <p>Tổng công nợ: </p>
                        <p style={{ marginLeft: '5px', color: 'red' }}>
                            {isAllSelected
                                ? data
                                      .reduce((acc, semester) => {
                                          return (
                                              acc +
                                              semester.items.reduce(
                                                  (acc, item) =>
                                                      acc + parseFloat(item['Công nợ'].replace(/,/g, '')) || 0,
                                                  0,
                                              )
                                          );
                                      }, 0)
                                      .toLocaleString()
                                : selectedSemesterData
                                      .reduce((acc, semester) => {
                                          return (
                                              acc +
                                              semester.items.reduce(
                                                  (acc, item) =>
                                                      acc + parseFloat(item['Công nợ'].replace(/,/g, '')) || 0,
                                                  0,
                                              )
                                          );
                                      }, 0)
                                      .toLocaleString()}
                        </p>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Tracuucongno;
