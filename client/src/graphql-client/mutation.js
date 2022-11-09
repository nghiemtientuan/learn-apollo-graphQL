import {gql} from '@apollo/client'

const addSingleBook = gql`
    mutation addSingleBookMutation($name: String, $genre: String, $author_id: ID!) {
        createBook(name: $name, genre: $genre, author_id: $author_id) {
            id
            name
            genre
        }
    }
`

const addSingleAuthor = gql`
    mutation addSingleAuthorMutation($name: String, $age: Int) {
        createAuthor(name: $name, age: $age) {
            id
            name
            age
        }
    }
`

export {addSingleBook, addSingleAuthor}
