import ResultContainer from './ResultContainer'
function ResultsSection({results}) {
// console.log(results);

	const movieDiv = document.querySelector.className('movie');

	if ()
	const ratingClass = results[0].rating > results[1].rating 
		? movieDiv 'winner'
		: movieDiv 'loser' 

	return (
		
		<section className="resultsSection">
			{results.map(result => {
				return <ResultContainer 
				key={result.id}
				{...result}
				ratingClass={ratingClass}
				/>
			})}
		</section>

		// {
		// 	const winnerClass = results[0].rating > results[1].rating 
		// 	? 'winner'
		// 	: null 
			// if div w className movie rating > book className raiting , add winner class 
			

			//if div w className book rating > movie className rating, add winer class 

			//if className book === classnaME MOVIE, add tie classes 

			//if className rating = null add winner class
		// }
				
	)


}
	
export default ResultsSection;