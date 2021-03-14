const BookChoice = ({ titles, handleBookChoice, returnedMovieTitle }) => {
  
  return (

    <>
    <p>Your search returned {returnedMovieTitle} please select the matching book</p>
    {titles.map((bookTitle) => {
    
      return (
        
        <div className="buttonContainer">
          <button
            key={bookTitle}
            value={bookTitle}
            onClick={(e) => {
              handleBookChoice(e.target.value);
            }}
          >
            {bookTitle}
          </button>
        </div>
      );
    })}
    <p>Not the title you're looking for? Search again with specificity!</p>
    </>
  ) 
  
  
 
};

export default BookChoice;

