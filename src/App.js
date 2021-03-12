import './App.scss';
import axios from 'axios';
import Form from './Form.js';
import { useState } from 'react';
import Results from './Results.js';

function App() {
  const [userInput, setUserInput] = useState('');
  const [movie, setMovie] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/search/movie?`,
      dataResponse: 'JSON',
      params: {
        format: 'JSON',
        query: userInput,
        api_key: '6f113bf7cccb0c0c911600f2963a2df4',
        include_adult: false,
        language: 'en-US'
      }
    }).then(response => {

      const movieObject = response.data.results[0];

      setMovie(movieObject)
      // the title that gets sent to the book api
      const title = response.data.results[0].title;

      console.log(movieObject)
        axios({
        method: 'GET',
        url: `https://www.googleapis.com/books/v1/volumes?`,
        dataResponse: 'JSON',
        params: {
          format: 'JSON',
          q: title,
          Key: 'AIzaSyDDrPYFlXLLrSfJCd7qoXhe1GqUiPj5PQg'
        }
      }).then(response => {
        const bookResults = response.data.items[0].volumeInfo
        console.log(bookResults)
      });
    });
  }

  return (
    <div className="App">
      <h1>Is the book better?</h1>
      <Form userInput={userInput} handleSubmit={handleSubmit} setUserInput={setUserInput}/>

      <Results movie={movie} />
    </div>
  );
}

export default App;
