import axios from 'axios'
import router from '../router'


const requestAxios = axios.create({
    baseURL: 'https://vue-business-control-default-rtdb.firebaseio.com'
})

requestAxios.interceptors.response.use(null, error => {
    if (error.response.status == 401) { // ошибка авторизации
        router.push('/login?message=auth')
    }

    return Promise.reject(error);
  });

export default requestAxios