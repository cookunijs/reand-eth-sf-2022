import axios from 'axios';
import { serverEnv } from '@env';
import {
  TwitterUser,
  TwitterRequestOptions,
  TwitterGetUserRequest,
  TwitterGetFollowingRequest,
  TwitterGetFollowingResponse,
} from 'src/types/twitter';
export const twitterEndpointUrl = 'https://api.twitter.com/2';
export const twitterDefaultSettings = {
  maxResultsNumber: 1000,
  userFields:
    'created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld',
  tweetFields:
    'attachments,author_id,context_annotations,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,non_public_metrics,organic_metrics,possibly_sensitive,promoted_metrics,public_metrics,referenced_tweets,source,text,withheld',
  expansions: 'pinned_tweet_id',
};

export const generateShareTweet = (text: string, url: string): string => {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${text}`)}&url=${url}`;
};

export const getTwitterApiToken = (): string => {
  return serverEnv.twitter.bearerToken;
};

export const getTwitterApiOptions = (): TwitterRequestOptions => {
  return {
    headers: {
      // "User-Agent": "v2UserLookupJS",
      authorization: `Bearer ${getTwitterApiToken()}`,
    },
  };
};

export const getTwitterApiUser = async (
  params: TwitterGetUserRequest
): Promise<TwitterUser | undefined> => {
  if (!params['user.fields']) {
    params['user.fields'] = twitterDefaultSettings.userFields;
  }

  try {
    let url = `${twitterEndpointUrl}/users`;
    if (params.id) {
      url = `${url}/${params.id}`;
    } else if (params.username) {
      url = `${url}/by/username/${params.username}`;
    } else {
      throw new Error(`No user information`);
    }

    const res = await axios.get<{ data: TwitterUser }>(url, {
      params: {
        'user.fields': params['user.fields'],
      },
      ...getTwitterApiOptions(),
    });

    if (res.data && res.data.data) {
      return res.data.data;
    }
    return undefined;
  } catch (err) {
    throw new Error(`Request failed: ${err}`);
  }
};

export const getTwitterApiFollowers = async (
  params: TwitterGetFollowingRequest
): Promise<TwitterUser[]> => {
  const users: TwitterUser[] = [];
  const options = getTwitterApiOptions();

  let hasNextPage = true;
  let nextToken = null;
  while (hasNextPage) {
    const resp = (await getTwitterApiFollowersPage(
      params,
      options,
      nextToken
    )) as TwitterGetFollowingResponse;

    if (resp && resp.meta && resp.meta.result_count && resp.meta.result_count > 0) {
      if (resp.data) {
        // eslint-disable-next-line prefer-spread
        users.push.apply(users, resp.data);
      }
      if (resp.meta.next_token) {
        nextToken = resp.meta.next_token;
      } else {
        hasNextPage = false;
      }
    } else {
      hasNextPage = false;
    }
  }

  return users;
};

// NOTE: Retrieve all user information for Following from id
export const getTwitterApiFollowing = async (
  params: TwitterGetFollowingRequest
): Promise<TwitterUser[]> => {
  const users: TwitterUser[] = [];
  const options = getTwitterApiOptions();

  let hasNextPage = true;
  let nextToken = null;
  while (hasNextPage) {
    const resp = (await getTwitterApiFollowingPage(
      params,
      options,
      nextToken
    )) as TwitterGetFollowingResponse;

    if (resp && resp.meta && resp.meta.result_count && resp.meta.result_count > 0) {
      if (resp.data) {
        // eslint-disable-next-line prefer-spread
        users.push.apply(users, resp.data);
      }
      if (resp.meta.next_token) {
        nextToken = resp.meta.next_token;
      } else {
        hasNextPage = false;
      }
    } else {
      hasNextPage = false;
    }
  }

  return users;
};

const getTwitterApiFollowersPage = async (
  params: TwitterGetFollowingRequest,
  options: TwitterRequestOptions,
  nextToken?: string | null
): Promise<TwitterGetFollowingResponse | void> => {
  if (nextToken) {
    params.pagination_token = nextToken;
  }
  if (!params.max_results) {
    params.max_results = twitterDefaultSettings.maxResultsNumber;
  }
  if (!params['user.fields']) {
    params['user.fields'] = twitterDefaultSettings.userFields;
  }

  try {
    if (!params.id) {
      throw new Error(`Not user id`);
    }
    if (params.max_results && params.max_results > twitterDefaultSettings.maxResultsNumber) {
      throw new Error(`Many in number`);
    }

    const url = `${twitterEndpointUrl}/users/${params.id}/followers`;
    const resp = await axios.get<{ data: TwitterGetFollowingResponse }>(url, {
      params: {
        'user.fields': params['user.fields'],
        max_results: params.max_results,
      },
      ...options,
    });

    if (resp.status != 200) {
      console.log(`${resp.status} ${resp.statusText}:\n${resp.data}`);
      return;
    }
    return resp.data.data;
  } catch (err) {
    throw new Error(`Request failed: ${err}`);
  }
};

const getTwitterApiFollowingPage = async (
  params: TwitterGetFollowingRequest,
  options: TwitterRequestOptions,
  nextToken?: string | null
): Promise<TwitterGetFollowingResponse | void> => {
  if (nextToken) {
    params.pagination_token = nextToken;
  }
  if (!params.max_results) {
    params.max_results = twitterDefaultSettings.maxResultsNumber;
  }
  if (!params['user.fields']) {
    params['user.fields'] = twitterDefaultSettings.userFields;
  }

  try {
    if (!params.id) {
      throw new Error(`Not user id`);
    }
    if (params.max_results && params.max_results > twitterDefaultSettings.maxResultsNumber) {
      throw new Error(`Many in number`);
    }

    const url = `${twitterEndpointUrl}/users/${params.id}/following`;
    const resp = await axios.get<{ data: TwitterGetFollowingResponse }>(url, {
      params: {
        'user.fields': params['user.fields'],
        max_results: params.max_results,
      },
      ...options,
    });

    if (resp.status != 200) {
      console.log(`${resp.status} ${resp.statusText}:\n${resp.data}`);
      return;
    }
    return resp.data.data;
  } catch (err) {
    throw new Error(`Request failed: ${err}`);
  }
};
