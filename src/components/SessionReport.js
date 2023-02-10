import { oxford } from "../hooks/useOxford";
import { Table } from 'react-bootstrap';

const SessionReport = (props) => {return(
    <div className='session-report'>
        <h2>Session Report</h2>
        <span className='close' onClick={props.click.close}>&times;</span>
        <p>Attacker, {props.attacker.ship.name}, made these rolls:</p>
        <Table responsive striped bordered variant='dark'>
            <tbody>
                <tr>
                    <td>Total Rolls</td>
                    <td>{props.sessionReport.roll.total}</td>
                </tr>
                <tr>
                    <td>Average Roll</td>
                    <td>{props.sessionReport.roll.average}</td>
                </tr>
                <tr>
                    <td>Most Rolled</td>
                    <td>{oxford.format(props.sessionReport.roll.most)}</td>
                </tr>
            </tbody>
        </Table>
        <p>Defender, {props.target.ship.name}, took these hits:</p>
        <Table responsive striped bordered variant='dark'>
            <tbody>
                <tr>
                    <td>Control Hits</td>
                    <td>{props.sessionReport.internals.control}</td>
                </tr>
                <tr>
                    <td>Weapon Hits</td>
                    <td>{props.sessionReport.internals.weapon}</td>
                </tr>
                <tr>
                    <td>Power Hits</td>
                    <td>{props.sessionReport.internals.power}</td>
                </tr>
                <tr>
                    <td>System Hits</td>
                    <td>{props.sessionReport.internals.system}</td>
                </tr>
                <tr>
                    <td>Structural Hits</td>
                    <td>{props.sessionReport.internals.superstructure}</td>
                </tr>
                <tr>
                    <td>Most Internals Hit</td>
                    <td>{oxford.format(props.sessionReport.internals.most)}</td>
                </tr>
                <tr>
                    <td>Obliterated Internals</td>
                    <td>{oxford.format(props.sessionReport.internals.obliterated)}</td>
                </tr>
            </tbody>
        </Table>
    </div>
)};

export default SessionReport;