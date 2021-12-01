import axios from "../../utils/axios";

export const getFollowersRequest = (userId) => {
  //console.log("axios request");

  return new Promise((resolve, reject) => {
    //console.log(typeof userId);
    axios
      .get(`/profile/list-followers/?followingUserId=${userId}`)
      .then((res) => resolve(res.data))
      .catch((err) => {
        reject(err);
      });
  });
};

export const getFollowingsRequest = (userId) => {
  //console.log("axios request");

  return new Promise((resolve, reject) => {
    axios
      .get(`/profile/list-following/?userId=${userId}`)
      .then((res) => resolve(res.data))
      .catch((err) => {
        reject(err);
      });
  });
};

export const getReviewsRequest = (userId) => {
  //console.log("axios request");

  return new Promise((resolve, reject) => {
    axios
      .get(`/review/get-reviews-by-user/?userId=${userId}`)
      .then((res) => resolve(res.data))
      .catch((err) => {
        reject(err);
      });
  });
};
