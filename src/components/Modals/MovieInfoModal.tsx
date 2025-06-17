import { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";
import MovieInfo from "../MovieInfo";



interface MovieInfoModalProps {
    onHide: Function;
    refresh: Function;
    show: boolean;
    movieId: string
}

const MovieInfoModal: FunctionComponent<MovieInfoModalProps> = ({ onHide, refresh, show, movieId }) => {
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
                    Movie Info
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-light bg-dark">
                <MovieInfo movieId={movieId} onHide={onHide} refresh={refresh} />
            </Modal.Body>
        </Modal>
    </>);
}

export default MovieInfoModal;