import ReactCardFlip from 'react-card-flip';
import { useState } from "react";

function ResultContainer(props) {
	const {
			name, 
			author,
			description, 
			rating, 
			img, 
			altDescription,
			outcome
		} = props;

	const [isFlipped, setIsFlipped] = useState(false);

	function handleCardClick(e) {
		e.preventDefault();
		setIsFlipped(!isFlipped);
	}

		return (
			<ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal"> 
					<div className={outcome}>
						<h2 className="mediaTitle">{name}</h2>
						<p className="author">{author}</p>
						<div className="imageContainer"><img className="image" src={img} alt={altDescription}/></div>
						<button onClick={handleCardClick}>Description</button>
						<p className="rating">{rating}</p>
					</div>

					<div className="back">
						<h2 className="mediaTitle">{name}</h2>
						<p>{description}</p>
						<button onClick={handleCardClick}>Go back</button>
					</div>
			</ReactCardFlip>
		)
}


export default ResultContainer;