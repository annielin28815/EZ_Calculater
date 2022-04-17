export default {
    // function: () => '指定路徑(來自後端給的)'，用postman import他們給的api檔案，會自動顯示他們指定的method，再按send做測試
    getSuperUserList: (paging, search) => `/api/user/getall?now_page=${paging.now_page}&page_size=10&search=${search}`,
    
    createSuperUser: () => '/api/User/addadmin',
    updateSuperUser: () => '/api/user',
    deleteSuperUser: () => '/api/user',
};