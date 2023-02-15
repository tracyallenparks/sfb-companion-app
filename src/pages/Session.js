import SEO from '../components/SEO';
import { cards, rollDice } from '../data/core';
import { useState, useEffect } from "react";
import { db } from '../hooks/useSession';
import { oxford } from '../hooks/useOxford';
import { average, mostFrequent, quantity } from '../hooks/useFind';
import { useNavigate } from 'react-router-dom';
import { useLiveQuery } from "dexie-react-hooks";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PlayerInterface from '../components/PlayerInterface';
import InternalsList from '../components/InternalsList';
import SessionReport from '../components/SessionReport';
import StagePlaque from '../components/StagePlaque';
import '../css/Session.css';

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
    let navigate = useNavigate();
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
            internalsNone:[],
            status:'active'
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
                internalsNone:[],
                status:'active'
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

    const saveReport = () => {
        const updateShip = async (input) => {
            try {
                const playerID = parseInt(input.playerid);
                const player = await db.players.where('id').equals(playerID).toArray();
                const currentShips = player[0].ships;
                const updatedShips = currentShips.map((current)=>{
                    if(current.name === input.ship.name){
                        current.internalsTaken = [...current.internalsTaken,...input.ship.internalsTaken];
                        current.internalsGiven = [...current.internalsGiven,...input.ship.internalsGiven];
                        current.internalsNone = [...current.internalsNone,...input.ship.internalsNone];
                        current.rolls = [...current.rolls,...input.ship.rolls];
                        current.status = input.ship.status;
                    }
                    return current;
                })
                await db.players.update(playerID,{ships:[...updatedShips]})
                
            } catch (error) {
                console.error(`Failed to add ${input.value}: ${error}`);
            }
        }

        const allInternals = records.map(record=>record.internal);
        const allRolls = records.map(record=>record.roll);
        if(attacker?.playerid && parseInt(attacker.playerid) !== 1999){
            attacker.ship.rolls = [...allRolls];
            attacker.ship.internalsGiven = [...allInternals];
            updateShip(attacker);
        }
        if(target?.playerid && target?.ship){
            target.ship.internalsNone = [...none];
            target.ship.internalsTaken = [...allInternals];
            updateShip(target);
        }
    };

    const clickEvents = {
        none:(ele) => {
            if(ele.getAttribute('internal') === 'Excess Damage'){
                // ship go boom.
                // set ship.status to 'boom'
                target.ship.status = 'boom';
                setStage(50);
                saveReport();
            } else {
                setNone([...none,ele.getAttribute('internal')]);
                const updateRecords = records.filter((record,index)=> index !== records.length-1);
                setRecords([...updateRecords])
            }
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
            saveReport();
        },
        edit:() => {
            console.log(`EDIT`);
        },
        close:() => {
            console.log(`CLOSE`);
            setStage(10);
            /* reset states */
            /* handles logic bug where states persist */
            setDaa(cards)
            setCount(1)
            setRecords([])
            setNone([])
        },
        exitInternals:() => {
            //ask to save?
            //saveReport();
            //else...

            setStage(10);
            /* reset states */
            /* handles logic bug where states persist */
            setDaa(cards)
            setCount(1)
            setRecords([])
            setNone([])
        },
        ship: async (input) => {
            const playerid = parseInt(input.getAttribute('playerid'));
            const shipid = parseInt(input.getAttribute('shipid'));
            if(!input.getAttribute('selected')){
                input.setAttribute('selected',true);
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
                input.removeAttribute('selected');
            }
        }
    };

    useEffect(() => {
        /* stage 30 -35 */
        if(stage > 29 && stage < 40){
            if(stage === 30 && attacker?.ship?.name && target?.ship?.name){
                setStage(35);
                window.sessionStorage.droneCount = 0;
                window.sessionStorage.phaserCount = 0;
                window.sessionStorage.torpedoCount = 0;
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
            console.log(records)
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
                    most:mostFrequent(allRolls),
                    average:average(allRolls),
                    total:allRolls.length
                },
                internals:{
                    control:quantity(allTypes,'control'),
                    weapon:quantity(allTypes,'weapon'),
                    power:quantity(allTypes,'power'),
                    superstructure:quantity(allTypes,'superstructure'),
                    system:quantity(allTypes,'system'),
                    most:mostFrequent(records.map(record=>record.internal.nm)),
                    obliterated:(none.length)?oxford.format(none):['none']
                }
            };

            return result;
        };
    },[stage,attacker,target,count,internals,records,daa,none]);

    const props = {
        internalsList:{records,internals,count,clicks:clickEvents},
        playerInterface:{players, stage, click:clickEvents.ship},
        sessionReport:{attacker,target,click:clickEvents.close,sessionReport:sessionReport[0]}
    };

    return(
        <>
            <SEO title={`Session`}/>
            <StagePlaque stage={stage} />
            {/* app loaded, let's start */}
            <h1>
                {stage < 21 &&
                    <>Select {((stage === 10)?`Attacker`:`Defender`)}</>
                }
                {stage > 20 && stage < 40 &&
                    <>Enter Number of Internals</>
                }
            </h1>
            {stage < 40 && !!players?.length &&
                <Button 
                    as='button'
                    variant='link'
                    className='internals-exit'
                    onClick={() => navigate('/report')}
                >
                    Game Report
                </Button>
            }
            {stage > 39 && stage < 50 &&
                <Button 
                    as='button'
                    variant='link'
                    className='internals-exit'
                    onClick={clickEvents.exitInternals}
                >
                    Exit
                </Button>
            }
            <div className='internals-interface'>
            {!isLoading &&
                <>
                {/* stage is 10 - 35 */}
                {stage < 40 && !!players?.length &&
                    
                    <PlayerInterface {...props.playerInterface}/>
                }
                
                {/* stage is 30 */}
                {stage > 29 && stage < 40 && attacker?.ship?.name && target?.ship?.name &&
                    <div className='damage-input'>
                        <p><span className='damage-input-name attacker-name'>{attacker?.ship?.name}</span> is attacking <span className='damage-input-name target-name'>{target?.ship?.name}</span></p>
                        <div className='internal-input-form'>
                            <Form.Control
                                id='total-damage'
                                tabIndex={-1}
                                autoFocus={true}
                                type='number'
                                placeholder='Number of Internals'
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
                    </div>
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
                    <SessionReport {...props.sessionReport}/>
                }
                </>
            }
            {/* waiting for app to load */}
            {!!isLoading && 
                <p>App Loading...</p>
            }
            </div>
        </>
    );
};

export default Session;