import { Modal } from "react-responsive-modal";

const BookChoice = ({ bookInfo, handleBookChoice, returnedMovieTitle, open, onCloseModal }) => {

  return (
    <Modal open={open} onClose={onCloseModal} center>
      <div className="buttonContainer">
        <p>Your search returned {returnedMovieTitle} please select the matching book</p>
        {bookInfo.map((book, index) => {
          return (
            <button
              key={index}
              value={book.title}
              onClick={() => {
                handleBookChoice(book.title);
              }
            }
            >
              <p>{book.title}</p>
              <p>{book.authors[0] || 'No author'}</p>
            </button>
          );
        })}
        <p>Not the title you're looking for? Search again with specificity!</p>
      </div>
    </Modal>
  )
};

export default BookChoice;

