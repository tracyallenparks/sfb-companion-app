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
                {props.stage === 10 && 
                    <div className="player-card entity-card" playerid="1999"  shipid='1999' onClick={(e) => {props.click(e.target.closest('.entity-card'))}}>
                        <div className="player-name entity-name">Non-Player Entity<sup>*</sup></div>
                    </div>
                }
            </div>
        {props.stage === 10 &&
            <div className='entity-disclaimer'>
                <sup>*</sup>Non-Player Entities:
                <ul>
                    <li>Non-Player Entities include anything that is <strong>not</strong> a player controlled ship or their respective player controlled elements (plasma, drones, scatter-packs, t-bombs, fighters, etc).</li>
                    <li>This could mean anything like environmental hazards (example: radiation zone), sentient entities (example: space monster), or anything that can cause damage to an actual player's ship that isn't listed as a player.</li>
                    <li>Non-Player Entities can only ever be chosen as the <strong>attacker</strong> with this companion app.</li>
                </ul>
            </div>
        }
        </div>
    )
};

export default PlayerInterface;