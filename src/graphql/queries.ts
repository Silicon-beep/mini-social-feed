import { gql } from '@apollo/client';

/**
 * GraphQL Queries for Ad Personalization Engine
 * These queries can be used with a GraphQL backend
 */

// Query to fetch personalized ads based on user profile
export const GET_PERSONALIZED_ADS = gql`
  query GetPersonalizedAds($userId: ID!, $limit: Int, $categories: [String!]) {
    personalizedAds(userId: $userId, limit: $limit, categories: $categories) {
      id
      title
      description
      imageUrl
      category
      tags
      targetAudience
      clickUrl
      priority
      score
      matchReasons
    }
  }
`;

// Query to fetch ads by category
export const GET_ADS_BY_CATEGORY = gql`
  query GetAdsByCategory($category: String!, $limit: Int) {
    adsByCategory(category: $category, limit: $limit) {
      id
      title
      description
      imageUrl
      category
      tags
      targetAudience
      clickUrl
      priority
    }
  }
`;

// Query to fetch user behavior profile
export const GET_USER_BEHAVIOR = gql`
  query GetUserBehavior($userId: ID!) {
    userBehavior(userId: $userId) {
      views {
        adId
        category
        timestamp
        duration
      }
      clicks {
        adId
        category
        timestamp
      }
      preferences {
        category
        score
      }
    }
  }
`;

// Mutation to track ad view
export const TRACK_AD_VIEW = gql`
  mutation TrackAdView($userId: ID!, $adId: ID!, $category: String!, $duration: Int) {
    trackAdView(userId: $userId, adId: $adId, category: $category, duration: $duration) {
      success
      message
    }
  }
`;

// Mutation to track ad click
export const TRACK_AD_CLICK = gql`
  mutation TrackAdClick($userId: ID!, $adId: ID!, $category: String!) {
    trackAdClick(userId: $userId, adId: $adId, category: $category) {
      success
      message
    }
  }
`;

// Query to get trending ads
export const GET_TRENDING_ADS = gql`
  query GetTrendingAds($limit: Int) {
    trendingAds(limit: $limit) {
      id
      title
      description
      imageUrl
      category
      tags
      targetAudience
      clickUrl
      priority
      views
      clicks
    }
  }
`;
