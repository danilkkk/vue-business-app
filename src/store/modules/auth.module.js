import axios from "axios";
import {error} from '../../utils/error'
const TOKEN_KEY = 'au-us-ses-tkn';
const VUE_APP_FIREBASE_API_KEY = "" /* not real key */

export default {
    namespaced: true,
    state() {
        return {
            token: localStorage.getItem(TOKEN_KEY),
        }
    },
    getters: {
        token(state) {
            return state.token
        },
        isAuthorized(_, getters) {
            return !!getters.token
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem(TOKEN_KEY, token);
        },
        logout(state) {
            state.token = null,
                localStorage.removeItem(TOKEN_KEY);
        }
    },
    actions: {
        async login({commit, dispatch}, authInfo) {
            try {
                // console.log(process.env.VUE_APP_FIREBASE_API_KEY)
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${VUE_APP_FIREBASE_API_KEY}`;
                const {
                    data
                } = await axios.post(url, {...authInfo, returnSecureToken: true});              
                commit('setToken', data.idToken)
            } catch (e) {
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true});
                //{root: true} передается для того, чтобы указать на вызов метода в корневом модуле
                console.log(error(e.response.data.error.message))
                throw new Error;
            }

        }
    }
}