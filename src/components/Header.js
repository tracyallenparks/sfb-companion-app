import Nav from './Nav';
import { Link } from 'react-router-dom';
import '../css/Header.css';

const Header = () => {
    return (
        <header>
            <Link to={'/'} className='header-title'>SFB Companion App</Link>
            <Nav />
        </header>
    );
}

export default Header