import SEO from '../components/SEO';
import { useState } from 'react';
import { db } from '../hooks/useSession';
import { oxford } from '../hooks/useOxford';
import { average, mostFrequent } from '../hooks/useFind';
import { useLiveQuery } from "dexie-react-hooks";
import { Button, Table } from 'react-bootstrap';
import '../css/GameReport.css';

const GameReport = () => {
    const players = useLiveQuery(
        async () => {
            const players = await db.players
                .toArray();
            setIsLoading(false);
            return players;
        },
    );

    const [isLoading, setIsLoading] = useState(true);

    const compileReport = () => {
        const report = [];
        players.forEach(player => {
            player.ships.forEach(ship => {
                const rolls = ship.rolls.map(roll => roll.total);
                const internals = {
                    given:[...ship.internalsGiven],
                    taken:[...ship.internalsTaken]
                }
                const result = {
                    ship:ship.name,
                    rolls:{
                        most:mostFrequent(rolls),
                        average:(!isNaN(average(rolls)))?average(rolls):'none',
                        total:rolls.length
                    },
                    internals:{
                        given:{
                            type:{},
                            name:{},
                            total:internals.given.length
                        },
                        taken:{
                            type:{},
                            name:{},
                            total:internals.taken.length
                        }
                    }
                };

                Object.keys(internals).forEach(key => {
                    if(internals[key].length){
                        internals[key].forEach((item)=>{
                            if(!result.internals[key].type[item.ty]){
                                result.internals[key].type[item.ty] = {count: 1};
                            } else {
                                result.internals[key].type[item.ty].count++
                            }
                            if(!result.internals[key].name[item.nm]){
                                result.internals[key].name[item.nm] = {count: 1};
                            } else {
                                result.internals[key].name[item.nm].count++
                            }
                            result.internals[key].type[item.ty].percent = (result.internals[key].type[item.ty].count/result.internals[key].total)*100
                            result.internals[key].name[item.nm].percent = (result.internals[key].name[item.nm].count/result.internals[key].total)*100
                        })
                    }
                })
                report.push(result)
            })
        });
        return report;
    };

    return(
        <>
        <SEO title='Game Report'/>
        {!!isLoading && 
            <p>App Loading...</p>
        }
        {!isLoading && !!players?.length &&
            <>
            <h1>Game Report:</h1>
            {!!compileReport()?.length &&
            compileReport().map(item => {
                return (
                    <section key={item.ship}>
                        <h4 className='game-report-ship'>{item.ship}</h4>
                        <div className='report-columns'>
                            <Table responsive striped bordered variant='dark'>
                                <tbody>
                                    <tr>
                                        <td>Total Rolls</td>
                                        <td>{item.rolls.total}</td>
                                    </tr>
                                    <tr>
                                        <td>Average Roll</td>
                                        <td>{item.rolls.average}</td>
                                    </tr>
                                    <tr>
                                        <td>Most Rolled</td>
                                        <td>
                                            {!item.rolls.most?.length && `none`}
                                            {!!item.rolls.most?.length && oxford.format(item.rolls.most)}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            {
                                Object.keys(item.internals).map(key => {return(
                                    //given,taken
                                    <>
                                    {!!item.internals[key]?.total &&
                                        <Table key={`${item.ship}-${key}`} responsive striped bordered variant='dark'>
                                            <thead>
                                                <tr>
                                                    <td>Internals {key}</td>
                                                    <td>Total</td>
                                                    <td>Percent</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                Object.keys(item.internals[key]).map(key2 => {
                                                //name,type
                                                return (
                                                    Object.keys(item.internals[key][key2]).map(key3 => {return (
                                                        <tr key={`${item.ship}-${key3}`}>
                                                            <td>{key3}</td>
                                                            <td>{item.internals[key][key2][key3].count}</td>
                                                            <td>{item.internals[key][key2][key3].percent}%</td>
                                                        </tr>
                                                    )})
                                                )})
                                            }
                                            </tbody>
                                        </Table>
                                    }
                                    </>
                                )})
                            }
                        </div>
                    </section>
                )
            })}
            <Button>
                Close Report
            </Button>
            </>
        }
        
        </>
    );
};

export default GameReport;