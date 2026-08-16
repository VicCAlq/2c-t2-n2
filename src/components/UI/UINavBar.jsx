import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function UINavBar() {

    return (
        <Navbar bg='dark' data-bs-theme="dark" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt="G8 Logo"
              src="assets\log.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            G8
          </Navbar.Brand>
        </Container>
      </Navbar>
    );
}

export default UINavBar;