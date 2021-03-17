const Form = ({ userInput, handleSubmit, setUserInput }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search" className="srOnly">Enter a title:</label>
      <input
        placeholder='Enter a Title'
        minLength="2"
        required
        value={userInput}
        type="text"
        id="search"
        onChange={(e) => { setUserInput(e.target.value) }}
      />
      <button>search</button>
    </form>
  )
}

export default Form;