const BreakdownRow = (props) => {
    return (
        <tr>
            <td>{props.nt}</td>
            <td className='total'>{props.item.internals[props.ir][props.gt][props.nt].count}</td>
            <td className='percent'>
                <div className='percent-progress' style={{width:`${props.item.internals[props.ir][props.gt][props.nt].percent}%`}}></div>
                {props.item.internals[props.ir][props.gt][props.nt].percent}%
            </td>
        </tr>
)};
export default BreakdownRow;