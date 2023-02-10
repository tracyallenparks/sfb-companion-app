export function ShipCard(props) {
    return (
        <div className="ship-card" playerid={props.player.id} shipid={props.shipid} onClick={(e)=>props.click(e.target.closest('.ship-card'))}>
            <div className="ship-name">{props.ship.name}</div>
        </div>
    );
}