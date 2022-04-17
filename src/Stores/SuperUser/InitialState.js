/**
 * The initial values for the redux state.
 */
export const INITIAL_STATE = {
    Token: '',
    list: [
        {
            account: 'winhome',
            name: '元弘資訊',
            cellPhone: '0900000000',
            email: 'test@test.com'
        },
        {
            account: 'winhome',
            name: '元弘資訊',
            cellPhone: '0900000000',
            email: 'test@test.com'
        },
        {
            account: 'winhome',
            name: '元弘資訊',
            cellPhone: '0900000000',
            email: 'test@test.com'
        }
    ],
    superUserList: [],
    paging: {
        now_page: 1,
        page_size: 10,
        total: 0,
    },
};
