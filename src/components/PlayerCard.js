import { ShipCard } from '../components/ShipCard';

export function PlayerCard(props) {
    return (
        <div className="player-card" playerid={props.player.id}>
            <div className="player-name">{props.player.name}</div>
            {props.player.ships?.length &&
                <div className='ship-list'>
                    {props.player.ships.map((ship,index) => {
                        const shipProps = { key:index, player:props.player, ship:ship, shipid:index, click:props.click };
                        return <ShipCard {...shipProps}/>
                    })}
                </div>
            }
        </div>
    );
}