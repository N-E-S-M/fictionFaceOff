import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faBook } from "@fortawesome/free-solid-svg-icons";
import StarSVG from "./StarSVG";

function ResultContainer(props) {
  const {
    type,
    name,
    author,
    description,
    rating,
    img,
    altDescription,
    outcome,
  } = props;

  const [isFlipped, setIsFlipped] = useState(false);

  function handleCardClick(e) {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  }

  return (
    <>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className={outcome}>
          <h3 className={type}>
            {type} {outcome}
          </h3>
          <h2 className="mediaTitle">{name}</h2>
          <button className="readMore" onClick={handleCardClick}>
            Read More
          </button>
          <p className="author">{author}</p>
          <div className="imageContainer">
            <img className="image" src={img} alt={altDescription} />
          </div>
          <StarSVG className="star" />
          {rating === "not rated/5" ? (
            <p className="rating">not rated</p>
          ) : (
            <p className="rating">{rating}</p>
          )}
        </div>
        <div className="back">
          <h2 className="mediaTitle">{name}</h2>
          <p>{description}</p>
          <button onClick={handleCardClick}>Go back</button>
        </div>
      </ReactCardFlip>
      <FontAwesomeIcon
        icon={faFilm}
        className="icon filmIcon"
        aria-hidden="true"
        title="Film section"
      />
      <span className="srOnly">Film section</span>
      <FontAwesomeIcon
        icon={faBook}
        className="icon bookIcon"
        aria-hidden="true"
        title="Book section"
      />
      <span className="srOnly">Book section</span>
    </>
  );
}

export default ResultContainer;
