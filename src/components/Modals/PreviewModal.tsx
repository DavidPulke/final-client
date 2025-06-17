import { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";
import MovieInfo from "../MovieInfo";
import Preview from "../Preview";
import Movie from "../../interfaces/Movie";



interface PreviewModalProps {
    onHide: Function;
    refresh: Function;
    show: boolean;
    data: Movie
}

const PreviewModal: FunctionComponent<PreviewModalProps> = ({ onHide, refresh, show, data }) => {
    return (<>
        <Modal
            show={show}
            onHide={() => onHide()}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className="bg-warning">
                <Modal.Title className="text-dark" id="contained-modal-title-vcenter">
                    Preview
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-light bg-dark">
                <Preview data={data} onHide={onHide} refresh={refresh} />
            </Modal.Body>
        </Modal>
    </>);
}

export default PreviewModal;