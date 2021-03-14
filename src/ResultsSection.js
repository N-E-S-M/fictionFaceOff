import ResultContainer from './ResultContainer'
function ResultsSection({results}) {
// console.log(results);

	return (
		
		<section className="resultsSection">
			{results.map(result => {
				return <ResultContainer 
				key={result.id}
				{...result}
				/>
			})}
		</section>
				
	)


}
	
export default ResultsSection;