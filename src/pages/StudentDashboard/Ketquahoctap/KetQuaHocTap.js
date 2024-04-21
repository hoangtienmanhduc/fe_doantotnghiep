import styles from './Ketquahoctap.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Ketquahoctap() {
    return (
        <div>
            <div>
                <h1>Kết quả học tập</h1>
                <hr />
            </div>
            <div>
                <table border="1" className="w-full">
                    <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                        <th style={{ height: '150px' }} rowSpan="3">
                            STT
                        </th>
                        <th rowSpan="3">Mã lớp học phần</th>
                        <th rowSpan="3">Tên môn học/học phần</th>
                        <th rowSpan="3">Số tín chỉ</th>
                        <th style={{ height: '50px' }} colspan="3">
                            Giữa kì
                        </th>
                        <th colspan="5">Điểm thường kỳ</th>
                        <th colspan="2">Thực hành</th>
                        <th rowSpan="3">Cuối kỳ</th>
                        <th rowSpan="3">Điểm tổng kết</th>
                        <th rowSpan="3">Thang điểm 4</th>
                        <th rowSpan="3">Điểm chữ</th>
                        <th rowSpan="3">Xếp loại</th>
                        <th style={{ width: '20px' }} rowSpan="3">
                            Đạt
                        </th>
                    </tr>
                    <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                        <th style={{ width: '50px' }} rowSpan="2">
                            1
                        </th>
                        <th style={{ width: '50px' }} rowSpan="2">
                            2
                        </th>
                        <th style={{ width: '50px' }} rowSpan="2">
                            3
                        </th>
                        <th colspan="5">LT Hệ số 1</th>
                        <th style={{ width: '40px' }} rowSpan="2">
                            1
                        </th>
                        <th style={{ width: '40px' }} rowSpan="2">
                            2
                        </th>
                    </tr>
                    <tr style={{ backgroundColor: 'rgb(29, 161, 242)' }}>
                        <th style={{ width: '50px', height: '50px' }} rowSpan="1">
                            1
                        </th>
                        <th style={{ width: '50px', height: '50px' }} rowSpan="1">
                            2
                        </th>
                        <th style={{ width: '50px', height: '50px' }} rowSpan="1">
                            3
                        </th>
                        <th style={{ width: '50px', height: '50px' }} rowSpan="1">
                            4
                        </th>
                        <th style={{ width: '50px', height: '50px' }} rowSpan="1">
                            5
                        </th>
                    </tr>
                    <tr>
                        <td colspan="28">HK1 (2019-2020)</td>
                    </tr>
                    <tr>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                        <th>6</th>
                        <th>7</th>
                        <th>8</th>
                        <th>9</th>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                        <th>6</th>
                        <th>7</th>
                        <th>8</th>
                        <th>9</th>
                        <th>1</th>
                        <th>2</th>
                    </tr>
                    <tr>
                        <td colspan="2">Điểm trung bình học kỳ hệ 10: 6,30</td>
                        <td colspan="2">Điểm trung bình học kỳ hệ 4: 2,21</td>
                        <td colspan="24"></td>
                    </tr>
                    <tr>
                        <td colspan="2">Điểm trung bình tích lũy: 7,10</td>
                        <td colspan="2">Điểm trung bình tích lũy (hệ 4): 2,80</td>
                        <td colspan="24"></td>
                    </tr>
                    <tr>
                        <td colspan="2">Tổng số tín chỉ đã đăng ký: 114</td>
                        <td colspan="2">Tổng số tín chỉ tích lũy: 110</td>
                        <td colspan="24"></td>
                    </tr>
                    <tr>
                        <td colspan="2">Tổng số tín chỉ đạt: 12</td>
                        <td colspan="2">Tổng số tín chỉ nợ tính đến hiện tại: 4</td>
                        <td colspan="24"></td>
                    </tr>
                    <tr>
                        <td colspan="2">Xếp loại học lực tích lũy: Khá</td>
                        <td colspan="2">Xếp loại học lực học kỳ: Trung bình</td>
                        <td colspan="24"></td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default Ketquahoctap;
