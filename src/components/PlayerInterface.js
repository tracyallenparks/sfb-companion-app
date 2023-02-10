import { PlayerCard } from "./PlayerCard";

const PlayerInterface = (props) => {
    return  (
        <div className='player-interface'>
            <div className='player-list'>
            {
                props.players.map((player) => {
                    const playerProps = {key:player.id, player: player, click:props.click};
                    return <PlayerCard {...playerProps} />
                })
            }
            </div>
            <div className='entity-list'>
                <div className='entity-card' playerid='1999' shipid='1999' onClick={(e) => {props.click(e.target.closest('.entity-card'))}}>
                    <div className='entity-name'>Non-Player Entity<sup>*</sup></div>
                </div>
            </div>
            <p className='entity-disclaimer'>*Non-Player Entities include anything that is not a player controlled ship or their respective player controlled elements (scatter-packs, t-bombs, fighters, etc). This could mean anything like environmental hazards (example: radiation zone), sentient entities (example: space monster), or anything that can cause damage to an actual player's ship that isn't listed as a player.</p>
        </div>
    )
};

export default PlayerInterface;