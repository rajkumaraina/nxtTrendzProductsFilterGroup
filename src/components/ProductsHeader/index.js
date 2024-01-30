import {BsFilterRight} from 'react-icons/bs'

import './index.css'

const ProductsHeader = props => {
  const onChangeSortby = event => {
    const {changeSortby} = props
    changeSortby(event.target.value)
  }

  const inputChange = event => {
    const {inputValue} = props
    inputValue(event.target.value)
  }

  const enterButton = event => {
    const {searching} = props
    console.log(event.key)
    console.log(event.target.value)
    if (event.key === 'Enter') {
      searching(event.target.value)
    }
  }

  const changeInput = event => {
    event.preventDefault()
    const {searching} = props
  }

  const {sortbyOptions, activeOptionId} = props

  return (
    <div className="products-header">
      <form className="inputContainer" onSubmit={changeInput}>
        <input
          className="InputElement"
          type="search"
          onChange={inputChange}
          onKeyDown={enterButton}
          placeholder="Search"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/app-store/app-store-search-img.png"
          className="search"
          alt="search"
        />
      </form>
      <h1 className="products-list-heading">All Products</h1>
      <div className="sort-by-container">
        <BsFilterRight className="sort-by-icon" />
        <p className="sort-by">Sort by</p>
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={onChangeSortby}
        >
          {sortbyOptions.map(eachOption => (
            <option
              key={eachOption.optionId}
              value={eachOption.optionId}
              className="select-option"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ProductsHeader
