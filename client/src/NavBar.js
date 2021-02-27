import { useState } from 'react'
import { Link } from "react-router-dom";
import {
	Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

	const submitSearch = (e) =>{
		e.preventDefault()
		console.log('search')
	}

  return (
    <div>
      <Navbar style={{backgroundColor: "#ffffff"}} light expand="md">
				<form onSubmit={submitSearch}>
					<input className="mr-2 border-top-0 border-left-0 border-right-0 rounded-0" name="itemToSearch" id="search-input" placeholder="Search" type="text"/>
					<Button outline color="dark"><i className="las la-search" style={{fontSize: "20px"}}></i></Button>
				</form>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto ml-auto nav-center" navbar>
					<Link to="/"><i className="lab la-creative-commons-sampling navbar-logo"></i></Link>
          </Nav>
          <NavbarText>
						<Link to="/cart"><i style={{fontSize: "45px"}} className="las la-shopping-cart"></i></Link>
					</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}


export default NavBar