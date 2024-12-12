import './Menu.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from "../../context/auth";
import { useNavigate } from 'react-router-dom';
import Search from './search/Search';

export default function Menu() {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        setAuth({ ...auth, user: null, token: "" });
        localStorage.removeItem("auth");
        navigate('/login');
    };

    return (
        <ul className="nav justify-content-center">
            <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">HOME</NavLink>
            </li>

            {!auth?.user ? (
                <>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">LOGIN</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/register">REGISTER</NavLink>
                    </li>
                </>
            ) : (
                <>
                    <Search />
                    <div className='dropdown'>
                        <li className="nav-item dropdown">
                            <button
                                className='nav-link dropdown-toggle btn btn-link'
                                id="userDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {auth?.user?.name}
                            </button>
                            <ul className='dropdown-menu' aria-labelledby="userDropdown">
                                <li>
                                    <NavLink className="dropdown-item" to="/dashboard/user">Dashboard</NavLink>
                                </li>
                                <li>
                                    <button onClick={logout} className="dropdown-item">LOGOUT</button>
                                </li>
                            </ul>
                        </li>
                    </div>
                </>
            )}
        </ul>
    );
}
