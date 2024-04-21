/* eslint-disable react/jsx-pascal-case */
import styles from '~/pages/LecturerDashboard/Quanlydiemquatrinhhoctap/Quanlydiemquatrinhhoctap.module.scss';
import classNames from 'classnames/bind';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserId } from '~/components/authentication/AuthUtils';
import { getSectionClassInfo } from '~/api/section/SectionClassService';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import img from '../../../assets/images/point_calc.png';
import { InputText } from 'primereact/inputtext';
import { saveFinalResults } from '~/api/result/ResultService';
import { HTTP_STATUS_OK } from '~/utils/Constants';
import { showNotification } from '~/components/notification/NotificationService';
const cx = classNames.bind(styles);

const QueryKey = 'SectionClass-Info';
function Quanlydiemquatrinhhoctap() {
    const { id: idString } = useParams();
    const id = useMemo(() => {
        return !!idString ? parseInt(idString) : null;
    }, [idString]);

    const { data: sectionClassInfo } = useQuery([QueryKey, getUserId()], () => getSectionClassInfo(getUserId(), id), {
        enabled: !!getUserId() && !!id,
    });

    const [showAdditionalDiv, setShowAdditionalDiv] = useState(false);
    const [randomString, setRandomString] = useState(generateRandomString(4));
    const [isErrorVisible, setIsErrorVisible] = useState(false);
    const [isVerificationCodeMatched, setIsVerificationCodeMatched] = useState(true);
    const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(true);

    const [inputValues, setInputValues] = useState({
        verificationCode: '',
    });

    useEffect(() => {
        regenerateString();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //Random mã
    function regenerateString() {
        setRandomString(generateRandomString(4));
    }

    const handleSubmit = () => {
        // Xử lý khi người dùng nhấn nút "Nộp điểm QTHT"
        setShowAdditionalDiv((prevState) => !prevState);
        window.scrollTo(0, document.body.scrollHeight);
    };

    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomString = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }

        return randomString;
    }

    const handleInputChange = (event, field) => {
        const value = event.target.value;
        setInputValues((prevValues) => ({ ...prevValues, [field]: value }));
        setIsVerificationCodeMatched(value === randomString);
    };

    const checkAllFieldsFilled = useCallback(() => {
        const values = Object.values(inputValues);
        return values.every((value) => value.trim() !== '');
    }, [inputValues]);

    const handleOnSubmitFinalResult = useCallback(async () => {
        setIsAllFieldsFilled(checkAllFieldsFilled());

        // Kiểm tra xem mã nhập có đúng không
        const isVerificationCodeMatched = inputValues.verificationCode === randomString;
        setIsVerificationCodeMatched(isVerificationCodeMatched);

        // Hiển thị thông báo lỗi
        setIsErrorVisible(true);

        // Nếu mã nhập đúng và tất cả các trường đều được điền, thực hiện chuyển hướng
        if (sectionClassInfo?.id && getUserId()) {
            if (isVerificationCodeMatched && checkAllFieldsFilled()) {
                const response = await saveFinalResults(getUserId(), id);

                if (response === HTTP_STATUS_OK) {
                    showNotification(
                        'success',
                        'Thành công',
                        'Lưu kết quả học tập cuối cùng của lớp học phần thành công !!',
                    );

                    setShowAdditionalDiv(false);
                }
            }
        }

        // Tự động ẩn thông báo sau 3 giây
        setTimeout(() => {
            setIsErrorVisible(false);
        }, 1500);
    }, [checkAllFieldsFilled, id, inputValues.verificationCode, randomString, sectionClassInfo?.id]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div style={{ height: '10px', width: '100%' }}></div>
                <div className={cx('header')}>
                    <div style={{ marginLeft: '15px' }}>
                        <h2>QUẢN LÝ ĐIỂM QUÁ TRÌNH HỌC TẬP</h2>
                    </div>
                </div>
                <hr />
                <div className="col-12">
                    <div className="p-inputgroup flex-1 flex justify-content-end">
                        <Button
                            label="Nhập điểm QTHT"
                            icon="pi pi-send"
                            onClick={() => window.location.assign(`/nhapdiemquatrinhhoctap/${id}`)}
                        />
                        <Button
                            label="Nộp điểm QTHT"
                            icon="pi pi-calculator"
                            disabled={(sectionClassInfo && !sectionClassInfo?.inputResultEnable) || true}
                            onClick={handleSubmit}
                        />
                        {/* <Button label="In bảng điểm QTHT" icon="pi pi-print" /> */}
                        <Button label="Quay lại" icon="pi pi-arrow-right" />
                    </div>
                </div>
                <div style={{ marginLeft: '15px' }}>
                    <div className="align-items-center" style={{ display: 'flex' }}>
                        <p className="col-4">Lớp học phần:</p>
                        <div className="col-8">
                            <p
                                style={{
                                    fontWeight: 'bold',
                                }}
                            >
                                {sectionClassInfo?.name}
                            </p>
                        </div>
                    </div>
                    <div className="align-items-center" style={{ display: 'flex' }}>
                        <p className="col-4">Giảng viên:</p>
                        <div className="col-8">
                            <p
                                style={{
                                    fontWeight: 'bold',
                                }}
                            >
                                {sectionClassInfo?.lecturerName}
                            </p>
                        </div>
                    </div>
                    <div className="align-items-center" style={{ display: 'flex' }}>
                        <p className="col-4">Công thức tính điểm QTHT:</p>
                        <div className="col-8">
                            <Image src={img} alt="Image" width="600" preview />
                        </div>
                    </div>
                    <hr />
                    <p style={{ fontWeight: 'bold', marginTop: '15px' }}>Danh sách sinh viên</p>
                    <table style={{ marginTop: '10px' }} border="1" className="w-full">
                        <thead>
                            <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                                <th style={{ height: '150px' }} rowSpan="3">
                                    STT
                                </th>
                                <th rowSpan="3">Mã sinh viên</th>
                                <th rowSpan="3">Họ và tên</th>
                                <th colSpan="3">Giữa kì</th>
                                <th colSpan="5" style={{ height: '50px' }}>
                                    Thường kì
                                </th>
                                <th colSpan="2">Thực hành</th>
                                <th rowSpan="3">Cuối kỳ</th>
                                <th rowSpan="3">Điểm tổng kết</th>
                            </tr>

                            <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                                <th style={{ width: '40px' }} rowSpan="2">
                                    1
                                </th>
                                <th style={{ width: '40px' }} rowSpan="2">
                                    2
                                </th>
                                <th style={{ width: '40px' }} rowSpan="2">
                                    3
                                </th>
                                <th colSpan="5">LT Hệ số 1</th>
                                <th style={{ width: '40px' }} rowSpan="2">
                                    1
                                </th>
                                <th style={{ width: '40px' }} rowSpan="2">
                                    2
                                </th>
                            </tr>
                            <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                                <th style={{ width: '40px', height: '50px' }} rowSpan="1">
                                    1
                                </th>
                                <th style={{ width: '40px', height: '50px' }} rowSpan="1">
                                    2
                                </th>
                                <th style={{ width: '40px', height: '50px' }} rowSpan="1">
                                    3
                                </th>
                                <th style={{ width: '40px', height: '50px' }} rowSpan="1">
                                    4
                                </th>
                                <th style={{ width: '40px', height: '50px' }} rowSpan="1">
                                    5
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sectionClassInfo?.students &&
                                sectionClassInfo.students?.length > 0 &&
                                sectionClassInfo.students.map((student, index) => (
                                    <tr key={index}>
                                        <th style={{ height: '35px', width: '50px' }}>{index + 1}</th>
                                        <th style={{ width: '100px' }}>{student.studentCode}</th>
                                        <th style={{ width: '300px' }}>{student.studentName}</th>
                                        <th style={{ width: '50px' }}>{student.midtermPoint1}</th>
                                        <th style={{ width: '50px' }}>{student.midtermPoint2}</th>
                                        <th style={{ width: '50px' }}>{student.midtermPoint3}</th>
                                        <th style={{ width: '40px' }}>{student.regularPoint1}</th>
                                        <th style={{ width: '40px' }}>{student.regularPoint2}</th>
                                        <th style={{ width: '40px' }}>{student.regularPoint3}</th>
                                        <th style={{ width: '40px' }}>{student.regularPoint4}</th>
                                        <th style={{ width: '40px' }}>{student.regularPoint5}</th>
                                        <th style={{ width: '40px' }}>{student.practicePoint1}</th>
                                        <th style={{ width: '40px' }}>{student.practicePoint2}</th>
                                        <th style={{ width: '40px' }}>{student.finalPoint}</th>
                                        <th style={{ width: '40px' }}>
                                            {student?.totalPoint ? Math.round(student?.totalPoint * 100) / 100 : '_'}
                                        </th>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <hr />
                    {showAdditionalDiv && (
                        <div>
                            <div>
                                <h2
                                    className="text-primary"
                                    style={{
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Nộp điểm quá trình học tập
                                </h2>
                            </div>
                            <p style={{ fontWeight: 'bold', marginTop: '20px' }}>Lưu ý:</p>
                            <div style={{ marginTop: '10px' }}>
                                <p>
                                    - Thầy/ cô vui lòng kiểm tra kỹ bảng điểm và chắc chắn đã hoàn tất việc nhập điểm
                                    trước khi tiến hành nộp điểm;
                                </p>
                                <p>
                                    - Sau khi nộp điểm, chức năng xử lý điểm quá trình học tập đối với lớp học phần sẽ
                                    bị khóa
                                </p>
                                <p>
                                    - Thầy/ cô sẽ không thể thay đổi chính sách tính điểm và các cột điểm sau khi nộp
                                    điểm;
                                </p>
                            </div>
                            <div style={{ marginTop: '10px', display: 'flex' }}>
                                <p className="mr-2" style={{ fontWeight: 'bold' }}>
                                    Mã xác nhận:
                                </p>
                                <div style={{ justifyContent: 'space-between' }}>
                                    <div className="flex align-items-center mb-3">
                                        <InputText
                                            id="username"
                                            placeholder="Nhập mã"
                                            className=" w-full mr-2"
                                            value={inputValues.verificationCode}
                                            onChange={(e) => handleInputChange(e, 'verificationCode')}
                                        />
                                        <div>
                                            <Button
                                                icon="pi pi-replay"
                                                onClick={() => {
                                                    regenerateString();
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="surface-100 py-1 text-center mb-3">
                                        <h2
                                            className="text-primary"
                                            style={{
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {randomString}
                                        </h2>
                                    </div>
                                    <div className="w-full">
                                        <Button
                                            className="w-full"
                                            icon="pi pi-check"
                                            style={{
                                                backgroundColor: '#00BFFF',
                                                color: 'white',
                                            }}
                                            label="Nhập điểm quá trình học tập"
                                            onClick={handleOnSubmitFinalResult}
                                        />
                                        {!isAllFieldsFilled && isErrorVisible && !isVerificationCodeMatched && (
                                            <p style={{ color: 'red', marginTop: '10px' }}>
                                                Vui lòng điền đầy đủ thông tin!
                                            </p>
                                        )}

                                        {!isVerificationCodeMatched && isErrorVisible && isAllFieldsFilled && (
                                            <p style={{ color: 'red', marginTop: '10px' }}>Mã xác minh không đúng!</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {console.log(sectionClassInfo)}
                </div>
            </div>
        </div>
    );
}

export default Quanlydiemquatrinhhoctap;
