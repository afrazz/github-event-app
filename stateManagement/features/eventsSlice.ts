import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


// Define a type for the slice state
interface eventsState {
  loading: boolean,
  events: [],
  eventDetail: {},
  error: null | string;
}

// Define the initial state using that type
const initialState: eventsState = {
  loading: false,
  events: [],
  eventDetail: {},
  error: null
}

export const eventSlice = createSlice({
  name: 'event',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setEventDetails: (state, action) => {
        state.eventDetail = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state, action) => {
      state.loading = true;
      state.error = null
    })
    .addCase(fetchEvents.fulfilled, (state, action) => {
      state.loading = false;
      state.events = action.payload;
      state.error = null
    })
    .addCase(fetchEvents.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload
    })
    
  },
})


export const fetchEvents = createAsyncThunk(
    'users/fetchEvents',
    // Declare the type your function argument here:
    async (_, {rejectWithValue}) => {
        console.log(process.env.EXPO_GITHUB_TOKEN, 'token')
        try {
            const response = await fetch(`https://api.github.com/users/afrazz/events/public`, {
                method: 'GET',
                headers: {
                  'Accept': 'application/vnd.github+json',
                  'Authorization': `Bearer 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`,
                  'X-GitHub-Api-Version': '2022-11-28'
                }
              });
              alert('Refreshing Data on every 10sec.... for demo purpose')
            return (await response.json())
        }catch(err: any) {
            rejectWithValue(err.message|| 'Something went wrong')
        }
      
    },
  )


export const { setEventDetails } = eventSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default eventSlice.reducer