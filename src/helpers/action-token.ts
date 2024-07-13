export const getToken = () => {
    return localStorage.getItem('token')
}

export const setToken = (value: string) => {
  return localStorage.setItem("token", value);
};