import Button from 'react-bootstrap/Button';

export function ButtonEngage({props}){
    
    return(
        <Button
            as='button'
            variant='success'
            onClick={(e)=>{props(e)}}
        >
            Engage
        </Button>
    );
}