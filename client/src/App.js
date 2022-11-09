import {Container} from 'react-bootstrap';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

// Components
import BookList from './components/BookList';
import Forms from './components/Forms';

// Initialization graphQL client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <ApolloProvider
      client={client}
    >
      <Container
        className='py-3 mt-3'
        style={{backgroundColor: 'lightcyan'}}
      >
        <h1 className='text-center text-info mb-3'>My Books</h1>
        <hr/>

        <Forms/>

        <hr/>
        <BookList/>
      </Container>
    </ApolloProvider>
  );
}

export default App;
