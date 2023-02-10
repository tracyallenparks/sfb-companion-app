import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
        <Header />
        <div className="screen">
            <Outlet />
        </div>
        <Footer />
        </>
    )
}

export default Layout