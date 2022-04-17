// const prefix = 'api/client';

export default {
    getSwipeRecordList: (paging, search, action, card_id) => `/api/cardmember/log/getall?now_page=${paging.now_page}&page_size=10&card_id=${card_id}${action !== '' ? `&action=${action}` : ''}&search=${search}`,

};