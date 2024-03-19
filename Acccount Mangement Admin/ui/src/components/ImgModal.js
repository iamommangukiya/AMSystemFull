import { Modal } from 'react-bootstrap-v5';
import React from 'react';
import noimage from 'assets/images/image.jpg';

const ImgModal = ({ show, setShow, imgUrl }) => {
    return (
        <Modal
            className="modal-sticky absolute_center modal-sticky-lg modal-sticky-bottom-right document-modal"
            id="kt_inbox_compose"
            role="dialog"
            centered
            data-backdrop="false"
            aria-hidden="true"
            tabIndex="-1"
            show={show}
            onHide={() => {
                setShow(false);
            }}
            animation={true}
            size="lg"
        >
            <div className="modal-content">
                {/* begin::Form */}
                <div style={{ height: 'calc(100vh - 300px)', textAlign: 'center' }}>
                    <img
                        className="me-3"
                        style={{ width: 'auto', height: '100%', maxWidth: '1000px' }}
                        src={imgUrl}
                        onError={(e) => (e.target.src = noimage)}
                        alt="img"
                    />
                </div>
                {/*end::Form*/}
            </div>
        </Modal>
    );
};

export default ImgModal;
