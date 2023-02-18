import { Fragment } from "react";
import { Table } from "react-bootstrap";
import { oxford } from '../hooks/useOxford';
import GameReportBreakdown from "./GameReportBreakdown";

const GameReportSection = (props) => {
    const config_props = {
        item:props.item
    };
    return(
        <section>
            <h4 className='game-report-ship'>{props.item.ship}</h4>
            <div className='report-columns'>
                <Table responsive striped bordered variant='dark'>
                    <tbody>
                        <tr>
                            <td>Total Rolls</td>
                            <td>{props.item.rolls.total}</td>
                        </tr>
                        <tr>
                            <td>Average Roll</td>
                            <td>{props.item.rolls.average}</td>
                        </tr>
                        <tr>
                            <td>Most Rolled</td>
                            <td>
                                {!props.item.rolls.most?.length && `none`}
                                {!!props.item.rolls.most?.length && oxford.format(props.item.rolls.most)}
                            </td>
                        </tr>
                        <tr>
                            <td>Attack Score</td>
                            <td>{props.item.score}</td>
                        </tr>
                        <tr>
                            <td>Effective Score</td>
                            <td>{((props.item.score/props.item.rolls.total)*100).toFixed(2)}%</td>
                        </tr>
                    </tbody>
                </Table>
                {
                    Object.keys(props.item.internals).map((ir,i) => {
                        config_props.ir = ir;

                        return(
                        //given,taken
                        <Fragment key={i}>
                        {
                        !!props.item.internals[ir]?.total &&
                            <GameReportBreakdown key={i} { ...config_props } />
                        }
                        </Fragment>
                    )})
                }
            </div>
        </section>
)};

export default GameReportSection;