const Form = ({ userInput, handleSubmit, setUserInput }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search">Enter a title:</label>
      <input
        minLength="2"
        required
        value={userInput}
        type="text"
        id="search"
        onChange={(e) => { setUserInput(e.target.value) }}
      />
      <button>Submit</button>
    </form>
  )
}

export default Form;