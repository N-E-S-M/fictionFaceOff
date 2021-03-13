import "./App.scss";
import axios from "axios";
import Form from "./Form.js";
import { useState } from "react";
import ResultsSection from "./ResultsSection.js";
import BookChoice from "./BookChoice.js"

function App() {
  const [userInput, setUserInput] = useState("");
  const [results, setResults] = useState([
    {
      type: "movie",
      name: "",
      description: "",
      rating: "",
      img: "",
      altDescription: "",
      id: "1",
    },

    {
      type: "book",
      name: "",
      description: "",
      rating: "",
      img: "",
      altDescription: "",
      id: "2",
    },
  ]);
  const [searchMultipleBooks, setSearchMultipleBooks] = useState([]);
  const [bookButtonValue, setBookButtonValue] = useState('');
  const [returnedBooks, setReturnedBooks] = useState([]);
  const [returnedMovie, setReturnedMovie] = useState();

  const handleBookChoice = (clickedButton) => {
    setBookButtonValue(clickedButton);
    if (bookButtonValue !== '') {
      const matchedBook = returnedBooks.filter((item) => {
        return item.volumeInfo.title === bookButtonValue;
      })
      // console.log(matchedBook[0].volumeInfo.title);
      setResults([
        {
          type: "movie",
          name: returnedMovie.title,
          description: returnedMovie.overview,
          rating: Math.round(returnedMovie.vote_average / 2),
          img: `https://image.tmdb.org/t/p/w200${returnedMovie.poster_path}`,
          altDescription: `${returnedMovie.title} poster`,
          id: returnedMovie.id,
        },
  
        {
          type: "book",
          name: matchedBook[0].volumeInfo.title,
          description: matchedBook[0].volumeInfo.description,
          rating: matchedBook[0].volumeInfo.averageRating,
          img: matchedBook[0].volumeInfo.imageLinks.thumbnail,
          altDescription: `${matchedBook[0].volumeInfo.title} cover`,
          id: matchedBook[0].volumeInfo.industryIdentifiers[0].identifier,
        },
      ]);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchMultipleBooks([]);

    axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/search/movie?`,
      dataResponse: "JSON",
      params: {
        format: "JSON",
        query: userInput,
        api_key: "6f113bf7cccb0c0c911600f2963a2df4",
        include_adult: false,
        language: "en-US",
      },
    }).then((response) => {
      const movieObject = response.data.results[0];
      // console.log(movieObject);
      setReturnedMovie(movieObject);
      // the title that gets sent to the book api
      const title = response.data.results[0].title;

      // console.log(movieObject)
      axios({
        method: "GET",
        url: `https://www.googleapis.com/books/v1/volumes?`,
        dataResponse: "JSON",
        params: {
          format: "JSON",
          q: title,
          Key: "AIzaSyDDrPYFlXLLrSfJCd7qoXhe1GqUiPj5PQg",
        },
      }).then((response) => {
        // console.log(response.data.items);
        const bookObject = response.data.items[0].volumeInfo;

        if (title === bookObject.title) {
          setResults([
            {
              type: "movie",
              name: movieObject.title,
              description: movieObject.overview,
              rating: Math.round(movieObject.vote_average / 2),
              img: `https://image.tmdb.org/t/p/w200${movieObject.poster_path}`,
              altDescription: `${movieObject.title} poster`,
              id: movieObject.id,
            },

            {
              type: "book",
              name: bookObject.title,
              description: bookObject.description,
              rating: bookObject.averageRating,
              img: bookObject.imageLinks.thumbnail,
              altDescription: `${bookObject.title} cover`,
              id: bookObject.industryIdentifiers[0].identifier,
            },
          ]);
        } else if (title !== bookObject.title) {
          axios({
            method: "GET",
            url: `https://www.googleapis.com/books/v1/volumes?`,
            dataResponse: "JSON",
            params: {
              format: "JSON",
              q: title,
              Key: "AIzaSyDDrPYFlXLLrSfJCd7qoXhe1GqUiPj5PQg",
            },
          }).then(response => {
            const size = 5;
            const multipleBooks = response.data.items;
            const newBooksArray = multipleBooks.slice(0, size).map((book) => {
              return (
                book.volumeInfo.title
              )
            })
            setSearchMultipleBooks(newBooksArray);
            setReturnedBooks(multipleBooks);
          })
        }
      });
    });
  };

  return (
    <div className="App">
      <h1>Is the book better?</h1>
      <Form
        userInput={userInput}
        handleSubmit={handleSubmit}
        setUserInput={setUserInput}
      />

      <ResultsSection results={results} />
      {
        searchMultipleBooks.length !== 0 ? (
          <BookChoice
            titles={searchMultipleBooks}
            handleBookChoice={handleBookChoice}
          />
        ) : null
      }
    </div>
  );
}

export default App;
