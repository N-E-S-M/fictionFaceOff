import "./App.scss";
import axios from "axios";
import Form from "./Form.js";
import { useState, useEffect } from "react";
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
    setUserInput('')
  }
  // this useEffect will then act once "bookButtonValue" is defined
  useEffect(()=> {

    if (bookButtonValue) {
      const matchedBook = returnedBooks.filter((item) => {
        return item.volumeInfo.title === bookButtonValue;
      })
      if (matchedBook[0].volumeInfo.averageRating === undefined) {
            matchedBook[0].volumeInfo.averageRating = 'not rated'
            matchedBook[0].volumeInfo.outcome = 'winner';
            returnedMovie.outcome = 'loser';
          }
          else if ((returnedMovie.vote_average / 2) > matchedBook[0].volumeInfo.averageRating) {
            matchedBook[0].volumeInfo.outcome = 'loser';
            returnedMovie.outcome = 'winner';
          } else if ((returnedMovie.vote_average / 2) < matchedBook[0].volumeInfo.averageRating) {
            matchedBook[0].volumeInfo.outcome = 'winner';
            returnedMovie.outcome = 'loser';
          } else if ((returnedMovie.vote_average / 2) === matchedBook[0].volumeInfo.averageRating){
            matchedBook[0].volumeInfo.outcome = 'tie';
            returnedMovie.outcome = 'tie';
          }
      setResults([
        {
          type: "movie",
          name: returnedMovie.title,
          description: returnedMovie.overview,
          rating: `${returnedMovie.vote_average / 2}/5`,
          img: `https://image.tmdb.org/t/p/w200${returnedMovie.poster_path}`,
          altDescription: `${returnedMovie.title} poster`,
          id: returnedMovie.id,
          outcome: returnedMovie.outcome,
        },
  
        {
          type: "book",
          name: matchedBook[0].volumeInfo.title,
          author: matchedBook[0].volumeInfo.authors[0],
          description: matchedBook[0].volumeInfo.description,
          rating: `${matchedBook[0].volumeInfo.averageRating}/5`,
          img: matchedBook[0].volumeInfo.imageLinks.thumbnail,
          altDescription: `${matchedBook[0].volumeInfo.title} cover`,
          id: matchedBook[0].volumeInfo.industryIdentifiers[0].identifier,
          outcome: matchedBook[0].volumeInfo.outcome,
        },
      ]);
      console.log(matchedBook[0]);
    } else {
    }
  }, [bookButtonValue, returnedBooks, returnedMovie])


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
      
        setReturnedMovie(movieObject);
        // the title that gets sent to the book api
        const title = response.data.results[0].title;
  
      
        axios({
          method: "GET",
          url: `https://www.googleapis.com/books/v1/volumes?`,
          dataResponse: "JSON",
          params: {
            format: "JSON",
            q: title,
            Key: "AIzaSyDDrPYFlXLLrSfJCd7qoXhe1GqUiPj5PQg",
            printType: 'books',
          },
        }).then((response) => {
      
          const bookObject = response.data.items[0].volumeInfo;
  
          if (title === bookObject.title) {

            if (bookObject.averageRating === undefined) {
              bookObject.averageRating = 'not rated'
              bookObject.outcome = 'winner';
              movieObject.outcome = 'loser';
            }
            else if ((movieObject.vote_average / 2) > bookObject.averageRating) {
              bookObject.outcome = 'loser';
              movieObject.outcome = 'winner';
            } else if ((movieObject.vote_average / 2) < bookObject.averageRating) {
              bookObject.outcome = 'winner';
              movieObject.outcome = 'loser';
            } else if ((movieObject.vote_average / 2) === bookObject.averageRating){
              bookObject.outcome = 'tie';
              movieObject.outcome = 'tie';
            }

            setUserInput('')
            setResults([
              {
                type: "movie",
                name: movieObject.title,
                description: movieObject.overview,
                rating: `${movieObject.vote_average / 2}/5`,
                img: `https://image.tmdb.org/t/p/w200${movieObject.poster_path}`,
                altDescription: `${movieObject.title} poster`,
                id: movieObject.id,
                outcome: movieObject.outcome,
              },
  
              {
                type: "book",
                name: bookObject.title,
                author: bookObject.authors[0],
                description: bookObject.description,
                rating: `${bookObject.averageRating}/5`,
                img: bookObject.imageLinks.thumbnail,
                altDescription: `${bookObject.title} cover`,
                id: bookObject.industryIdentifiers[0].identifier,
                outcome: bookObject.outcome,
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
                printType: 'books',
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
      }).catch(() => {
        alert('No titles found, please search again!')
        setUserInput('')
        
      })
    };
    // console.log(results)

  return (
    <div className="App">
      <h1>Is the book better?</h1>
      <Form
        userInput={userInput}
        handleSubmit={handleSubmit}
        setUserInput={setUserInput}
      />

      {
        results[0].name !== '' 
        ? <ResultsSection results={results} />
        : null
      }

      {
        searchMultipleBooks.length !== 0 ? (
          <BookChoice
            titles={searchMultipleBooks}
            handleBookChoice={handleBookChoice}
            returnedMovieTitle={returnedMovie.title}
          />
        ) : null
      }
    </div>
  );
}

export default App;
