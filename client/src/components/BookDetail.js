import React from 'react';
import {Card} from 'react-bootstrap';
import {useQuery} from '@apollo/client';

// Queries
import {getSingleBook} from '../graphql-client/queries';

const BookDetail = (props) => {
  const {bookId} = props;

  // query
  const {loading, error, data} = useQuery(getSingleBook, {
    variables: {
      id: bookId
    },
    // skip query when param is null
    skip: bookId === null
  });

  if (loading) return <p>Loading book ...</p>
  if (error) return <p>Get book error</p>
  const {book} = data;

  return (
    <Card bg='info' text='white' className='shadow p-4'>
      <Card.Title>{book?.name}</Card.Title>
      <Card.Subtitle>{book?.genre}</Card.Subtitle>
      <>
        <p>{book?.author?.name}</p>
        <p>Age: {book?.author?.age}</p>
        <p>All Book by this author</p>
        <ul>
          {
            book?.author?.books?.map((bookTmp, bookIndex) => (
              <li key={bookIndex}>{bookTmp.name}</li>
            ))
          }
        </ul>
      </>
    </Card>
  );
}

export default BookDetail;
