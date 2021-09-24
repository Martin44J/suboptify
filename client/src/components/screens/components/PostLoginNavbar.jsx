import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./PostLoginNavbar.css";

const PostLoginNavbar = (props) =>{


    const logoutHandler = () =>{
        localStorage.removeItem("authToken");
      };

    return(
        <div className="post-login-navbar-root">
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand className="brand-styling" href="/watchlist">suboptify</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggle-button"/>

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Nav.Link className="watchlist-link" href="/watchlist">Watchlist</Nav.Link>
                            <Nav.Link href="/preferences">Preferences</Nav.Link>
                            
                            <Nav.Item className="username-dropdown">
                                <NavDropdown  title={props.username} id="basic-nav-dropdown">
                                    <NavDropdown.Item className="dropdown-item-username" href="/" onClick={()=>{logoutHandler();}}><p>Logout</p></NavDropdown.Item>
                                </NavDropdown>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}





/*<div className="PostLoginNavbar__navbar-div">
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container" id="navbar-container">
                    <div className="navbar-header">
                        <a className = "nav-link active" href = "/watchlist" id="navbar-brand-link">
                            <p className="navbar-brand brand-styling">suboptify</p>
                        </a>
                    </div>

                    <button class="navbar-toggler" onClick={() => setToggle(!toggle)} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="collapseTarget" aria-expanded={toggle} aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <Collapse in={toggle}>
                        <div class="collapse navbar-collapse" id="collapseTarget">
                            <ul className="nav navbar-nav navbar-right">
                                {props.screen==="watchlist"?(<li className = "nav-item" id="home"><a className = "nav-link active active-link" href="/watchlist">Watchlist</a></li>):(
                                    <li className = "nav-item" id="home"><a className = "nav-link active" href="/watchlist">Watchlist</a></li>
                                )}
                                {props.screen==="Preferences"?(<li className = "nav-item" id="preferences"><a className = "nav-link active active-link" href="/preferences">Preferences</a></li>):(
                                    <li className = "nav-item" id="preferences"><a className = "nav-link active" href="/preferences">Preferences</a></li>
                                )}
                            </ul>

                            <span className="navbar-text username-text">
                                <a class="nav-link dropdown-toggle" onClick={() => setUserOpen(!userOpen)} aria-controls="userCollapseTarget" aria-expanded={userOpen}>
                                    {props.user.username}
                                </a>
                                <Collapse className="username-collapse-menu" in={userOpen}>
                                        <div classname="collapse navbar-collapse" id="userCollapseTarget">
                                            <a className="nav-item">Logout</a>
                                        </div>
                                </Collapse>
                            </span>

                        </div>
                    </Collapse>
                </div>
            </nav>
        </div>
        */

export default PostLoginNavbar;