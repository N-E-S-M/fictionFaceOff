function ResultContainer(props) {
	const {
			type, 
			name, 
			description, 
			rating, 
			img, 
			altDescription,
			ratingClass
		} = props;
		return (
			<div className={type, ratingClass}>
				<h2>{name}</h2>
				<img src={img} alt={altDescription}/>
				<p>{description}</p>
				<p>{rating}</p>
			</div>
		)
}


export default ResultContainer;