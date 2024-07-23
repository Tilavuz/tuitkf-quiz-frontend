export interface NewsInterface {
  _id: string;
  auth_id: string;
  title: string;
  desc: string;
  createdAt: string;
  status: boolean
}

export interface NewsBodyInterface {
    _id: string,
    news_id: string,
    news: string
}