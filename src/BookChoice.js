const BookChoice = ({ titles, handleBookChoice }) => {
  return titles.map((bookTitle) => {
    return (
      <button
      value={bookTitle}  
      onClick={(e) => {
          handleBookChoice(e.target.value);
        }}
      >
        {bookTitle}
      </button>
    );
  });
};

export default BookChoice;
