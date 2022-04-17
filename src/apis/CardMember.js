// const prefix = 'api/client';

export default {
    // 讀取 會員管理 列表頁(每十頁)
    getCardMemberList: (search, paging, action) => `/api/cardmember/getall?now_page=${paging.now_page}&page_size=10&search=${search}&card_id=${action}`,

    // 刪除會員
    deleteCardMember: () => '/api/cardmember',

    // 讀取 會員管理 詳細頁
    getCardMemberDetail: (card_member_id) => `/api/cardmember?card_member_id=${card_member_id}`,

    // 讀取某張卡片的所有會員(以便寄送信件和訊息 和 匯出會員資料)
    getCardMemberSendList: (paging,  card_id, search) => `/api/cardmember/send/getall?now_page=${paging.now_page}&page_size=10&card_id=${card_id}&search=${search}`,

    // 寄送訊息(單一卡片的全部會員)
    sendCardMemberSendList: () => '/api/cardmember/send/',

    // 讀取單一會員刷卡記錄
    getCardMemberSwipeLogList: (card_member_id, paging) => `/api/cardmember/GetSwipeLog?now_page=${paging.now_page}&page_size=10&card_member_id=${card_member_id}`

    
};