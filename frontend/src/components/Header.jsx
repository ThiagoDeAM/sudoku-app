import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ token, handleLogout }) => {
    return (
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item">Sudoku App</Link>
            </div>
            <div className="navbar-menu">
                <div className="navbar-start">
                    {token &&
                        <>
                            <Link to="/sudoku" className="navbar-item">Sudoku</Link>
                            <Link to="/ranking" className="navbar-item">Ranking</Link>
                            <Link to="/user-games" className="navbar-item">Game History</Link>
                        </>
                    }
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        {token ? (
                            <button className="button is-light" onClick={handleLogout}>Logout</button>
                        ) : (
                            <>
                                <Link to="/login" className="button is-light">Login</Link>
                                <Link to="/register" className="button is-primary ml-2">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;