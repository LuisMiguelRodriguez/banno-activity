import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default props => {
    
    return (
        <Card className="text-center">
            <Card.Body>
                <Card.Title>Activity - {props.activity}</Card.Title>
                <Button onClick={props.onClickHandler} variant="primary">Run Activity</Button>
            </Card.Body>
            <Card.Footer className="">{props.result ? props.result : ''}</Card.Footer>
            {props.array ? props.array.map((item, i )=> {
                return <Card.Footer className="" key={i}>{`AlphaNumeric: ${item.alpha}  Count: ${item.count}`}</Card.Footer>
            }) : <h1></h1>}
        </Card>
    )
}
