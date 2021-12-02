import React, { useState, useContext, createContext, useEffect } from 'react'

import { restaurantsRequest, restaurantsTransform } from './restaurants.service'

import { LocationContext } from '../location/location.context'

export const RestaurantsContext = createContext()

export const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([])
  const [reviews, setReviews] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { location, keyword } = useContext(LocationContext)

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
        retrieveRestaurants
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  )
}
