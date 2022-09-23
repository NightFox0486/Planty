import { createAsyncThunk } from '@reduxjs/toolkit';
import { feedItem, feedList, feedCreate } from '../../api/feed';

export const fetchFeed = createAsyncThunk(
  'feed/fetchFeed',
  async (feedId, { rejectWithValue }) => {
    try {
      const { data } = await feedItem(feedId);

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const fetchFeedList = createAsyncThunk(
  'feed/fetchFeedList',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await feedList();

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const createFeed = createAsyncThunk(
  'feed/fetchFeedList',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await feedCreate(params);

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);