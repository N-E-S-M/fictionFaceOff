function Results({movie}) {

const image = `https://image.tmdb.org/t/p/w200${movie.poster_path}`

	return (
	<section className="results">
			<div>
				<h2>{movie.title}</h2>
				<img src={image} alt=""/>
				<p>{movie.overview}</p>
				<p>{movie.vote_average}</p>
			</div>
	</section>
	)
}


export default Results;