// const prefix = 'api/client';

export default {
    getCardList: (paging) => `/api/card/getall?now_page=${paging.now_page}&page_size=10`,
    getAllCardList: () => '/api/card/getall?now_page=1&page_size=1000000',

    createCard: () => '/api/card',
    updateCard: () => '/api/card',
    deleteCard: () => '/api/card',

    getCardDetail: (id) => `/api/card?card_id=${id}`,

    changeIssued: (id) => `/api/card/editissued?card_id=${id}`,           // 票卡發行狀態 is_issued
    downloadTemplate: (id) => `/api/card/importTemplate?card_id=${id}`,   // 下載匯入範例
    importMember: () => '/api/card/importmember',                         // 匯入會員資料
    exportCardMemberList: () => '/api/card/exportmember',                 // 匯出會員資料


};