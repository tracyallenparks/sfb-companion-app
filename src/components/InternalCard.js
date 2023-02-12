import Dice from "./Dice";
import { oxford } from "../hooks/useOxford";
import '../css/Dice.css';
import '../css/InternalCard.css';

const InternalCard = (props) => { 
    const alternateLists = {
        'Aft Hull':{
            list:['Rear Hull','Center*'],
            rule:'D4.351',
            disclaimer:'*if no other hull of type present.'
        },
        'Drone':{
            list:['ADD','Drone Rack','ESG','Hellbore','PA Panel','PPD','Web Caster']
        },
        'Excess Damage':{
            list:['Cargo'],
            rule:'D4.36'
        },
        'Forward Hull':{
            list:['Center*'],
            rule:'D4.351',
            disclaimer:'*if no other hull of type present.'
        },
        'Phaser':{
            list:['SFG*'],
            rule:'D4.323',
            disclaimer:'*can only be taken once per volley.'
        },
        'Torpedo':{
            list:['Disruptor','Fusion Beam','Photon Torpedo','Plasma Torpedo','Plasma-D Rack','TR Beam'],
            rule:'D4.323'
        }
    }
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
                <div className="internal-result-name">{props.internal.nm}</div>
                {/* place extra info here */}
                <div className="internal-info-additional">
                {!!alternateLists?.[props.internal.nm] && 
                <>
                    {!!alternateLists?.[props.internal.nm]?.list &&
                    <div className="internal-alternate">
                        <div className="may-include">This may include:</div>
                        {oxford.format(alternateLists[props.internal.nm].list)}
                    </div>
                    }
                    {!!alternateLists?.[props.internal.nm]?.rule &&
                    <div className="internal-card-rule-lookup">
                        <span className="rule-intro">See rule:</span> <span className="rule">{alternateLists[props.internal.nm].rule}</span>
                    </div>
                    }
                    {!!alternateLists?.[props.internal.nm]?.disclaimer &&
                    <div className="internal-card-disclaimer">
                        {alternateLists[props.internal.nm].disclaimer}
                    </div>
                    }
                </>
                }

                {/*((props.internal.nm === 'Drone' && !(props.droneCount%3)) ||
                (props.internal.nm === 'Phaser' && !(props.phaserCount%3)) ||
                (props.internal.nm === 'Torpedo' && !(props.torpedoCount%3))) &&
                    <div className="third-rule">Must be <strong>best type</strong> See rule: (D4.322)</div>
                */}
                {!!props?.needThirdRule &&
                    <div className="third-rule">Must be <strong>best type</strong> See rule: (D4.322)</div>
                }
                </div>
            </div>
        </div>
    )
}
export default InternalCard;