import React, { useState, createContext, useEffect } from "react";
import { LogBox } from "react-native";
import { useContext } from "react/cjs/react.development";
import { AuthenticationContext } from "../authentication/authentication.context";
import {
  followUserRequest,
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

  const [isFollowing, setIsFollowing] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(null);

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
    getFollowersRequest(userId)
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
    getFollowingsRequest(userId)
      .then((f) => {
        setFollowing(f);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.response.data.error);
      });
  };

  const followUser = (userId) => {
    setIsLoading(true);
    followUserRequest(userId)
      .then((r) => {
        getFollowers(userId);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.response.data.error);
      });
  };

  const getReviews = (userId) => {
    setIsLoading(true);
    getReviewsRequest(userId).then((r) => {
      //console.log("getting reviews: " + JSON.stringify(r));
      setReviews(r.reviews);
      //getAverageRating();
      setIsLoading(false);
    });
  };

  const getAverageRating = () => {
    if (reviews.length === 0) {
      setAverageRating(0.0);
    } else {
      var sum = 0.0;
      reviews.map((review) => {
        sum += parseFloat(review.rating.$numberDecimal);
        //console.log(review.rating.$numberDecimal);
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

  // useEffect(() => {
  //   if (viewingUser) {
  //     //console.log("user: " + user.user);
  //     getFollowers(viewingUser._id);
  //     getFollowings(viewingUser._id);
  //     getReviews(viewingUser._id);
  //   }
  // }, [viewingUser]);

  useEffect(() => {
    if (reviews.length >= 0) {
      //console.log("get reviews" + reviews);
      //console.log("user: " + user.user);
      getAverageRating();
      getTags();
    }
    /* eslint-disable */
  }, [reviews]);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  useEffect(() => {
    if (!viewingUser) {
      return;
    }
    //console.log("viewingUser: " + JSON.stringify(viewingUser));
    getFollowers(viewingUser._id);
    getFollowings(viewingUser._id);
    getReviews(viewingUser._id);
  }, [viewingUser]);

  useEffect(() => {
    if (!viewingUser) {
      return;
    }

    if (!followers) {
      return;
    }

    if (!user) {
      return;
    }

    //console.log(followers);
    setIsFollowing(false);
    followers.followers.forEach((f) => {
      if (user.user._id === f._id) {
        setIsFollowing(true);
      }
    });
  }, [followers]);

  useEffect(() => {
    if (!user || !viewingUser) {
      return;
    } else {
      if (user.user._id.toString() !== viewingUser._id.toString()) {
        setIsOwnProfile(false);
        //console.log("is own profile = " + isOwnProfile);
      } else {
        setIsOwnProfile(true);
        //console.log("is own profile = " + isOwnProfile);
      }
    }
  }, [user, viewingUser]);

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
        isFollowing,
        isOwnProfile,
        followUser,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
