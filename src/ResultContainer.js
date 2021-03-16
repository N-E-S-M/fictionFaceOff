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
		return (
			<div className={outcome}>
				<h2 className="mediaTitle">{name}</h2>
				<p className="author">{author}</p>
				<div className="imageContainer"><img className="image" src={img} alt={altDescription}/></div>
				<p className="description">{description}</p>
				<p className="rating">{rating}</p>
			</div>
		)
}


export default ResultContainer;