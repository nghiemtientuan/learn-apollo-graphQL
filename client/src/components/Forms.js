import React, {useState} from 'react';
import {Form, Button, Row, Col} from 'react-bootstrap';
import {useQuery, useMutation} from '@apollo/client';

// Components
import AuthorForm from './AuthorForm';

// Queries
import {getAuthors, getBooks} from '../graphql-client/queries';
import {addSingleBook} from '../graphql-client/mutation';

const BOOK_DEFAULT = {
  name: '',
  genre: '',
  author_id: 0,
};

const Forms = () => {
  // state
  const [newBook, setNewBook] = useState(BOOK_DEFAULT);

  // query
  const {loading, error, data: authorData} = useQuery(getAuthors);
  let authors = [];
  if (!loading && !error) {
    authors = authorData.authors;
  }

  // Mutation
  // addBook - function call
  // dataMutation - data of mutation (called, client, data, loading)
  const [addBook, dataMutation] = useMutation(addSingleBook);

  const onInputChangeBook = (e) => {
    const {target} = e;
    const {name, value} = target;
    setNewBook({
      ...newBook,
      [name]: value
    });
  };
  
  const onSubmitAddBook = async (e) => {
    e.preventDefault();

    await addBook({
      variables: newBook,
      refetchQueries: [
        {query: getBooks}
      ]
    });

    setNewBook(BOOK_DEFAULT);
  };

  return (
    <Row>
      <Col>
        <Form onSubmit={onSubmitAddBook}>
          <Form.Group className='mb-2'>
            <Form.Control
              name='name'
              type='text'
              placeholder='Book name'
              onChange={onInputChangeBook}
              value={newBook.name}
            />
          </Form.Group>

          <Form.Group className='mb-2'>
            <Form.Control
              name='genre'
              type='text'
              placeholder='Book genre'
              onChange={onInputChangeBook}
              value={newBook.genre}
            />
          </Form.Group>

          <Form.Group className='mb-2'>
            {loading ? <p>Loading authors</p> : null}
            <Form.Control
              name='author_id'
              as='select'
              onChange={onInputChangeBook}
              value={newBook.author_id}
            >
              <option disabled value={0}>Select author</option>
              {
                authors.map(author => (
                  <option key={author.id} value={author.id}>{author.name}</option>
                ))
              }
            </Form.Control>
          </Form.Group>

          <Button className='float-end' variant='info' type='submit'>Add Book</Button>
        </Form>
      </Col>

      <Col>
        <AuthorForm />
      </Col>
    </Row>
  );
}

export default Forms;
