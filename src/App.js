import axios from "axios";
import Form from "./Form.js";
import { useState } from "react";
import ResultsSection from "./ResultsSection.js";
import BookChoice from "./BookChoice.js";
import Loading from "./Loading.js";
import "./App.scss";

function App() {
  // App state
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
      outcome: "",
    },

    {
      type: "book",
      name: "",
      description: "",
      rating: "",
      img: "",
      altDescription: "",
      id: "2",
      outcome: "",
    },
  ]);
  const [searchMultipleBooks, setSearchMultipleBooks] = useState([]);
  const [returnedBooks, setReturnedBooks] = useState([]);
  const [returnedMovie, setReturnedMovie] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // Modal state
  const [open, setOpen] = useState(false);
  const onCloseModal = () => setOpen(false);

  const handleBookChoice = (clickedButton) => {
    setUserInput("");
    onCloseModal();

    let movieOutcome = "";

    if (clickedButton) {
      const matchedBook = returnedBooks.filter((item) => {
        return item.volumeInfo.title === clickedButton;
      });

      if (matchedBook[0].volumeInfo.authors === undefined || matchedBook[0].volumeInfo.authors[0] === undefined) {
        matchedBook[0].volumeInfo.authors = []
        matchedBook[0].volumeInfo.authors[0] = 'No Author'
      }

      if (matchedBook[0].volumeInfo.imageLinks === undefined || matchedBook[0].volumeInfo.imageLinks.thumbnail === undefined) {
        matchedBook[0].volumeInfo.imageLinks = {}
        matchedBook[0].volumeInfo.imageLinks.thumbnail = 'No Image'
      }

      if (matchedBook[0].volumeInfo.averageRating === undefined) {
        matchedBook[0].volumeInfo.averageRating = "not rated";
        matchedBook[0].volumeInfo.outcome = "loser";
        movieOutcome = "winner";
      } else if (
        returnedMovie.vote_average / 2 >
        matchedBook[0].volumeInfo.averageRating
      ) {
        matchedBook[0].volumeInfo.outcome = "loser";
        movieOutcome = "winner";
      } else if (
        returnedMovie.vote_average / 2 <
        matchedBook[0].volumeInfo.averageRating
      ) {
        matchedBook[0].volumeInfo.outcome = "winner";
        movieOutcome = "loser";
      } else if (
        returnedMovie.vote_average / 2 ===
        matchedBook[0].volumeInfo.averageRating
      ) {
        matchedBook[0].volumeInfo.outcome = "tie";
        movieOutcome = "tie";
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
          outcome: movieOutcome,
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
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchMultipleBooks([]);
    setIsLoading(true);
    // First API Call (MovieDB)
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
    })
      .then((response) => {
        const movieObject = response.data.results[0];
        setReturnedMovie(movieObject);
        // The title that gets sent to the book api
        const title = response.data.results[0].title;

        // Second API Call (Google Books)
        axios({
          method: "GET",
          url: `https://www.googleapis.com/books/v1/volumes?`,
          dataResponse: "JSON",
          params: {
            format: "JSON",
            q: title,
            Key: "AIzaSyDDrPYFlXLLrSfJCd7qoXhe1GqUiPj5PQg",
            printType: "books",
          },
        }).then((response) => {
          const bookObject = response.data.items[0].volumeInfo;
          if (bookObject.authors === undefined || bookObject.authors[0] === undefined) {
            bookObject.authors[0] = []
            bookObject.authors[0] = 'No Author'
          }

          if (bookObject.imageLinks === undefined || bookObject.imageLinks.thumbnail === undefined) {
          bookObject.imageLinks = {}
          bookObject.imageLinks.thumbnail = 'No Image'
          }

          if (title === bookObject.title) {
            setIsLoading(false);
            if (bookObject.averageRating === undefined) {
              bookObject.averageRating = "not rated";
              bookObject.outcome = "loser";
              movieObject.outcome = "winner";
            } else if (
              movieObject.vote_average / 2 >
              bookObject.averageRating
            ) {
              bookObject.outcome = "loser";
              movieObject.outcome = "winner";
            } else if (
              movieObject.vote_average / 2 <
              bookObject.averageRating
            ) {
              bookObject.outcome = "winner";
              movieObject.outcome = "loser";
            } else if (
              movieObject.vote_average / 2 ===
              bookObject.averageRating
            ) {
              bookObject.outcome = "tie";
              movieObject.outcome = "tie";
            }

            setUserInput("");

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
            setIsLoading(false);
            axios({
              method: "GET",
              url: `https://www.googleapis.com/books/v1/volumes?`,
              dataResponse: "JSON",
              params: {
                format: "JSON",
                q: title,
                Key: "AIzaSyDDrPYFlXLLrSfJCd7qoXhe1GqUiPj5PQg",
                printType: "books",

              },
            }).then((response) => {
              const size = 5;
              const multipleBooks = response.data.items;
              const newBooksArray = multipleBooks.slice(0, size).map((book) => {
                return book.volumeInfo;
              });
              setSearchMultipleBooks(newBooksArray);
              setReturnedBooks(multipleBooks);
              setOpen(true);
            });
          }
        });

      })
      .catch(() => {
        alert("No titles found, please search again!");
        setUserInput("");
      });
  };

  return (

    <div className="wrapper flexContainer">

      <header>
        <h1>Fiction Face/Off</h1>
        <h2>The debate is heated! Is the book or movie version better?!</h2>
      </header>
      <main>
        <Form
          userInput={userInput}
          handleSubmit={handleSubmit}
          setUserInput={setUserInput}
        />

        {
          isLoading
            ? <Loading />
            :
            <>
              {
                results[0].name !== ""
                  ? <ResultsSection results={results} />
                  : null
              }
            </>
        }
        {
          searchMultipleBooks.length !== 0
            ? <BookChoice
              bookInfo={searchMultipleBooks}
              handleBookChoice={handleBookChoice}
              returnedMovieTitle={returnedMovie.title}
              onCloseModal={onCloseModal}
              open={open}
            />
            : null
        }
      </main>
      <footer>
        <p>Created at <a href="https://junocollege.com/">Juno College</a> by Nathan, Steph, Mitch &amp; Emma</p>
      </footer>
    </div>

  );
}

export default App;
