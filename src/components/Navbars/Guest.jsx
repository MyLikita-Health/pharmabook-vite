import { Navbar, Nav, NavbarBrand, Collapse, NavbarToggler, NavItem, NavLink } from 'reactstrap'
import logo from '../../assets/images/white-logo.png';
import './nav.css';

const Guest = () => {
  return (
    <div>
      <Navbar
        color="light"
        expand="md"
        light
      >
        <NavbarBrand href="/">
          <img src={logo} className='logo' alt='Logo' />
        </NavbarBrand>
        <NavbarToggler onClick={function noRefCheck() { }} />
        <Collapse navbar>
          <Nav
            className="me-auto"
            navbar
          >

          </Nav>
          <NavItem>
            <NavLink href='login' className='btn btn-default'>Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='login' className='btn btn-default'>Sign-up</NavLink>
          </NavItem>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default Guest;