import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
    setToken: ['token'],
    getSuperUserList: ['callback', 'paging', 'search'],
    getSuperUserListSuccess: ['payload', 'paging'],
    createSuperUser: ['payload', 'callback'],
    updateSuperUser: ['payload', 'callback', 'paging', 'search'],
    deleteSuperUser: ['id', 'callback', 'paging'],
});

export const SuperUserTypes = Types;
export default Creators;