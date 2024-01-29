import './index.css'

const FiltersGroup = props => {
  const {item, choosenCategory} = props
  const {categoryId, name, isActive} = item
  const background = isActive ? 'active category' : 'category'
  const categoryChange = () => {
    choosenCategory(categoryId)
  }
  return (
    <li className=" list">
      <p className={`${background}`} onClick={categoryChange} type="button">
        {name}
      </p>
    </li>
  )
}

export default FiltersGroup
