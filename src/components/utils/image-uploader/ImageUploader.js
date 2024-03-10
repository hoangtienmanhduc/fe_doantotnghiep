import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadImage } from './ImageEndPoint';
import { Toast } from 'primereact/toast';

const ImageUploader = forwardRef(({ id, multiple = true, extraData, callBack = () => {}, initialImage }, ref) => {
    useImperativeHandle(ref, () => ({
        value: handleGetImages(),
    }));
    const [imageUrls, setImageUrls] = useState(initialImage ? [initialImage] : []);
    const toast = useRef(null);
    const onDrop = useCallback(async (acceptedFiles) => {
        if (callBack) {
            const uploadedImages = await handleUploadImage(acceptedFiles);
            if (uploadedImages?.length > 0) {
                if (!!multiple) {
                    setImageUrls([...uploadedImages, ...imageUrls]);
                } else {
                    setImageUrls([...uploadedImages]);
                }
            } else {
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Xử lý hình ảnh không thành công!!',
                });
            }
        }
    }, []);

    const handleGetImages = () => {
        if (imageUrls?.length > 0) {
            if (!!multiple) {
                return imageUrls;
            } else {
                return imageUrls[0];
            }
        }

        return null;
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: true,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png'],
        },
        maxFiles: 10,
    });

    const handleUploadImage = async (files) => {
        if (!files || files.length < 1) {
            return;
        }

        let imageUrls = [];
        for (let i = 0; i < files.length; i++) {
            const imageFile = files[i];

            let bodyFormData = new FormData();
            bodyFormData.append('image', imageFile);

            const imageResponse = await uploadImage(bodyFormData);
            if (imageResponse && !!imageResponse.success && imageResponse.data) {
                imageUrls.push(imageResponse.data.display_url);
            }
        }

        return imageUrls;
    };

    const handleRemoveImage = useCallback((imageUrl) => {
        let tmp = imageUrls.filter((x) => x !== imageUrl);

        if (!!multiple) {
            callBack(tmp);
            setImageUrls([...tmp]);
        } else {
            callBack('');
            setImageUrls([]);
        }
    }, []);

    return (
        <React.Fragment>
            <div className="border-1 border-round-xl border-300 mb-3" {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="flex justify-content-center align-items-center">
                    <img
                        src={require('../../../assets/images/upload.jpg')}
                        alt={'Uploader'}
                        style={{
                            height: '80px',
                        }}
                    />
                </div>
                <h4 className="text-center">Kéo thả ảnh vào đây</h4>
                <p className="text-center">Hỗ trợ loại tệp hình ảnh: JPG, PNG, JPEG </p>

                <div className="">
                    <div className="flex justify-content-center align-items-center">
                        <div
                            className="px-3 "
                            style={{
                                background: '#0D9488',
                                borderRadius: 8,
                            }}
                        >
                            <h4 className="text-center font-semibold m-0" style={{ color: 'white' }}>
                                hoặc
                            </h4>
                        </div>
                    </div>
                </div>

                <div className="col-12 flex justify-content-center mt-2" style={{ cursor: 'pointer' }}>
                    <div className="col-6 bg-green-100 border-round-xl">
                        <h4 className="text-center" style={{ color: 'darkcyan' }}>
                            Nhấn vào đây để tải hình lên
                        </h4>
                    </div>
                </div>
            </div>

            {imageUrls?.length > 0 && (
                <div>
                    <h4 className="font-bold mb-1">Bạn đã tải lên {imageUrls?.length} hình</h4>
                    <div className="horizontal-scroll my-2">
                        {imageUrls.map((url, idx) => (
                            <div key={idx} className="relative mr-2 w-min" onClick={() => handleRemoveImage(url)}>
                                <img src={url} alt={id} height={100} width={100} />
                                <div className="absolute cursor-pointer bottom-0 right-0 z-4 hover:bg-white border-circle p-2">
                                    <i className="pi pi-trash" style={{ color: 'red' }}></i>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <Toast ref={toast} />
        </React.Fragment>
    );
});

export default ImageUploader;
