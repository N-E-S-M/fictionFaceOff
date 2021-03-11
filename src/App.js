import './App.scss';
import axios from 'axios';
import Form from './Form.js';
import { useState } from 'react';

function App() {
  const [userInput, setUserInput] = useState('');

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
      const title = response.data.results[0].title;
      console.log('Movie: ', title);
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
        const bookTitle = response.data.items[0].volumeInfo.title;
        console.log('Book: ', bookTitle);
      });
    });
  }

  return (
    <div className="App">
      <h1>Is the book better?</h1>
      <Form userInput={userInput} handleSubmit={handleSubmit} setUserInput={setUserInput}/>
    </div>
  );
}

export default App;
