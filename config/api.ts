const API_CONFIG = {
    BASE_URL: __DEV__ ? 'http://localhost' : "https://devflorian.cornillet.com",
    ENDPOINTS: {
        REGISTER: '/register',
        LOGIN: '/login'
    }
};

export default API_CONFIG;