import SEO from '../components/SEO';
import GameReportSection from '../components/GameReportSection';
import { useState } from 'react';
import { db } from '../hooks/useSession';

import { average, mostFrequent } from '../hooks/useFind';
import { useLiveQuery } from "dexie-react-hooks";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../css/GameReport.css';

const GameReport = () => {
    const navigate = useNavigate();

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
                    score:0,
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

                Object.keys(internals).forEach(gt => {
                    if(internals[gt].length){
                        internals[gt].forEach((item)=>{
                            if(!result.internals[gt].type[item.ty]){
                                result.internals[gt].type[item.ty] = {count: 1};
                            } else {
                                result.internals[gt].type[item.ty].count++
                            }
                            if(!result.internals[gt].name[item.nm]){
                                result.internals[gt].name[item.nm] = {count: 1};
                            } else {
                                result.internals[gt].name[item.nm].count++
                            }
                            if(gt === 'given'){
                                switch(item.ty){
                                    case 'weapon':
                                        result.score = result.score + 3;
                                        break;
                                    case 'power':
                                        result.score = result.score + 2;
                                        break;
                                    case 'system':
                                    case 'control':
                                        result.score = result.score + 1;
                                        break;
                                    default:
                                        break;
                                }
                            }

                            result.internals[gt].type[item.ty].percent = (((result.internals[gt].type[item.ty].count/result.internals[gt].total)*100).toFixed(2));
                            result.internals[gt].name[item.nm].percent = (((result.internals[gt].name[item.nm].count/result.internals[gt].total)*100).toFixed(2));
                        })
                    }
                })
                report.push(result)
            })
        });
        return report;
    };

    const config_props = {};

    return(
        <>
        <SEO title='Game Report'/>
        {!!isLoading && 
            <p>App Loading...</p>
        }
        {!isLoading && !!players?.length &&
            <>
            <h1 key={`game-report-h1`}>Game Report:</h1>
            {!!compileReport()?.length &&
            compileReport().map((item,i) => {
                config_props.item = item;
                config_props.index = i
                return (
                    <GameReportSection key={`section-${i}`} { ...config_props }/>
                )
            })
            }
            <Button
                className='close-report'
                as='button'
                variant='info'
                onClick={()=>{
                    navigate('/ ')
                }}
            >
                Close Report 
            </Button>
            </>
        }
        
        </>
    );
};

export default GameReport;