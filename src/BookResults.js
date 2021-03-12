function BookResults({book}) {

		return (
	
				<div className='bookResults'>
					<h2>{book.title}</h2>
					<img src='' alt=''/>
					<p>{book.description}</p>
					<p>{book.averageRating}</p>
				</div>
		)
	}
	
	
	export default BookResults;