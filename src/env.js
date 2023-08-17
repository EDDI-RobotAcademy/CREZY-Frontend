const env = {
    mode: process.env.NODE_ENV,
    api: {
        SPRING_API_URL: process.env.VUE_APP_SPRING_URL,
        FAST_API_URL: process.env.VUE_APP_FAST_API_URL,
    },
};

export default env;