import SEO from '../components/SEO';
import { db } from '../hooks/useSession';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLiveQuery } from "dexie-react-hooks";
import Button from 'react-bootstrap/Button';
import '../css/Home.css';

const  Home = () => {
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

    const handleEditSession = () => {
        navigate(`edit-session/`);
    };
    const handleNewSession = () => {
        if(players?.length){
            players.forEach(player=>db.players.delete(player.id));
        }
        navigate(`new-session/`);
    };

    const enoughShips = () => {
        let result = { number:0,qualified:false};
        if(players.length){
            players.forEach(player => {
                if(!!player?.ships?.length){
                    result.number++;
                    result.qualified = true;
                } else {
                    result.qualified = false;
                }
            });
        }
        return result;
    }

    return (
        <>
            <SEO />
            <div className='info-form'>
                {!isLoading && !!(players?.length) &&
                    <>
                        {players.length > 1 && enoughShips().qualified && 
                            <>
                            <p>Looks like you have a session with {players.length} players:</p>
                            <ul>
                                {players.map((player)=>{ return <li key={player.name}>{player.name}</li> })}
                            </ul>
                            </>
                        }
                        {players.length <= 1 && !enoughShips().qualified &&
                            <p>It seems you have an incomplete session setup with only {players.length} player${(players.length !== 1)?`s`:``} and {enoughShips().number} ship${(enoughShips().number !== 1)?`s`:``}.`</p>
                        }
                        <p>Would you like to continue with this session or start a new one?</p>
                        <div className='button-set'>
                            <Button
                                as='button'
                                variant='outline-secondary'
                                className='session-button'
                                onClick={handleNewSession}
                            >
                                New Session
                            </Button>
                            <Button
                                as='button'
                                variant='primary'
                                className='session-button'
                                onClick={handleEditSession}
                            >
                                {(players.length > 1 && enoughShips().qualified)?`Continue Session`:`Edit Session`}
                            </Button>
                        </div>
                    </>
                }
                {!isLoading && !(players?.length) &&
                    <>
                        <p>Start a new session</p>
                        <Button
                            as='button'
                            variant='primary'
                            className='session-button'
                            onClick={handleNewSession}
                        >
                            New Session
                        </Button>
                    </>
                }
                {!!isLoading &&
                    <p>Loading...</p>
                }
            </div>
        </>
    );
}

export default Home;