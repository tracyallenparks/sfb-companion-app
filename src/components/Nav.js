import Nav from 'react-bootstrap/Nav';

const Navigation = ({type}) => {
    return (
        <Nav
            activeKey="/"
        >
            {(type==='footer') &&
                <Nav.Item>
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>
            }
            {/* 
            <Nav.Item>
                <Nav.Link href="/dice">Dice</Nav.Link>
            </Nav.Item>
            */}
        </Nav>
    )
}

export default Navigation