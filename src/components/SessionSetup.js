import SEO from './SEO';
import PlayersList from './PlayersList'
import { useState } from "react";
import { db } from '../hooks/useSession';
import { useNavigate } from 'react-router-dom';
import { ButtonEngage } from '../components/ButtonEngage';
import { useLiveQuery } from "dexie-react-hooks";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../css/SessionSetup.css';

const  SessionSetup = ({title}) => {
    const navigate = useNavigate();
    const players = useLiveQuery(
        async () => {
            const players = await db.players
                .toArray();
            setIsLoading(false);
            return players;
        }
    );

    const [isLoading,setIsLoading] = useState(true);

    const clickEvents = {
        submit: () => {
            let formError = false;
    
            const addPlayerInput = document.querySelector('#inputAddPlayer');
            if(players.length > 1){
                formError = false;
                addPlayerInput.classList.remove('error');
                players.forEach(player => {
                    const input = document.querySelector(`.add-ship-input[playerid="${player.id}"]`);
                    if(player?.ships.length < 1) {
                        formError = true;
                        if(input) {
                            input.classList.add('error');
                            input.placeholder = 'Please add ship for player';
                        }
                    } else {
                        if(input) {
                            input.classList.remove('error');
                            input.placeholder = 'Ship Name';
                        }
                    }
                });
    
            } else {
                formError = true;
                addPlayerInput.placeholder = 'Please have at least 2 players'
                addPlayerInput.classList.add('error');
            }
    
            if(!formError) {
                navigate(`/session/`);
            }
        },
        player:{
            add: async (input) => {
                if(input?.value && input.value !== ''){
                    input.classList.remove('error');
                    try {
                        await db.players.add({
                            name:input.value,
                            ships:[]
                        });
                        input.value = '';
                    } catch (error) {
                        console.error(`Failed to add ${input.value}: ${error}`)
                        input.classList.add('error');
                        input.placeholder = `Failed to add ${input.value}: ${error}`;
                    }
                } else {
                    input.classList.add('error');
                }
            },
            remove: async (input) => {
                if(input?.getAttribute('playerid')){
                    try {
                        await db.players.delete(parseInt(input.getAttribute('playerid')));
                    } catch (error) {
                        console.error(`Failed to remove ${input.value}: ${error}`)
                    }
                }
            }
        },
        ship:{
            add: async (input) => {
                if(input?.value && input.value !== ''){
                    input.classList.remove('error');
                    input.placeholder = 'Ship Name';
                    try {
                        const shipTemplate= {
                            name:input.value,
                            internalsTaken:[],
                            internalsGiven:[],
                            internalsNone:[],
                            rolls:[],
                            status:'active'
                        }
        
                        const playerID = parseInt(input.getAttribute('playerid'));
                        const player = await db.players.where('id').equals(playerID).toArray();
                        const currentShips = player[0].ships;
        
                        await db.players.update(playerID,{ships:[...currentShips,shipTemplate]})
                        
                        input.value = '';
                    } catch (error) {
                        console.error(`Failed to add ${input.value}: ${error}`);
                        input.classList.add('error');
                        input.placeholder = `Failed to add ${input.value}: ${error}`;
                    }
                } else {
                    input.classList.add('error');
                }
            },
            remove: async (input) => {
                if(input?.getAttribute('playerid')){
                    try {
                        const shipName = input.innerText;
                        const playerID = parseInt(input.getAttribute('playerid'));
                        const player = await db.players.where('id').equals(playerID).toArray();
                        const currentShips = player[0].ships;
                        const newCurrentShips = currentShips.filter((ship)=>{return ship.name !== shipName})
        
                        await db.players.update(playerID,{ships:[...newCurrentShips]})
                        
                    } catch (error) {
                        console.error(`Failed to remove ${input.innerText}: ${error}`)
                    }
                }
            }
        }
    };

    const props = {
        playerList:{players:players, clicks:clickEvents}
    }

    return (
        <>
            <SEO 
                title={title}
            />
            <h1>{title}</h1>
            <div className='session-interface'>
                <div className="session-input-container">
                    <div className='add-player-form'>
                        <Form.Control
                            id='inputAddPlayer'
                            placeholder='Add Player'
                            onKeyPress={(e) => { if(e.key === 'enter' || e.charCode === 13){ clickEvents.player.add(e.target)}}}
                        />
                        <Button
                            as='button'
                            variant='outline-dark'
                            onClick={(e) => clickEvents.player.add(e.target.previousElementSibling)}
                        >
                            +
                        </Button>
                    </div>
                    
                    {!isLoading && !!players?.length &&
                        <>
                        <PlayersList {...props.playerList}/>
                        
                        {players.length > 1 && 
                            <ButtonEngage props={clickEvents.submit} />
                        }
                        </>
                    }
                </div>
            </div>
        </>
    );
}

export default SessionSetup;