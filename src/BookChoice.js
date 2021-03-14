const BookChoice = ({ titles, handleBookChoice }) => {
  return titles.map((bookTitle) => {
    return (
      <button
        key={bookTitle}
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
