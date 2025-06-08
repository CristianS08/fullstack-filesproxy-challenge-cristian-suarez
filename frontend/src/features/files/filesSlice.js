import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getFilesData } from "./filesAPI"

//
// Async thunk that fetches file data from the backend.
// Accepts an optional fileName to apply filtering on the server.
// Handles error rejection using rejectWithValue.
//
export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (fileName = null, { rejectWithValue }) => {
    try {
      const data = await getFilesData(fileName)
      return {
        data,
        isFiltered: !!fileName,        // indicates if a filter is applied
        searchTerm: fileName           // stores the current search term
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const dataSlice = createSlice({
  name: "data",
  // Initial state structure
  initialState: {
    data: [],
    loading: false,
    error: null,
    isFiltered: false,
    searchTerm: null,
  },

  reducers: {
    clearData: (state) => {
      state.data = []
      state.isFiltered = false
      state.searchTerm = null
      state.error = null
    },
  },

  extraReducers: (builder) => {
    builder
      // When fetch starts
      .addCase(fetchData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      // When fetch succeeds
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.data
        state.isFiltered = action.payload.isFiltered
        state.searchTerm = action.payload.searchTerm
      })
      // When fetch fails
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearData } = dataSlice.actions
export default dataSlice.reducer
