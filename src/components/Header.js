import Nav from './Nav';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <Link to={'/'} className='logo'>Dexie</Link>
            <Nav />
        </header>
    );
}

export default Header