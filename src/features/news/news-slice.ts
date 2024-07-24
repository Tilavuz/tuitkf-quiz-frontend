import { NewsBodyInterface, NewsInterface } from "@/interface/news-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface NewsState {
    loading: boolean,
    news: NewsInterface[] | null,
    newsBody: NewsBodyInterface[] | null
}

const initialState: NewsState = {
    loading: false,
    news: null,
    newsBody: null
}

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    newsStart: (state) => {
      state.loading = true;
    },
    newsStop: (state) => {
      state.loading = false;
    },
    getNews: (state, action: PayloadAction<NewsInterface[]>) => {
      (state.loading = false), (state.news = action.payload);
    },
    createNews: (state, action: PayloadAction<NewsInterface>) => {
      if (state.news) {
        state.news = [...state.news, action.payload];
      } else {
        state.news = [action.payload];
      }
    },
    removeNews: (state, action: PayloadAction<string>) => {
      if (state.news) {
        state.news = state.news.filter((item) => item._id !== action.payload);
      }
    },
    changeNews: (state, action: PayloadAction<NewsInterface>) => {
      if (state.news) {
        state.news = state.news.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      }
    },
    getNewsBody: (state, action: PayloadAction<NewsBodyInterface[]>) => {
      state.newsBody = action.payload,
      state.loading = false
    }
  },
});




export const {
  newsStart,
  getNews,
  createNews,
  removeNews,
  newsStop,
  changeNews,
  getNewsBody,
} = newsSlice.actions;
export default newsSlice.reducer