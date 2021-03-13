import ResultContainer from './ResultContainer'
function ResultsSection({results}) {

		return (
			<section>
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