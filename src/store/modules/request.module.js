import axios from "../../axios/request";
import store from '../index'

export default {
    namespaced: true,
    state() {
        return {
            requests: []
        }
    },

    getters: {
        getRequests(state) {
            return state.requests;
        },
    },

    mutations: {
        setRequests(state, requests) {
            state.requests = requests;
        },

        addRequest(state, request) {
            state.requests.push(request);
        }
    },



    actions: {

        async create({commit, dispatch}, request) {
            try {
                const token = store.getters['auth/token'];
                const {data} = await axios.post(`/requests.json?auth=${token}`, request);
                commit('addRequest', {
                    ...request,
                    id: data.name
                });
                dispatch('setMessage', {
                    value: 'Заявка успешно создана',
                    type: 'primary'
                }, {
                    root: true
                })
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {
                    root: true
                })
            }
        },

        async loadRequests({commit, dispatch}) {
            try {
                const token = store.getters['auth/token'];
                const {data} = await axios.get(`/requests.json?auth=${token}`);
                const requests = Object.keys(data).map(id => ({
                    ...data[id],
                    id,
                }));
                commit('setRequests', requests);              
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {
                    root: true
                })
            }
        },

        async loadRequestById({dispatch}, id) {
            try {
                const token = store.getters['auth/token'];
                const {data} = await axios.get(`/requests/${id}.json?auth=${token}`);
                return {
                    ...data,
                    id
                }          
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {
                    root: true
                })
            }
        },

        async removeRequestById({dispatch}, id) {
            try {
                const token = store.getters['auth/token'];
                await axios.delete(`/requests/${id}.json?auth=${token}`);   
                
                dispatch('setMessage', {
                    value: 'Заявка успешно удалена',
                    type: 'primary'
                }, {
                    root: true
                })  
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {
                    root: true
                })
            }
        },

        async updateRequestById({dispatch}, data) {
            try {
                const token = store.getters['auth/token'];
                debugger
                await axios.put(`/requests/${data.id}.json?auth=${token}`, data);

                dispatch('setMessage', {
                    value: 'Заявка успешно обновлена',
                    type: 'primary'
                }, {
                    root: true
                })        
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {
                    root: true
                })
            }
        }
    }
}