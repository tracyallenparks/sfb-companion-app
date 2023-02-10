import SEO from '../components/SEO';
import { db } from '../hooks/useSession';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLiveQuery } from "dexie-react-hooks";
import { oxford } from '../hooks/useOxford';
import Button from 'react-bootstrap/Button';

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

            <p>Dexie Test</p>
            <h1>My simple Dexie app</h1>

            {!isLoading && !!(players?.length) &&
                <>
                    <p>{(players.length > 1 && enoughShips().qualified)?`looks like you have a session with ${players.length} players: ${oxford.format(players.map((player)=>{ return player.name }))}.`:`It seems you have an incomplete session setup with only ${players.length} player${(players.length !== 1)?`s`:``} and ${enoughShips().number} ship${(enoughShips().number !== 1)?`s`:``}.`}</p>

                    <p>Would you like to continue with this session or start a new one?</p>
                    <Button
                        as='button'
                        variant='outline-secondary'
                        onClick={handleNewSession}
                    >
                        New Session
                    </Button>
                    <Button
                        as='button'
                        variant='primary'
                        onClick={handleEditSession}
                    >
                        {(players.length > 1 && enoughShips().qualified)?`Continue Session`:`Edit Session`}
                    </Button>
                </>
            }
            {!isLoading && !(players?.length) &&
                <>
                    <p>Start a new session</p>
                    <Button
                        as='button'
                        variant='primary'
                        onClick={handleNewSession}
                    >
                        New Session
                    </Button>
                </>
            }
            {!!isLoading &&
                <p>Loading...</p>
            }
        </>
    );
}

export default Home;