import '../css/ShipCard.css';

export function ShipCard(props) {
    return (
        <div className="ship-card" playerid={props.player.id} shipid={props.shipid} disabled={props.ship.status === 'boom'?true:false} onClick={props.ship.status === 'boom'?undefined:(e)=>props.click(e.target.closest('.ship-card'))}>
            <div className="ship-name" disabled={props.ship.status === 'boom'?true:false}>{props.ship.name}</div>
        </div>
    );
}