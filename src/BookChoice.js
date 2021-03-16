const BookChoice = ({ bookInfo, handleBookChoice, returnedMovieTitle }) => {
  
  return (

    <div className="buttonContainer">
    <p>Your search returned {returnedMovieTitle} please select the matching book</p>
    {bookInfo.map((book, index) => {
      return (
          <button
            key={index}
            value={book.title}
            onClick={() => {
              handleBookChoice(book.title);
            }}
          >
            <p>{book.title}</p>
            <p>{book.authors[0]}</p>
          </button>
      );
    })}
    <p>Not the title you're looking for? Search again with specificity!</p>
    </div>
  ) 
};

export default BookChoice;

