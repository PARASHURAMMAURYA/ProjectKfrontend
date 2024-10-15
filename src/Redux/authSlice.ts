import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { headers } from './header';
import { ProfileData } from '../Types/profileData';

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  role: string;
  message: string;
};

export type AuthState = {
  loader: boolean;
  loginData: LoginResponse | null;
  profileData: ProfileData | null;
  error: string;
};

const initialState: AuthState = {
  loader: false,
  loginData: null,
  profileData: null,
  error: '',
};
const api = 'http://localhost:5000';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: any, thunkAPI) => {
    try {
      const data = await axios.post<LoginResponse>(
        `${api}/login`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (data.status === 200) {
        return data.data;
       
      } else {
        return thunkAPI.rejectWithValue(data.data);
        
      }
 
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const data = await axios.get(`${api}auth/logout`, {
      headers: headers(),
    });
    if (data) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('refreshToken');
    try {
      const data = await axios.get(`${api}auth/refresh`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
          Authorization: 'Bearer ' + token,
        },
      });
      if (data) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const getProfileData = createAsyncThunk(
  'auth/user/profile-data',
  async (_, thunkAPI) => {
    try {
      const data = await axios.get(`${api}user/profile-data`, {
        headers: headers(),
      });
      if (data) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const updateProfileData = createAsyncThunk(
  'auth/user/update-profile',
  async (payload: any, thunkAPI) => {
    try {
      const data = await axios.patch(`${api}user/update-profile`, payload, {
        headers: headers(),
      });
      if (data) {
        return { ...payload, message: data.data.message };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const changePassword = createAsyncThunk(
  'auth/user/change-password',
  async ({ current_password, new_password }: any, thunkAPI) => {
    try {
      const data = await axios.patch(
        `${api}user/change-password`,
        { current_password, new_password },
        {
          headers: headers(),
        },
      );
      if (data) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const updateProfilePicture = createAsyncThunk(
  'auth/user/upload-profile-picture',
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(
        `${api}user/upload-profile-picture`,
        payload,
        {
          headers: { ...headers(), 'Content-Type': 'multipart/form-data' },
        },
      );
      if (data) {
        return data.data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

const authSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state: AuthState) => {
        state.loader = true;
      })
      .addCase(login.fulfilled, (state: AuthState, { payload }) => {
        state.loader = false;
        localStorage.setItem('accessToken', payload.accessToken);
        localStorage.setItem('refreshToken', payload.refreshToken);
        state.loginData = payload;
        state.error = '';
      })
      .addCase(login.rejected, (state: AuthState, action: any) => {
        state.loader = false;
        state.error = action.payload;
      })

      .addCase(logout.fulfilled, (state: AuthState) => {
        state.loginData = null;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      })

      .addCase(refreshToken.fulfilled, (state: AuthState, { payload }: any) => {
        state.profileData = null;
        localStorage.setItem('accessToken', payload.data.accessToken);
        localStorage.setItem('refreshToken', payload.data.refreshToken);
      })
      .addCase(refreshToken.rejected, (_state: AuthState, _action: any) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      })

      .addCase(
        getProfileData.fulfilled,
        (state: AuthState, { payload }: any) => {
          state.profileData = payload?.data?.data;
        },
      )
      .addCase(getProfileData.rejected, (state: AuthState, _action: any) => {
        state.profileData = null;
      })
      .addCase(updateProfileData.fulfilled, (state: AuthState, action: any) => {
        state.profileData = { ...state.profileData, ...action.payload };
      })
      .addCase(
        updateProfilePicture.fulfilled,
        (state: AuthState, action: any) => {
          if (state.profileData) {
            state.profileData = {
              ...state.profileData,
              profile_picture: action.payload.imagePath,
            };
          }
        },
      );
  },
});

export default authSlice.reducer;
