import './index.css'

const FiltersRating = props => {
  const {item, choosenRating} = props
  const {ratingId, imageUrl, isActive} = item
  const background = isActive ? 'active ratingPara' : 'ratingPara'
  const RatingChange = () => {
    choosenRating(ratingId)
  }
  return (
    <li className="ratingList">
      <button className="rating" onClick={RatingChange} type="button">
        <img src={imageUrl} alt={`rating ${ratingId}`} className="ratingImg" />
      </button>
      <p className={`${background}`}>& up</p>
    </li>
  )
}

export default FiltersRating
