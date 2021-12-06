import React, { useState, useContext, createContext, useEffect } from 'react'

import { checkReviewedRequest, postReviewRequest } from './restaurants.service'
import {
  restaurantsRequest,
  restaurantsForNewReviewRequest,
  reviewsByRestaurantRequest,
} from './restaurants.service'

import { LocationContext } from '../location/location.context'

export const RestaurantsContext = createContext()

export const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([])
  const [selected, setSelected] = useState()
  const [restaurantKeyword, setRestaurantKeyword] = useState('')
  const [reviews, setReviews] = useState([])
  const [restaurantsReviews, setRestaurantsReviews] = useState([])
  const [viewingRestaurantId, setViewingRestaurantId] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isReviewed, setIsReviewed] = useState(false)
  const [reviewedItem, setReviewedItem] = useState(null)
  const { location, keyword } = useContext(LocationContext)

  const onRestaurantSearch = (searchKeyword) => {
    setIsLoading(true)
    setRestaurantKeyword(searchKeyword)
  }

  const getReviewsByRestaurant = (restaurantId) => {
    setIsLoading(true)
    setRestaurantsReviews([])
    reviewsByRestaurantRequest(restaurantId)
      .then((results) => {
        console.log('restaurants reviews: ' + JSON.stringify(results))
        setIsLoading(false)
        setRestaurantsReviews(results)
      })
      .catch((err) => {
        setIsLoading(false)
        setError(err)
      })
  }

  const searchNewRestaurant = (term) => {
    setIsLoading(true)
    setRestaurants([])
    setSelected(null)
    restaurantsForNewReviewRequest(term)
      .then((results) => {
        setIsLoading(false)
        setRestaurants(results)
      })
      .catch((err) => {
        setIsLoading(false)
        setError(err)
      })
  }

  const retrieveRestaurants = (term) => {
    setIsLoading(true)
    //setRestaurants([]);
    restaurantsRequest(term)
      .then((results) => {
        setIsLoading(false)
        setReviews(results)
      })
      .catch((err) => {
        setIsLoading(false)
        setError(err)
      })
  }

  const checkReviewed = (restaurantId) => {
    setIsLoading(true)
    checkReviewedRequest(restaurantId)
      .then((result) => {
        setIsLoading(false)
        setIsReviewed(result.isReviewed)
        setReviewedItem(result.review)
        //console.log(isReviewed)
      })
      .catch((err) => {
        setIsLoading(false)
        setError(err)
      })
  }

  const postReview = (review) => {
    setIsLoading(true)
    postReviewRequest(review)
      .then((result) => {
        setIsLoading(false)
        setIsReviewed(true)
        console.log(result)
        retrieveRestaurants(keyword)
        //console.log(isReviewed)
      })
      .catch((err) => {
        setIsLoading(false)
        setError(err)
      })
  }

  useEffect(() => {
    retrieveRestaurants(keyword)
  }, [keyword])

  useEffect(() => {
    retrieveRestaurants(keyword)
  }, [keyword])

  useEffect(() => {
    if (!viewingRestaurantId) {
      return
    }
    console.log('use effect' + viewingRestaurantId)
    getReviewsByRestaurant(viewingRestaurantId.toString())
  }, [viewingRestaurantId])

  useEffect(() => {
    if (!selected) {
      return
    }
    const selectedRestaurant = {
      restaurants: [selected],
    }
    setRestaurants(selectedRestaurant)
  }, [selected])

  useEffect(() => {
    if (
      restaurantKeyword === '' ||
      restaurantKeyword === null ||
      restaurantKeyword === undefined
    ) {
      return
    }
    searchNewRestaurant(restaurantKeyword)
  }, [restaurantKeyword])

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        isLoading,
        error,
        reviews,
        retrieveRestaurants,
        checkReviewed,
        isReviewed,
        reviewedItem,
        postReview,
        restaurantKeyword,
        restaurantSearch: onRestaurantSearch,
        selected,
        setSelected,
        restaurantsReviews,
        setViewingRestaurantId,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  )
}
