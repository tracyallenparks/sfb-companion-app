import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../css/PlayerList.css';

const PlayerList = (props) =>{ return(
    <div className='player-list'>
        {props.players.map((player) => {
            return (
                <div className='player-card-input' key={`player-${player.id}`} playerid={player.id}>
                    <div className='player-card-input-player'>
                        <h4 key={`player-name-${player.name}`} playerid={player.id} className='player-name'>{player.name}</h4>
                        
                        <Button
                            key={`remove-player-button-${player.id}`}
                            as='button'
                            variant='outline-light'
                            onClick={(e) => props.clicks.player.remove(e.target.previousElementSibling)}
                        >
                            -
                        </Button>
                    </div>
                    {!!player?.ships?.length && 
                        <div className='player-ship-list'>
                            {player.ships.map((ship) => { return(
                                <div key={`${player.id}-${ship.name}`} className='ship-entry' playerid={player.id}>
                                    <span key={`ship-name-${ship.name}`} className='ship-name'  playerid={player.id}>{ship.name}</span>
                                    <Button
                                        key={`remove-ship-button-${player.id}`}
                                        as='button'
                                        variant='outline-light'
                                        onClick={(e) => props.clicks.ship.remove(e.target.previousElementSibling)}
                                    >
                                        -
                                    </Button>
                                </div>
                            )})}
                        </div>
                    }
                    <div className='add-ship-form'>
                        <Form.Control
                            key={`add-ship-field-${player.id}`}
                            className='add-ship-input'
                            placeholder='Ship Name'
                            onKeyPress={(e) => { if(e.key === 'enter' || e.charCode === 13){ props.clicks.ship.add(e.target)}}}
                            variant='outline-light'
                            playerid={player.id}
                        />
                        <Button
                            key={`add-ship-button-${player.id}`}
                            className='add-ship-button'
                            as='button'
                            variant='outline-light'
                            onClick={(e) => props.clicks.ship.add(e.target.previousElementSibling)}
                        >
                            +
                        </Button>
                    </div>
                </div>
            )
        })}
    </div>
)};

export default PlayerList;