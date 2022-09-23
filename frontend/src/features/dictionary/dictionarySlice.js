import { createSlice } from '@reduxjs/toolkit';
import { fetchPlant, fetchPlantList } from './dictionaryAction';

const initialState = {
  loading: false,
  plant: null,
  plantList: null,
  error: null,
  success: false,
};

const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPlant.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchPlant.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.plant = payload;
    },
    [fetchPlant.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [fetchPlantList.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchPlantList.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.plantList = payload;
    },
    [fetchPlantList.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default dictionarySlice.reducer;