import React, {useState} from 'react';
import {Card, Row, Col} from 'react-bootstrap';
import {useQuery} from '@apollo/client';

// Components
import BookDetail from './BookDetail';

// Queries
import {getBooks} from '../graphql-client/queries';

const BookList = () => {
  // state
  const [bookIdSelected, setBookIdSelected] = useState(null);

  // query
  const {loading, error, data} = useQuery(getBooks);

  if (loading) return <p>Loading books ...</p>
  if (error) return <p>Get books error</p>
  const {books} = data;

  const handleShowBookDetail = (id) => setBookIdSelected(id);

  return (
    <Row>
      <Col xs={8}>
        <Row xs={1} md={2}>
          {
            books.map(book => (
              <Col key={book.id} className='p-1'>
                <Card
                  border='info'
                  text='info'
                  className='text-center shadow'
                  onClick={() => handleShowBookDetail(book.id)}
                >
                  <Card.Body>{book.name}</Card.Body>
                </Card>
              </Col>
            ))
          }
        </Row>
      </Col>

      <Col xs={4}>
        {bookIdSelected && <BookDetail bookId={bookIdSelected} />}
      </Col>
    </Row>
  );
}

export default BookList;
