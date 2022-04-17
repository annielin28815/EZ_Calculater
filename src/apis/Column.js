// const prefix = 'api/client';

export default {
    getColumnList: (card_id) => `/api/column/getall?card_id=${card_id}`,
    createColumn: () => '/api/column',
    changeColumn: () => '/api/column/changeorder?column_id=e203ca85-c3a6-486d-80e3-c1cba5c452e2&change=1'



};