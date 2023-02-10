import SEO from '../components/SEO';
import { rollDice } from '../data/core';
import { useState, useEffect } from "react";
import { db } from '../hooks/useSession';
import { oxford } from '../hooks/useOxford';
//import { useNavigate } from 'react-router-dom';
import { useLiveQuery } from "dexie-react-hooks";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PlayerInterface from '../components/PlayerInterface';
import InternalsList from '../components/InternalsList';
import { cards } from "../data/core";
import { Table } from 'react-bootstrap';


/*
    game stages:
        10 - Need Attacker
        20 - Need Target
        30 - Need Damage Input
        35 - Awaiting Input
        40 - Do Damage Loop
        50 - Give Report for Loop
        99 - Give Game Report
*/

const  Session = () => {
    //const navigate = useNavigate();
    const players = useLiveQuery(
        async () => {
            const players = await db.players
                .toArray();
            setIsLoading(false);
            return players;
        },
    );

    const starterShip = {
        playerid:false,
        ship:{
            name:false,
            rolls:[],
            internalsGiven:[],
            internalsTaken:[],
            internalsNone:[]
        }
    };

    const getShipInfo = async (arr) =>{
        let player,ships;
        if(arr[0] !== 1999){
            player = await db.players.where('id').equals(arr[0]).toArray();
            ships = player[0].ships[arr[1]];
        } else {
            player = arr[0]
            ships = {
                name:'Entity',
                rolls:[],
                internalsGiven:[],
                internalsTaken:[],
                internalsNone:[]
            }
        }
        return ships;
    };
    
    const [isLoading, setIsLoading] = useState(true);
    const [stage,setStage] = useState(10);

    const [attacker,setAttacker] = useState(attacker => ({...starterShip}));
    const [target,setTarget] = useState(target => ({...starterShip}));
    const [internals,setInternals] = useState([]);

    const [daa,setDaa] = useState(cards);
    const [count,setCount] = useState(1);
    const [records,setRecords] = useState([]);
    const [none,setNone] = useState([]);

    const [sessionReport,setSessionReport] = useState([]);

    const handleDamage = (input) => {
        const value = (!isNaN(parseInt(input.value)))?parseInt(input.value):0
        setInternals(rollDice(value));
        setStage(40)
    }

    const clickEvents = {
        none:(ele) => {
            console.log(`NONE`);
            setNone([...none,ele.getAttribute('internal')]);
            const updateRecords = records.filter((record,index)=> index !== records.length-1);
            setRecords([...updateRecords])
        },
        next:() => {
            console.log(`NEXT`);
            setCount(count+1);
        },
        last:(ele) => {
            console.log(`LAST`);
            setNone([...none,ele.getAttribute('internal')]);
            setCount(count+1);
        },
        report:() => {
            console.log(`REPORT`);
            setStage(50);
        },
        edit:() => {
            console.log(`EDIT`);
        },
        close:() => {
            console.log(`CLOSE`);
            setStage(10);
        },
        ship: async (input) => {
            const playerid = parseInt(input.getAttribute('playerid'));
            const shipid = parseInt(input.getAttribute('shipid'));
            if(!input.getAttribute('disabled')){
                input.setAttribute('disabled',true);
                const shipInfo = await getShipInfo([playerid,shipid]);
                if(stage < 20){
                    let updateAttacker = {
                        playerid: playerid
                    }
                    updateAttacker.ship = shipInfo
    
                    setAttacker(attacker => ({
                        ...attacker,
                        ...updateAttacker
                    }));
                    input.className = `${input.className} session-attacker`;
                    if(document.querySelector('.session-target')){
                        setStage(30);
                    } else {
                        setStage(20);
                    }
                }
                if(stage > 19 && stage < 30){
                    let updateTarget = {
                        playerid: playerid
                    }
                    updateTarget.ship = shipInfo
    
                    setTarget(target => ({
                        ...target,
                        ...updateTarget
                    }));
                    input.className = `${input.className} session-target`;
                    setStage(30);
                }
            } else {
                if(input.className.indexOf('target') > -1) {
                    setTarget(target => ({...starterShip}))
                    setStage(20);
                } else {
                    setAttacker(target => ({...starterShip}))
                    setStage(10);
                }
                input.className = 'ship-card';
                input.removeAttribute('disabled');
            }
        }
    };

    useEffect(() => {
        console.log(records)
        /* stage 30 -35 */
        if(stage > 29 && stage < 40){
            if(stage === 30 && attacker?.ship?.name && target?.ship?.name){
                setStage(35);
            }
        }
        /* stage 40 */
        if(stage > 39 && stage < 50){
            if(records?.length === count-1) {
                let current = findInternal(internals[count-1]);
                setRecords([...records,current])
            }
        }
        /* stage 50 */
        if(stage > 49 && !!records?.length){
            setSessionReport([compileReport()]);
        }

        function findInternal(input){
            let result;
            let roll = input.total
            let col = 0;

            while(daa[roll][col].by === 1 || !!none.includes(daa[roll][col].nm)) col++

            result = {internal:daa[roll][col],roll:input};

            if(!!result.internal.uq){
                setDaa(updateDAA(roll,col));
            }
            return result;
        }
        function updateDAA (roll,col){
            return daa.map((item,index)=>{
                if(index === roll){
                    item.map((bypass,column) => {
                        if(column === col){
                            bypass.by = 1
                        }
                        return  bypass;
                    });
                }
                return item;
            })
        }
        function compileReport(){
            const allRolls = records.map(record => record.roll.total);
            const allTypes = records.map(record => record.internal.ty)
            const result = {
                roll:{
                    most:findMostFrequent(allRolls),
                    average:findAverage(allRolls),
                    total:allRolls.length
                },
                internals:{
                    control:findNumberOf(allTypes,'control'),
                    weapon:findNumberOf(allTypes,'weapon'),
                    power:findNumberOf(allTypes,'power'),
                    superstructure:findNumberOf(allTypes,'superstructure'),
                    system:findNumberOf(allTypes,'system'),
                    most:findMostFrequent(records.map(record=>record.internal.nm)),
                    obliterated:(none.length)?oxford.format(none):['none']
                }
            };

            function findMostFrequent(arr) {
                const hashmap = arr.reduce( (acc, val) => {
                    acc[val] = (acc[val] || 0 ) + 1
                    return acc
                },{})
                return Object.keys(hashmap).filter(x => {
                    return hashmap[x] === Math.max.apply(null,Object.values(hashmap))
                })
            }

            function findAverage(arr){
                let t = 0;
                for (let i = 0; i < arr.length; i++) {
                    t += arr[i];
                }
                return Number((t/arr.length).toFixed(2));
            }

            function findNumberOf(arr,locate){
                const found = arr.filter((item)=>item===locate);
                return found.length;
            }

            return result;
        };
    },[stage,attacker,target,count,internals,records,daa,none]);

    const props = {
        internalsList:{records:records,internals:internals,count:count,clicks:clickEvents},
        playerInterface:{players:players, click:clickEvents.ship}
    };

    return(
        <>
            <SEO title={`Session`}/>
            <p>Dexie Test</p>
            <h1>Stage is: {`${stage}`}</h1>
            {/* app loaded, let's start */}
            {!isLoading &&
                <>
                {/* stage is 30 */}
                {stage > 29 && stage < 40 && attacker?.ship?.name && target?.ship?.name &&
                    <div className='damage-input'>
                        <p><span className='damage-input-name attacker-name'>{attacker?.ship?.name}</span> is attacking <span className='damage-input-name target-name'>{target?.ship?.name}</span></p>
                        <Form.Control
                            id='total-damage'
                            tabIndex={-1}
                            autoFocus={true}
                            type='number'
                            placeholder='Number of Internals Inflicted on Target'
                            onKeyPress={(e) => { if(e.key === 'enter' || e.charCode === 13){ handleDamage(e.target)}}}
                        />
                        <Button
                            as='button'
                            variant='danger'
                            onClick={(e) => handleDamage(e.target.previousElementSibling)}
                        >
                            See Internals
                        </Button>
                    </div>
    
                }
                {/* stage is 10 - 35 */}
                {stage < 40 && !!players?.length &&
                    <PlayerInterface {...props.playerInterface}/>
                }
                {/* stage is 40 */}
                {stage > 39 && stage < 50 &&
                    /*
                        run the damage allocation loop
                    */
                   <InternalsList {...props.internalsList} />
                }
                {/* stage is 50 */}
                {stage > 49 && stage < 60 && !!sessionReport?.length &&
                    <div className='session-report'>
                        <h2>Session Report</h2>
                        <span className='close' onClick={clickEvents.close}>&times;</span>
                        <p>Attacker, {attacker.ship.name}, made these rolls:</p>
                        <Table responsive striped bordered variant='dark'>
                            <tbody>
                                <tr>
                                    <td>Total Rolls</td>
                                    <td>{sessionReport[0].roll.total}</td>
                                </tr>
                                <tr>
                                    <td>Average Roll</td>
                                    <td>{sessionReport[0].roll.average}</td>
                                </tr>
                                <tr>
                                    <td>Most Rolled</td>
                                    <td>{oxford.format(sessionReport[0].roll.most)}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <p>Defender, {target.ship.name}, took these hits:</p>
                        <Table responsive striped bordered variant='dark'>
                            <tbody>
                                <tr>
                                    <td>Control Hits</td>
                                    <td>{sessionReport[0].internals.control}</td>
                                </tr>
                                <tr>
                                    <td>Weapon Hits</td>
                                    <td>{sessionReport[0].internals.weapon}</td>
                                </tr>
                                <tr>
                                    <td>Power Hits</td>
                                    <td>{sessionReport[0].internals.power}</td>
                                </tr>
                                <tr>
                                    <td>System Hits</td>
                                    <td>{sessionReport[0].internals.system}</td>
                                </tr>
                                <tr>
                                    <td>Structural Hits</td>
                                    <td>{sessionReport[0].internals.superstructure}</td>
                                </tr>
                                <tr>
                                    <td>Most Internals Hit</td>
                                    <td>{oxford.format(sessionReport[0].internals.most)}</td>
                                </tr>
                                <tr>
                                    <td>Obliterated Internals</td>
                                    <td>{oxford.format(sessionReport[0].internals.obliterated)}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                }
                </>
            }
            {/* waiting for app to load */}
            {!!isLoading && 
                <p>App Loading...</p>
            }
        </>
    );
};

export default Session;