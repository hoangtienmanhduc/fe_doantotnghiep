import { Image } from 'primereact/image';
import imgGioHoc from '../../../assets/images/thongtingiohoc.png';
import imgGioThi from '../../../assets/images/thongtingiothi.png';
const ThongTinGioHoc = () => {
    return (
        <div className="w-full mt-3">
            <div className="col-12 flex flex-wrap align-items-stretch p-0 mb-3 surface-50 border-round-xl">
                <div className="col-12 h-max">
                    <h2>
                        <i className="pi pi-clock mr-2"></i>Thông tin giờ học
                        <hr />
                    </h2>
                </div>
                <div className="flex flex-column align-items-center justify-content-center w-full">
                    <h3 className="text-primary">I. GIỜ HỌC LÝ THUYẾT VÀ THÍ NGHIỆM /THỰC HÀNH </h3>
                    <div className="w-full flex justify-content-center">
                        <Image src={imgGioHoc} alt="Image" preview />
                    </div>
                    <h3 className="text-primary">II. GIỜ THI LÝ THUYẾT VÀ THI TRẮC NGHIỆM, TRỰC TUYẾN </h3>
                    <div className="w-full flex justify-content-center">
                        <Image src={imgGioThi} alt="Image" preview />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThongTinGioHoc;
