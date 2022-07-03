/** @type {import("@apollo/subgraph/dist/schema-helper").GraphQLResolverMap} */
export default {
  Query: {
    latestReviews(_, __, { dataSources }) {
      return dataSources.reviewsAPI.getLatestReviews();
    },
  },
  Mutation: {
    submitReview(_, { review }, { dataSources }) {
      const newReview = dataSources.reviewsAPI.submitReviewForLocation(review);
      return {
        code: 200,
        success: true,
        message: "success",
        review: newReview,
      };
    },
  },
  Review: {
    location(review) {
      return { id: review.locationId };
    }
  },
  Location: {
    overallRating: (location, _, { dataSources }) => {
      return dataSources.reviewsAPI.getOverallRatingForLocation(location.id);
    },
    reviews: (location, _, { dataSources }) => {
      return dataSources.reviewsAPI.getReviewsForLocation(location.id);
    },
  },
};
