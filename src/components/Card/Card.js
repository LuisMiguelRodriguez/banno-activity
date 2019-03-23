import React from 'react';
import { Card, Button, ProgressBar } from 'react-bootstrap';


/** 
* 
* Card Component
*
* @function Card
* @description - A function component used to display information passed down by props.
* @param { Object } props - Props that will be passed down from parent component.
* @param { String } props.activity - The name of the activity to display. 
* @param { Function } props.onClickHandler - The function that has been passed to run a speficic task.
* @param { String } props.result - A string representing the results create by the onClickHandler that was invoked. 
* @param { Array } props.array - An array of results to map through.
*/

export default props => {

    return (
        <Card bg='light' className="text-center">
            <Card.Body >
                <Card.Title>Activity - {props.activity}</Card.Title>
                <Button onClick={props.onClickHandler} variant="primary">Run Activity</Button>
            </Card.Body>
            <Card.Footer className="text-primary">{props.result ? props.result : ''}</Card.Footer>
            {props.array ? props.array.map((item, i) => {
                return (
                        // eslint-disable-next-line
                    <Card.Footer className="text-primary" key={i}>
                        <h5>{`AlphaNumeric: ${item.alpha}  Count: ${item.count}`}</h5>
                        <ProgressBar now={item.count} />
                    </Card.Footer>
                )
            }) : <h1>...</h1>}
        </Card>
    )
}
