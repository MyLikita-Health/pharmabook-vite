import { Navbar, Nav, NavbarBrand, Collapse, NavbarToggler, NavItem, NavLink, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, NavbarText } from 'reactstrap'
import logo from '../../assets/images/logo.png';
import './nav.css';

const Guest = () => {
	return(
		<div className='top-bar'>
  <Navbar
    color="light"
    expand="md"
		light
  >
    <NavbarBrand href="/">
      {/* <img src={logo} className='logo' alt='Logo' /> */}
    </NavbarBrand>
    <NavbarToggler onClick={function noRefCheck(){}} />
    <Collapse navbar>
      <Nav
        className="me-auto"
        navbar
      >
        <NavItem>
          <NavLink href="/components/">
            Components
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="https://github.com/reactstrap/reactstrap">
            GitHub
          </NavLink>
        </NavItem>
        <UncontrolledDropdown
          inNavbar
          nav
        >
          <DropdownToggle
            caret
            nav
          >
            Options
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              Option 1
            </DropdownItem>
            <DropdownItem>
              Option 2
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              Reset
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
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