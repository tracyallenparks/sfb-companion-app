import { Fragment } from "react";
import { Table } from "react-bootstrap";
import BreakdownRow from "./BreakldownRow";

const GameReportBreakdown = (props) => {
    const config_props = {
        item:props.item,
        ir:props.ir
    };
    return (
        <Table responsive striped bordered variant='dark'>
            <thead>
                <tr>
                    <td>Internals {props.ir}</td>
                    <td>Total</td>
                    <td>Percent</td>
                </tr>
            </thead>
            <tbody>
            
            {Object.keys(props.item.internals[props.ir]).map((gt,i) => {
                //name,type
                return (
                    <Fragment key={i}>
                    {gt !== 'total' &&
                        <tr key={`breakdown-header-${i}`}>
                            <td className='breakdown-header' colSpan='3'>Breakdown by {gt}</td>
                        </tr>
                    }
                    
                    {Object.keys(props.item.internals[props.ir][gt]).map((nt,j) => {
                        config_props.gt = gt;
                        config_props.nt = nt;
                        return (
                            <BreakdownRow key={`${i}-${j}`} { ...config_props }/>
                        )
                    })}
                    </Fragment>
                )})
            }
            </tbody>
        </Table>
)}

export default GameReportBreakdown;