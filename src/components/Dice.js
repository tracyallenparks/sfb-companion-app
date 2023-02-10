const Dice = ({props}) => {
    return  (
    <div className="dice" data-set={props}>
        <div className="pip-column">
            <span className="pip pip-four pip-five pip-six"></span>
            <span className="pip pip-six"></span>
            <span className="pip pip-two pip-three pip-four pip-five pip-six"></span>
        </div>
        <div className="pip-column">
            <span className="pip pip-blank"></span>
            <span className="pip pip-one pip-three pip-five"></span>
            <span className="pip pip-blank"></span>
        </div>
        <div className="pip-column">
            <span className="pip pip-two pip-three pip-four pip-five pip-six"></span>
            <span className="pip pip-six"></span>
            <span className="pip pip-four pip-five pip-six"></span>
        </div>
    </div>
    )
};

export default Dice;