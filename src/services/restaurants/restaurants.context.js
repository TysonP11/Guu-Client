import React, { useState, useContext, createContext, useEffect } from 'react'

import { restaurantsRequest, restaurantsTransform, checkReviewedRequest } from './restaurants.service'

import { LocationContext } from '../location/location.context'

export const RestaurantsContext = createContext()

export const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([])
  const [reviews, setReviews] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { location, keyword } = useContext(LocationContext)
  const [isReviewed, setIsReviewed] = useState(false)

  const retrieveRestaurants = (term) => {
    setIsLoading(true)
    setRestaurants([])
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
        console.log(result)
        setIsLoading(false)
        //setIsReviewed(result.isReviewed)
      })
      .catch((err) => {
        setIsLoading(false)
        setError(err)
      })
  }
  
  useEffect(() => {    
    retrieveRestaurants(keyword)
  }, [keyword])

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        isLoading,
        error,
        reviews,
        retrieveRestaurants,
        checkReviewed,
        isReviewed
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  )
}
