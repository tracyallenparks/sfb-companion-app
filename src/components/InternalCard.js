import Dice from "./Dice";
import '../css/Dice.css';
import '../css/InternalCard.css';

const InternalCard = (props) => { 
    
    return(
        <div key={props.index} className="internal-info">
            <div className="internal-header">Internal Number: {props.index}</div>
            <div className='internal-roll'>
                <div className='dice-set'>
                    <Dice props={props.d1} />
                    <Dice props={props.d2} />
                </div>
                <div className="roll-total">
                    <span className="roll-total-text">Roll:</span>
                    <span className="roll-total-number">{props.total}</span>
                </div>
            </div>
            <div className="internal-result">
                {props.internal.nm}
            </div>
        </div>
    )
}
export default InternalCard;