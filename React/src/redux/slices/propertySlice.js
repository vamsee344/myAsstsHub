import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import propertyService from '../../api/propertyService';

export const fetchAllProperties = createAsyncThunk(
  'property/fetchAll',
  async (query, { rejectWithValue }) => {
    try {
      const response = await propertyService.getProperties(query);
      return response.data; // Includes pagination and data array
    } catch (error) {
      return rejectWithValue(error.message || 'Fetching properties failed');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'property/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await propertyService.getCategories();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Fetching categories failed');
    }
  }
);

const initialState = {
  properties: [],
  featuredProperties: [],
  categories: [],
  pagination: {
    page: 1,
    per_page: 15,
    total: 0
  },
  loading: false,
  error: null,
};

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    fetchPropertiesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPropertiesSuccess: (state, action) => {
      state.loading = false;
      state.properties = action.payload.properties;
      state.featuredProperties = action.payload.featured || [];
    },
    fetchPropertiesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProperty: (state, action) => {
      state.properties = state.properties.map(prop =>
        prop.id === action.payload.id ? { ...prop, ...action.payload } : prop
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Properties
      .addCase(fetchAllProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchAllProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { fetchPropertiesStart, fetchPropertiesSuccess, fetchPropertiesFailure, updateProperty } = propertySlice.actions;
export default propertySlice.reducer;
