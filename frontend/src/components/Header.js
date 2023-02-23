import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './style.css';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
export default function Header() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const clickBurger = () => {
        const burger = document.querySelector('.burger-menu');
        const nav = document.querySelector('#header-nav');
        burger.classList.toggle('close');
        nav.classList.toggle('open');
    }
    return (
        <header>
            <Link to='/' className="title">
                BLOG
            </Link>
            <nav id="header-nav">
                <ul>
                    <li >
                        <Link to="/"><HomeIcon />Home</Link>
                    </li>
                    {isAuthenticated
                        ? <>
                            <li>
                                <Link to="/add_post"><PostAddIcon />Add Post</Link>
                            </li>
                            <li>
                                <Link to="/user_post"><PersonIcon />My Posts</Link>
                            </li>
                            <li >
                                <Link to="/logout"><LogoutIcon></LogoutIcon>Logout</Link>
                            </li>
                        </>
                        : <>
                            <li>
                                <Link to="/login"><LoginIcon />Login</Link>
                            </li>
                            <li>
                                <Link to="/register"><VpnKeyIcon />Register</Link>
                            </li>
                        </>
                    }
                </ul>
            </nav>
            <div className="burger-menu" onClick={clickBurger}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </header>
    )
}