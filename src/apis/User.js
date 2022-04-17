// const prefix = 'api/client';

export default {
    // function: () => '指定路徑(來自後端給的)'，用postman import他們給的api檔案，會自動顯示他們指定的method，再按send做測試
    login: () => '/api/auth',
    user: (id) => `/api/User?user_id=${id}`,
    updateUser: () => '/api/user',
    changePassword: () => '/api/user/changePassword'

};