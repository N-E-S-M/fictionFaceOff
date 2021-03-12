function MovieResults({movie}) {

const image = `https://image.tmdb.org/t/p/w200${movie.poster_path}`

	return (

			<div className='movieResults'>
				<h2>{movie.title}</h2>
				<img src={image} alt=''/>
				<p>{movie.overview}</p>
				<p>{movie.vote_average}</p>
			</div>
	)
}


export default MovieResults;