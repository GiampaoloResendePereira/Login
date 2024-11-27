import { Nav, Link } from 'react-bootstrap';
import React from 'react';
import logo from '../../assets/img/logo.png';



<Nav>
    
<Nav.Link href="/cliente">Solicitação Frete</Nav.Link>
<Nav.Link href="/calculo-frete"></Nav.Link>


<Link className="navbar-brand" to="/">
    <img src={logo} alt="Logo" height="50" />
    </Link>

</Nav>