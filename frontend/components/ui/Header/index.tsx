import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Cart from "@/components/courses/cart";
import { useAuth } from "@/components/auth/authContextProvider";

export const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <Navbar className='bg-body-tertiary' expand='lg'>
      <Container>
        <Navbar.Brand href='/'>EduQuest</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/courses'>Courses</Nav.Link>
          </Nav>
          <Nav>
            {}
            <NavDropdown
              title={user ? `Hi ${user.username}!` : "Menu"}
              id='basic-nav-dropdown'>
              {!isAuthenticated && (
                <NavDropdown.Item href='/auth'>Login</NavDropdown.Item>
              )}
              {isAuthenticated && (
                <NavDropdown.Item href={"/users/" + user?.id}>
                  Account
                </NavDropdown.Item>
              )}
              {isAuthenticated && (
                <NavDropdown.Item href={"/users/" + user?.id + "/courses"}>
                  My Learning
                </NavDropdown.Item>
              )}
              {isAuthenticated && (
                <NavDropdown.Item onClick={() => logout()} href='#'>
                  Logout
                </NavDropdown.Item>
              )}
              <Cart name='Cart' placement='end' />

              {isAuthenticated && user?.isAdmin && (
                <NavDropdown.Item href='/users'>
                  User Management
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
