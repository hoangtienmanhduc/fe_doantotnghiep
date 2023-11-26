/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styles from './Tracuucongno.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';

const cx = classNames.bind(styles);

const options = [
    { value: 'option1', label: 'Tất cả' },
    { value: 'option2', label: 'HK2 (2023-2024)' },
    { value: 'option3', label: 'HK1 (2023-2024)' },
    // Thêm các option khác nếu cần
];

function Tracuucongno() {
    const [semesterVisibility, setSemesterVisibility] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedSemesterData, setSelectedSemesterData] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(true);
    const itemsPerPage = 6; // Number of items to display per page

    //Lọc học kì
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);

        // Nếu là 'Tất cả', hiển thị tất cả dữ liệu
        if (selectedOption.value === 'option1') {
            const allVisibility = {};
            data.forEach((semester) => {
                allVisibility[semester.semester] = true;
            });
            setSemesterVisibility(allVisibility);
            setIsAllSelected(true);
            return;
        }

        setIsAllSelected(false);

        // Nếu không phải 'Tất cả', tiến hành lọc và hiển thị dữ liệu
        const selectedSemesterLabel = selectedOption.label;
        const filteredData = data.filter((semesterData) => semesterData.items[0].Đợt === selectedSemesterLabel);

        const updatedVisibility = {};
        filteredData.forEach((semester) => {
            updatedVisibility[semester.semester] = true;
        });
        setSemesterVisibility(updatedVisibility);

        setSelectedSemesterData(filteredData);
    };

    const toggleDataVisibility = (semester) => {
        setSemesterVisibility((prevVisibility) => ({
            ...prevVisibility,
            [semester]: !prevVisibility[semester],
        }));
    };

    const data = [
        {
            semester: '2023_HK2 (2023-2024)',
            items: [
                {
                    STT: 1,
                    Đợt: 'HK2 (2023-2024)',
                    Mã: '4203001549',
                    'Mã LHP': '420300154901',
                    'Nội dung': 'Kiến trúc và Thiết kế phần mềm',
                    'Số TC': 2,
                    'Mức phí ban đầu': '3,010,000',
                    '% Miễn giảm': '',
                    'Số tiền miễn giảm': '0',
                    'Mức nộp': '3,010,000',
                    'Trạng thái ĐK': 'Đăng ký học lại',
                    'Ngày nộp': '31/07/2023',
                    'Số tiền nộp': '3,010,000',
                    'Khấu trừ (+)': '0',
                    'Trừ nợ (-)': '0',
                    'Công nợ': '0',
                    'Trạng Thái': '',
                    'Không truy cứu công nợ': '',
                },
                {
                    STT: 2,
                    Đợt: 'HK2 (2023-2024)',
                    Mã: '4203001550',
                    'Mã LHP': '420300155001',
                    'Nội dung': 'Lập trình web',
                    'Số TC': 3,
                    'Mức phí ban đầu': '2,500,000',
                    '% Miễn giảm': '',
                    'Số tiền miễn giảm': '0',
                    'Mức nộp': '2,500,000',
                    'Trạng thái ĐK': 'Đăng ký học lại',
                    'Ngày nộp': '30/07/2023',
                    'Số tiền nộp': '2,500,000',
                    'Khấu trừ (+)': '0',
                    'Trừ nợ (-)': '0',
                    'Công nợ': '0',
                    'Trạng Thái': '',
                    'Không truy cứu công nợ': '',
                },
            ],
        },
        {
            semester: '2023_HK1 (2023-2024)',
            items: [
                {
                    STT: 1,
                    Đợt: 'HK1 (2023-2024)',
                    Mã: '4203001549',
                    'Mã LHP': '420300154901',
                    'Nội dung': 'Kiến trúc và Thiết kế phần mềm',
                    'Số TC': 4,
                    'Mức phí ban đầu': '3,010,000',
                    '% Miễn giảm': '',
                    'Số tiền miễn giảm': '0',
                    'Mức nộp': '3,010,000',
                    'Trạng thái ĐK': 'Đăng ký học lại',
                    'Ngày nộp': '31/07/2023',
                    'Số tiền nộp': '3,010,000',
                    'Khấu trừ (+)': '0',
                    'Trừ nợ (-)': '0',
                    'Công nợ': '0',
                    'Trạng Thái': '',
                    'Không truy cứu công nợ': '',
                },
                {
                    STT: 2,
                    Đợt: 'HK1 (2023-2024)',
                    Mã: '4203001550',
                    'Mã LHP': '420300155001',
                    'Nội dung': 'Lập trình web',
                    'Số TC': 3,
                    'Mức phí ban đầu': '2,500,000',
                    '% Miễn giảm': '',
                    'Số tiền miễn giảm': '0',
                    'Mức nộp': '2,500,000',
                    'Trạng thái ĐK': 'Đăng ký học lại',
                    'Ngày nộp': '30/07/2023',
                    'Số tiền nộp': '2,500,000',
                    'Khấu trừ (+)': '0',
                    'Trừ nợ (-)': '0',
                    'Công nợ': '0',
                    'Trạng Thái': '',
                    'Không truy cứu công nợ': '',
                },
            ],
        },
        // Add more semesters and data as needed
    ];

    useEffect(() => {
        const initialVisibility = {};
        data.forEach((semester) => {
            initialVisibility[semester.semester] = true;
        });
        setSemesterVisibility(initialVisibility);
    }, []);

    //Phân trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    //tính tiền
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div style={{ height: '1px', width: '100%' }}></div>
                <div
                    style={{
                        height: '35px',
                        width: '99%',
                        marginTop: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        textAlign: 'center',
                        alignItems: 'center',
                        marginLeft: '12px',
                    }}
                >
                    <h2>Thanh toán trực tuyến</h2>
                    <div style={{ display: 'flex' }}>
                        <p style={{ marginRight: '15px', marginTop: '5px', fontSize: '15px' }}>Học kỳ</p>
                        <div style={{ width: '150px', height: '20px' }}>
                            <Select
                                defaultValue={selectedOption} // Sử dụng defaultValue để đặt giá trị mặc định
                                onChange={handleChange}
                                options={options}
                                isSearchable={true}
                                placeholder="Chọn một option..."
                                maxMenuHeight={250}
                            />
                        </div>
                    </div>
                </div>
                <p style={{ textAlign: 'center' }}>
                    ______________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
                </p>
                <div
                    style={{
                        marginLeft: '10px',
                        width: '100%',
                        marginTop: '10px',
                    }}
                >
                    <table border="1" className={cx('table table-bordered table-striped')} width={1980}>
                        <tr style={{ backgroundColor: 'rgba(243, 247, 249, 0.27)', color: 'rgb(29, 161, 242)' }}>
                            <th style={{ width: '25px', height: '70px' }} rowspan="1"></th>
                            <th>STT</th>
                            <th rowspan="1">Đợt</th>
                            <th rowspan="1">Mã</th>
                            <th rowspan="1">Mã LHP</th>
                            <th rowspan="1">Nội dung</th>
                            <th rowspan="1">Số TC</th>
                            <th rowspan="1">Mức phí ban đầu</th>
                            <th rowspan="1">% Miễn giảm</th>
                            <th rowspan="1">Số tiền miễn giảm</th>
                            <th rowspan="1">Mức nộp</th>
                            <th rowspan="1">Trạng thái ĐK</th>
                            <th rowspan="1">Ngày nộp</th>
                            <th rowspan="1">Số tiền nộp</th>
                            <th rowspan="1">Khấu trừ (+)</th>
                            <th rowspan="1">Trừ nợ (-)</th>
                            <th rowspan="1">Công nợ</th>
                            <th rowspan="1">Trạng Thái</th>
                            <th rowspan="1">Không truy cứu công nợ</th>
                        </tr>
                        {currentItems.map((semester, index) => (
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
                        ))}
                        <tr style={{ color: 'red', backgroundColor: 'rgb(255, 255, 206)' }}>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>
                                {isAllSelected
                                    ? data.reduce((acc, semester) => {
                                          return (
                                              acc + semester.items.reduce((acc, item) => acc + (item['Số TC'] || 0), 0)
                                          );
                                      }, 0)
                                    : selectedSemesterData.reduce((acc, semester) => {
                                          return (
                                              acc + semester.items.reduce((acc, item) => acc + (item['Số TC'] || 0), 0)
                                          );
                                      }, 0)}
                            </th>
                            <th>
                                {isAllSelected
                                    ? data
                                          .reduce((acc, semester) => {
                                              return (
                                                  acc +
                                                  semester.items.reduce(
                                                      (acc, item) =>
                                                          acc + parseFloat(item['Mức phí ban đầu'].replace(/,/g, '')) ||
                                                          0,
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
                                                          acc + parseFloat(item['Mức phí ban đầu'].replace(/,/g, '')) ||
                                                          0,
                                                      0,
                                                  )
                                              );
                                          }, 0)
                                          .toLocaleString()}
                            </th>
                            <th></th>
                            <th>0</th>
                            <th>
                                {isAllSelected
                                    ? data
                                          .reduce((acc, semester) => {
                                              return (
                                                  acc +
                                                  semester.items.reduce(
                                                      (acc, item) =>
                                                          acc + parseFloat(item['Mức nộp'].replace(/,/g, '')) || 0,
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
                                                          acc + parseFloat(item['Mức nộp'].replace(/,/g, '')) || 0,
                                                      0,
                                                  )
                                              );
                                          }, 0)
                                          .toLocaleString()}
                            </th>
                            <th></th>
                            <th>
                                {isAllSelected
                                    ? data
                                          .reduce((acc, semester) => {
                                              return (
                                                  acc +
                                                  semester.items.reduce(
                                                      (acc, item) =>
                                                          acc +
                                                              parseFloat(item['Số tiền miễn giảm'].replace(/,/g, '')) ||
                                                          0,
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
                                                          acc +
                                                              parseFloat(item['Số tiền miễn giảm'].replace(/,/g, '')) ||
                                                          0,
                                                      0,
                                                  )
                                              );
                                          }, 0)
                                          .toLocaleString()}
                            </th>
                            <th>
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
                            </th>
                            <th>
                                {isAllSelected
                                    ? data.reduce((acc, semester) => {
                                          return (
                                              acc +
                                              semester.items.reduce(
                                                  (acc, item) =>
                                                      acc + parseFloat(item['Khấu trừ (+)'].replace(/,/g, '')) || 0,
                                                  0,
                                              )
                                          );
                                      }, 0)
                                    : selectedSemesterData
                                          .reduce((acc, semester) => {
                                              return (
                                                  acc +
                                                  semester.items.reduce(
                                                      (acc, item) =>
                                                          acc + parseFloat(item['Khấu trừ (+)'].replace(/,/g, '')) || 0,
                                                      0,
                                                  )
                                              );
                                          }, 0)
                                          .toLocaleString()}
                            </th>
                            <th>
                                {isAllSelected
                                    ? data.reduce((acc, semester) => {
                                          return (
                                              acc +
                                              semester.items.reduce(
                                                  (acc, item) =>
                                                      acc + parseFloat(item['Trừ nợ (-)'].replace(/,/g, '')) || 0,
                                                  0,
                                              )
                                          );
                                      }, 0)
                                    : selectedSemesterData
                                          .reduce((acc, semester) => {
                                              return (
                                                  acc +
                                                  semester.items.reduce(
                                                      (acc, item) =>
                                                          acc + parseFloat(item['Trừ nợ (-)'].replace(/,/g, '')) || 0,
                                                      0,
                                                  )
                                              );
                                          }, 0)
                                          .toLocaleString()}
                            </th>
                            <th>
                                {isAllSelected
                                    ? data.reduce((acc, semester) => {
                                          return (
                                              acc +
                                              semester.items.reduce(
                                                  (acc, item) =>
                                                      acc + parseFloat(item['Công nợ'].replace(/,/g, '')) || 0,
                                                  0,
                                              )
                                          );
                                      }, 0)
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
                            </th>
                            <th></th>
                            <th></th>
                        </tr>
                    </table>
                </div>
                <div style={{ marginTop: '20px', marginLeft: '10px' }}>
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
                </div>
                <div
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
                </div>
                <div style={{ height: '15px', width: '100%' }}></div>
            </div>
        </div>
    );
}

export default Tracuucongno;
