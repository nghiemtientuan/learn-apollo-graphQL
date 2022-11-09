import React from 'react';
import {Card, Row, Col} from 'react-bootstrap';

const BookList = () => {
    return (
        <Row>
            <Col xs={4}>
                <Card border='info' text='info' className='text-center shadow'>
                    <Card.Body>aaa</Card.Body>
                </Card>
                <Card border='info' text='info' className='text-center shadow'>
                    <Card.Body>aaa</Card.Body>
                </Card>
                <Card border='info' text='info' className='text-center shadow'>
                    <Card.Body>aaa</Card.Body>
                </Card>
                <Card border='info' text='info' className='text-center shadow'>
                    <Card.Body>aaa</Card.Body>
                </Card>
                <Card border='info' text='info' className='text-center shadow'>
                    <Card.Body>aaa</Card.Body>
                </Card>
            </Col>
            <Col>
            </Col>
        </Row>
    );
}

export default BookList;
