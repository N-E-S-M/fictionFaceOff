function ResultContainer(props) {
	const {
			type, 
			name, 
			author,
			description, 
			rating, 
			img, 
			altDescription,
			outcome
		} = props;
		return (
			<div className={type, outcome}>
				<h2>{name}</h2>
				<p>{author}</p>
				<img src={img} alt={altDescription}/>
				<p>{description}</p>
				<p>{rating}</p>
			</div>
		)
}


export default ResultContainer;