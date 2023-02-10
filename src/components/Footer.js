import Nav from './Nav';

const year = new Date().getFullYear();
const Footer = () => {
    return (
        <footer>
            <Nav type='footer'/>
            &copy;{year}
        </footer>
    );
}

export default Footer