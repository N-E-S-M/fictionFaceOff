import { Modal } from "react-responsive-modal";

const BookChoice = ({ bookInfo, handleBookChoice, returnedMovieTitle, open, onCloseModal }) => {

  return (
    <Modal className="modalContainer" open={open} onClose={onCloseModal} center>
      <div className="buttonContainer">
        <p className="returnSearch">
          Your search returned "<span>{returnedMovieTitle}</span>". Please
          select the matching book:
        </p>
        {bookInfo.map((book, index) => {
          return (
            <button
              key={index}
              value={book.title}
              onClick={() => {
                handleBookChoice(book.title);
              }}
            >
              <p className="buttonTitle">{book.title}</p>
              {book.authors !== undefined ? (
                <p>{book.authors[0]}</p>
              ) : (
                <p>No Author</p>
              )}
            </button>
          );
        })}
        <p className="narrowSearch">
          Not the title you're looking for? Please narrow your search.
        </p>
      </div>
    </Modal>
  );
};

export default BookChoice;

