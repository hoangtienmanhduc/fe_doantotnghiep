const { Dialog } = require('primereact/dialog');
const { Divider } = require('primereact/divider');
const { InputTextarea } = require('primereact/inputtextarea');
const { Toast } = require('primereact/toast');
const { forwardRef, useImperativeHandle, useCallback, useState, useRef } = require('react');
const { default: Button } = require('~/components/Button');

const TimeAndPlaceForm = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        showForm: handleShowForm,
        hideForm: handleHideForm,
    }));

    const [data, setData] = useState({});
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);

    const handleShowForm = useCallback((data) => {
        setData(!!data ? { ...data } : {});
        setVisible(true);
    }, []);

    const handleHideForm = useCallback(() => {
        setData({});
        setVisible(false);
    }, []);

    const handleOnSubmit = useCallback(() => {}, []);

    return (
        <>
            <Dialog
                header={
                    <h3 className="m-0 p-3 pb-0 font-bold">
                        {`${!!data?.id ? 'Cập nhật thông tin' : 'Thêm mới'} lớp học phần`}
                        <hr />
                    </h3>
                }
                onHide={handleHideForm}
                style={{
                    width: '60vw',
                }}
                pt={{ header: { className: 'p-0' } }}
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                visible={visible}
            >
                <div>
                    <div className="col-12 p-0">
                        <Divider align="left">
                            <div className="inline-flex align-items-center">
                                <i className="pi pi-clock mr-2"></i>
                                <h3 className="p-0 m-0">Thời gian và Phòng học</h3>
                            </div>
                        </Divider>

                        <div className="col-12 p-0">
                            <p>Ghi chú lớp học phần</p>
                            <span className="w-full">
                                <InputTextarea
                                    rows={6}
                                    value={data?.note || ''}
                                    placeholder="Nhập ghi chú cho thời gian học của lớp học phần này (Không bắt buộc)"
                                    onChange={(e) => {
                                        // handleOnChange('note', e?.target.value);
                                    }}
                                    className="w-full"
                                />
                            </span>
                        </div>
                    </div>
                    <br />
                    <hr />
                    <div className="flex col-12">
                        <Button
                            className={`col-6 p-button-lg font-bold mr-2`}
                            icon={'pi pi-send'}
                            label={'Xác nhận'}
                            onClick={handleOnSubmit}
                        />

                        <Button
                            className="col-6 p-button-lg font-bold"
                            icon={'pi pi-times'}
                            label={'Huỷ bỏ'}
                            onClick={handleHideForm}
                        />
                    </div>
                </div>
            </Dialog>
            <Toast ref={toast} />
        </>
    );
});

export default TimeAndPlaceForm;
