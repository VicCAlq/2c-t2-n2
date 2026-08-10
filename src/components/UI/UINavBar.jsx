import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function UINavBar() {

    return (
        <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="assets\logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            React Bootstrap
          </Navbar.Brand>
        </Container>
      </Navbar>
    );
}

export default UINavBar;