import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';
import { GlobalError, Login, Register, User, ValidationError } from '../../types';

export const register = createAsyncThunk<User, Register, { rejectValue: ValidationError }>(
  'user/register',
  async (user, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post<User>('/users', user);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);

export const login = createAsyncThunk<User, Login, { rejectValue: GlobalError }>(
  'user/postDataLogin',
  async (userLogin, {rejectWithValue}) => {
    try {
      const {data} = await axiosApi.post<User>('/users/sessions', userLogin);
      return data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);

