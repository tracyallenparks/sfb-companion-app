import Nav from './Nav';
import '../css/Footer.css';

const year = new Date().getFullYear();
const Footer = () => {
    return (
        <footer>
            <div>&copy;{year} - For Personal Use Only</div>
            <Nav type='footer'/>
        </footer>
    );
}

export default Footer