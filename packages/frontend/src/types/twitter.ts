export interface TwitterEntitieUrl {
  start: number;
  end: number;
  url: string;
  expanded_url: string;
  display_url: string;
}

export interface TwitterUser {
  id: string;
  name: string;
  username: string;
  created_at: string;
  description: string;
  entities: {
    url?: {
      urls: TwitterEntitieUrl[];
    };
    description?: {
      urls: TwitterEntitieUrl[];
    };
  };
  location: string;
  pinned_tweet_id: string;
  profile_image_url: string;
  protected: boolean;
  public_metrics: {
    followers_count: number;
    following_count: number;
    tweet_count: number;
    listed_count: number;
  };
  url: string;
  verified: boolean;
  withheld: string;
}

export interface TwitterRequestOptions {
  headers: {
    'User-Agent'?: string;
    authorization: string;
  };
}

export interface TwitterGetUserRequest {
  id?: string;
  username?: string;
  'user.fields'?: string;
  'tweet.fields'?: string;
  expansions?: string;
}

export interface TwitterGetUserResponse {
  data: TwitterUser[];
  meta: {
    result_count: number;
    next_token: string;
  };
}

export interface TwitterGetFollowersRequest {
  id?: string;
  'user.fields'?: string;
  'tweet.fields'?: string;
  expansions?: string;
  max_results?: number;
  pagination_token?: string;
}

export interface TwitterGetFollowersResponse {
  data: TwitterUser[];
  meta: {
    result_count: number;
    next_token: string;
  };
}

export interface TwitterGetFollowingRequest {
  id?: string;
  'user.fields'?: string;
  'tweet.fields'?: string;
  expansions?: string;
  max_results?: number;
  pagination_token?: string;
}

export interface TwitterGetFollowingResponse {
  data: TwitterUser[];
  meta: {
    result_count: number;
    next_token: string;
  };
}
