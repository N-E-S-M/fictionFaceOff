const BookChoice = ({ titles, handleBookChoice, returnedMovieTitle }) => {
  
  return (

    <div className="buttonContainer">
    <p>Your search returned {returnedMovieTitle} please select the matching book</p>
    {titles.map((bookTitle, index) => {
    
      return (
          <button
            key={index}
            value={bookTitle}
            onClick={(e) => {
              handleBookChoice(e.target.value);
            }}
          >
            {bookTitle}
          </button>
      );
    })}
    <p>Not the title you're looking for? Search again with specificity!</p>
    </div>
  ) 
  
  
 
};

export default BookChoice;

