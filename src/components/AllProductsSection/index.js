import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import FiltersRating from '../FiltersRating'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
    isActive: false,
  },
  {
    name: 'Electronics',
    categoryId: '2',
    isActive: false,
  },
  {
    name: 'Appliances',
    categoryId: '3',
    isActive: false,
  },
  {
    name: 'Grocery',
    categoryId: '4',
    isActive: false,
  },
  {
    name: 'Toys',
    categoryId: '5',
    isActive: false,
  },
]

const Views = {
  initial: 'Initial',
  success: 'Success',
  failure: 'Failure',
}

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
    isActive: false,
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
    isActive: false,
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
    isActive: false,
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
    isActive: false,
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    initialcategoryOptions: categoryOptions,
    initialratingsList: ratingsList,
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
    title: '',
    category: '',
    rating: '',
    view: Views.initial,
  }

  componentDidMount() {
    this.getProducts()
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, title, category, rating, view} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${category}&title_search=${title}&rating=${rating}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response.status)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
        view: Views.success,
      })
    } else {
      this.setState({view: Views.failure})
    }
  }

  inputValue = item => {
    this.setState({title: item})
  }

  searching = () => {
    this.getProducts()
  }

  choosenCategory = id => {
    this.setState(
      prevState => ({
        initialcategoryOptions: prevState.initialcategoryOptions.map(each => {
          if (each.categoryId === id) {
            return {...each, isActive: true}
          }
          return {...each, isActive: false}
        }),
        category: id,
      }),
      this.getProducts,
    )
  }

  choosenRating = id => {
    this.setState(
      prevState => ({
        initialratingsList: prevState.initialratingsList.map(each => {
          if (each.ratingId === id) {
            return {...each, isActive: true}
          }
          return {...each, isActive: false}
        }),
        rating: id,
      }),
      this.getProducts,
    )
  }

  resetFilters = () => {
    this.setState(
      prevState => ({
        initialratingsList: prevState.initialratingsList.map(each => ({
          ratingId: each.ratingId,
          imageUrl: each.imageUrl,
          isActive: false,
        })),
        initialcategoryOptions: prevState.initialcategoryOptions.map(each => ({
          categoryId: each.categoryId,
          name: each.name,
          isActive: false,
        })),
        title: '',
        category: '',
        rating: '',
        activeOptionId: sortbyOptions[0].optionId,
      }),
      this.getProducts,
    )
  }

  renderProductsList = () => {
    const {productsList, activeOptionId, view} = this.state
    let noProduct

    switch (view) {
      case Views.success:
        if (productsList.length === 0) {
          noProduct = true
        } else {
          noProduct = false
        }

        return (
          <div className="all-products-container">
            {noProduct ? (
              <div className="no">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
                  alt="no products"
                  className="noproductView"
                />
              </div>
            ) : (
              <ul className="products-list">
                {productsList.map(product => (
                  <ProductCard productData={product} key={product.id} />
                ))}
              </ul>
            )}
          </div>
        )

      case Views.failure:
        return this.renderFailure()

      default:
        return null
    }

    // TODO: Add No Products View
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view
  renderFailure = () => (
    <div className="no">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png "
        alt="products failure"
        className="noproductView"
      />
    </div>
  )

  render() {
    const {
      isLoading,
      activeOptionId,
      initialcategoryOptions,
      initialratingsList,
    } = this.state

    return (
      <>
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
          searching={this.searching}
          inputValue={this.inputValue}
        />
        <div className="all-products-section">
          {/* TODO: Update the below element */}
          <div className="filter">
            <ul className="unordered">
              <li className="categoryHeading list">
                <h1>Category</h1>
              </li>
              {initialcategoryOptions.map(each => (
                <FiltersGroup
                  item={each}
                  key={each.categoryId}
                  choosenCategory={this.choosenCategory}
                />
              ))}
            </ul>
            <ul className="unordered">
              <li className="ratingHeading list">
                <h1>Rating</h1>
              </li>
              {initialratingsList.map(each => (
                <FiltersRating
                  item={each}
                  key={each.ratingId}
                  choosenRating={this.choosenRating}
                />
              ))}
            </ul>
            <button className="reset" type="button" onClick={this.resetFilters}>
              Clear Filters
            </button>
          </div>
          {isLoading ? this.renderLoader() : this.renderProductsList()}
        </div>
      </>
    )
  }
}

export default AllProductsSection
