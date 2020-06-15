import React from 'react';

import './styles.css';

const Header = (props) => {
    return (
        <header className="main-header">
            <span>{props.title}</span>
            <small>Light Mode</small>
        </header>
    )
}

export default Header;