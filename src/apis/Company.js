// const prefix = 'api/client';

export default {
    getCompanyList: (paging, search) => `/api/company/getall?now_page=${paging.now_page}&page_size=10&search=${search}`,

};