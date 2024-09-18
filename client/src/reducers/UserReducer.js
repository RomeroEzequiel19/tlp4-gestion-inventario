import { ACTIONS } from "../types/type";

export const userReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.FETCH_USERS_SUCCESS:
            return { ...state, users: action.payload, loading: false };
        case ACTIONS.FETCH_USERS_ERROR:
            return { ...state, error: action.payload, loading: false };
        case ACTIONS.ADD_USER_SUCCESS:
            return { ...state, users: [...state.users, action.payload] };
        case ACTIONS.DELETE_USER_SUCCESS:
            return { ...state, users: state.users.filter(user => user.id !== action.payload) };
        case ACTIONS.SET_LOADING:
            return { ...state, loading: true };
        default:
            return state;
    }
};