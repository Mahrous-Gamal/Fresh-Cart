import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import logo from "../../Assets/Images/freshcart-logo.svg";
import { Link } from "react-router-dom";


export default function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <img src={logo} alt="logo" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 className="text-center mb-3 ">Let's get started</h4>
        <div className="d-flex justify-content-center">
          <Link
            className="nav-link p-2  border-main m-2 rounded-2"
            to="/signin"
          >
            Signin
          </Link>
          <Link
            className="nav-link p-2  border-main m-2 rounded-2"
            to="/signup"
          >
            Signup
          </Link>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
