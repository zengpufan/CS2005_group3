import axios from "axios";

const https = axios.create({
  baseURL: "",
  timeout: 2000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

// https.interceptors.request.use(
//   (res) => {
//     if (res.code == 0 || res.code == 200) {
//       // code值为 0 或 200 时视为成功
//       return Promise.resolve(res);
//     }
//     return Promise.reject(res);
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default https;
