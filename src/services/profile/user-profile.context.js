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

  const [viewingUser, setViewingUser] = useState(null);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const getFollowers = (userId) => {
    setIsLoading(true);
    getFollowersRequest(userId.toString())
      .then((f) => {
        setFollowers(f);
        setIsLoading(false);
      })
      .catch((e) => {
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
  };

  const getFollowings = (userId) => {
    setIsLoading(true);
    getFollowingsRequest(userId.toString())
      .then((f) => {
        setFollowing(f);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.response.data.error);
      });
  };

  const getReviews = (userId) => {
    setIsLoading(true);
    getReviewsRequest(userId.toString())
      .then((r) => {
        setReviews(r.reviews);
        //getAverageRating();
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.response.data.error);
      });
  };

  const getAverageRating = () => {
    if (reviews.length === 0) {
      setAverageRating(0.0);
    } else {
      var sum = 0.0;
      reviews.map((review) => {
        sum += parseFloat(review.rating.$numberDecimal);
      });
      setAverageRating((sum / reviews.length).toFixed(2));
    }
  };

  const getTags = () => {
    var tagsArray = [];
    reviews.map((review) => {
      tagsArray = tagsArray.concat(review.tags);
    });
    setTags(tagsArray);
  };

  useEffect(() => {
    if (user) {
      getFollowers(user.user._id);
      getFollowings(user.user._id);
      getReviews(user.user._id);
    }
  }, [user]);

  useEffect(() => {
    if (reviews.length >= 0) {
      getAverageRating();
      getTags();
    }
  }, [reviews]);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  useEffect(() => {
    if (!viewingUser) {
      return;
    }
  }, [viewingUser]);

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
        viewingUser,
        setViewingUser,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
