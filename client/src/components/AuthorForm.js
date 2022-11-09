import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useMutation} from '@apollo/client';

// Queries
import {getAuthors} from '../graphql-client/queries';
import {addSingleAuthor} from '../graphql-client/mutation';

const AUTHOR_DEFAULT = {
  name: '',
  age: '',
};

const AuthorForm = () => {
  // state
  const [newAuthor, setNewAuthor] = useState(AUTHOR_DEFAULT);

  // Mutation
  const [addAuthor, dataMutation] = useMutation(addSingleAuthor);

  const onInputChangeBook = (e) => {
    const {target} = e;
    const {name, value} = target;
    setNewAuthor({
      ...newAuthor,
      [name]: value
    });
  };

  const onSubmitAddAuthor = async (e) => {
    e.preventDefault();

    const {name, age} = newAuthor;
    await addAuthor({
      variables: {
        name,
        age: +age
      },
      refetchQueries: [
        {query: getAuthors}
      ]
    });

    setNewAuthor(AUTHOR_DEFAULT);
  };

  return (
    <Form onSubmit={onSubmitAddAuthor}>
      <Form.Group className='mb-2'>
        <Form.Control
          name='name'
          type='text'
          placeholder='Author name'
          onChange={onInputChangeBook} value={newAuthor.name}
        />
      </Form.Group>

      <Form.Group className='mb-2'>
        <Form.Control
          name='age'
          type='number'
          placeholder='Author age'
          onChange={onInputChangeBook} value={newAuthor.age}
        />
      </Form.Group>

      <Button className='float-end' variant='info' type='submit'>Add Author</Button>
    </Form>
  );
}

export default AuthorForm;
