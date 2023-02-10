import InternalCard from "./InternalCard";
import { Button } from "react-bootstrap";

const InternalsList = (props) => {
    return (
    <div className='internals-list'>
        {props.records?.length === props.count &&
            props.records.map((record,index)=>{
                const cardProps = { index: (index+1), total: record.roll.total, d1: record.roll.d1, d2: record.roll.d2, internal:record.internal};
                return (
                    <div key={`internal-card-${index}`} className="internal-card">
                        <InternalCard {...cardProps} />
                        <div className="internal-card-button-set">
                            {props.count-1 === index &&
                                <>
                                <Button
                                    key={`button-none-${index}`}
                                    className="internal-card-button button-none"
                                    as="button"
                                    variant="danger"
                                    internal={record.internal.nm}
                                    onClick={(e)=>props.clicks.none(e.target)}
                                >
                                    None
                                </Button>
                                
                                {props.internals.length === props.records.length &&
                                    <Button
                                        key={`button-report-${index}`}
                                        className="internal-card-button button-report"
                                        as="button"
                                        variant="primary"
                                        onClick={props.clicks.report}
                                    >
                                        Damage Report
                                    </Button>
                                }
                                {props.internals.length !== props.records.length &&
                                    <>
                                    <Button
                                        key={`button-last-${index}`}
                                        className="internal-card-button button-last"
                                        as="button"
                                        variant="warning"
                                        internal={record.internal.nm}
                                        onClick={(e)=>props.clicks.last(e.target)}
                                    >
                                        Last
                                    </Button>
                                    <Button
                                        key={`button-next-${index}`}
                                        className="internal-card-button button-next"
                                        as="button"
                                        variant="success"
                                        onClick={props.clicks.next}
                                    >
                                        Next
                                    </Button>
                                    </>
                                }
                                </>
                            }
                            {props.count-1 > index &&
                                <Button
                                    key={`button-edit-${index}`}
                                    className="internal-card-button button-edit"
                                    as="button"
                                    variant="outline-info"
                                    index={index}
                                    onClick={props.clicks.edit}
                                >
                                    Edit
                                </Button>
                            }
                        </div>
                    </div>
                )
            })
        }
    </div>
)};
export default InternalsList;