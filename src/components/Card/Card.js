import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default props => {

    // const handleAlphaNumerics = props;

    return (
        <Card className="text-center">
            <Card.Body>
                <Card.Title>Activity # {props.activity}</Card.Title>
                <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
      </Card.Text>
                <Button onClick={props.onClickHandler} variant="primary">Run Activity</Button>
            </Card.Body>
            <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
    )
}
