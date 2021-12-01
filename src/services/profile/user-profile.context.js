import React, { useState, createContext, useEffect } from "react";
import { LogBox } from "react-native";
import { useContext } from "react/cjs/react.development";
import { AuthenticationContext } from "../authentication/authentication.context";
import {
  getFollowersRequest,
  getFollowingsRequest,
  getReviewsRequest,
} from "./user-profile.service";

export const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [visible, setVisible] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [following, setFollowing] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0.0);
  const [tags, setTags] = useState([]);
  const [viewOptions, setViewOptions] = useState([
    {
      name: "md-list",
      isSelected: true,
    },
    {
      name: "md-map",
      isSelected: false,
    },
  ]);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const getFollowers = (userId) => {
    //console.log("useEffect" + userId);
    setIsLoading(true);
    getFollowersRequest(userId.toString())
      .then((f) => {
        //console.log("getting followers: " + JSON.stringify(f));
        setFollowers(f);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e.response.data.error);
        setIsLoading(false);
        setError(e.response.data.error);
      });
  };

  const setViewing = (name) => {
    const newViewOptions = viewOptions.map((o) => {
      if (o.name === name) {
        return {
          name: o.name,
          isSelected: true,
        };
      } else {
        return {
          name: o.name,
          isSelected: false,
        };
      }
    });
    setViewOptions(newViewOptions);
    console.log(viewOptions);
  };

  const getFollowings = (userId) => {
    setIsLoading(true);
    getFollowingsRequest(userId.toString())
      .then((f) => {
        //console.log("getting followings: " + JSON.stringify(f));
        setFollowing(f);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e.response.data.error);
        setIsLoading(false);
        setError(e.response.data.error);
      });
  };

  const getReviews = (userId) => {
    console.log(userId);
    setIsLoading(true);
    getReviewsRequest(userId.toString())
      .then((r) => {
        console.log("getting reviews: " + JSON.stringify(r));
        setReviews(r.reviews);
        //getAverageRating();
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e.response.data.error);
        setIsLoading(false);
        setError(e.response.data.error);
      });
  };

  const getAverageRating = () => {
    var sum = 0.0;
    reviews.map((review) => {
      sum += parseFloat(review.rating.$numberDecimal);
      console.log(review.rating.$numberDecimal);
    });
    setAverageRating((sum / reviews.length).toFixed(2));
    console.log(averageRating);
  };

  const getTags = () => {
    var tagsArray = [];
    reviews.map((review) => {
      tagsArray = tagsArray.concat(review.tags);
      //console.log(review.tags);
    });
    setTags(tagsArray);
  };

  useEffect(() => {
    if (user) {
      //console.log("user: " + user.user);
      getFollowers(user.user._id);
      getFollowings(user.user._id);
      getReviews(user.user._id);
    }
  }, [user]);

  useEffect(() => {
    if (reviews.length >= 0) {
      console.log("get reviews" + reviews);
      //console.log("user: " + user.user);
      getAverageRating();
      getTags();
      //console.log("all tags: " + tags);
    }
  }, [reviews]);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        openMenu,
        closeMenu,
        visible,
        isLoading,
        followers,
        following,
        error,
        averageRating,
        reviews,
        tags,
        setViewing,
        viewOptions,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
