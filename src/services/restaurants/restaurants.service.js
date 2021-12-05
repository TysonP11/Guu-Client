import { mocks, mockImages } from "./mock";
import camelize from "camelize";
import axios from "../../utils/axios";

export const restaurantsRequest = (term) => {
  return new Promise((resolve, reject) => {
    const body = { term };
    axios
      .post(`/review/search-reviews`, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const restaurantsForNewReviewRequest = (term) => {
  return new Promise((resolve, reject) => {
    const body = { term };
    axios
      .post(`/restaurant/search-restaurants`, body)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const reviewsByRestaurantRequest = (restaurantId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/review/get-reviews-by-res?restaurantId=${restaurantId}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    restaurant.photos = restaurant.photos.map((p) => {
      return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
    });

    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });

  return camelize(mappedResults);
};
