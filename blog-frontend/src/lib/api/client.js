import axios from 'axios';

const client = axios.create();

/*
글로벌 설정 예제

// API 주소 다른곳 이용
client.defaults.baseURL = 'https://외부서버'

// 헤더 설정. 
client.defaults.headers.common['Authorization'] = 'Bearer abcd';

//인턴셉터 설정. 
axios.intercepter.response.use(
    response => {
        // 성공시 작업 수행
        return response;
    }
    error => {
        return Promise.reject(error)
    }
})


*/
export default client;
