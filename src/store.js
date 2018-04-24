import { baseUrl } from "./const.js";
import axios from "axios";
axios.defaults.baseURL = baseUrl;
axios.defaults.withCredentials = true;
// import { mapActions } from 'vuex'

export default {
  modules: {
    navigator: {
      strict: true,
      namespaced: true,
      state: {
        stack: [],
        options: {}
      },
      mutations: {
        push(state, page) {
          state.stack.push(page);
        },
        pop(state) {
          if (state.stack.length > 1) {
            state.stack.pop();
          }
        },
        replace(state, page) {
          state.stack.pop();
          state.stack.push(page);
        },
        reset(state, page) {
          state.stack = [page || state.stack[0]];
        },
        options(state, newOptions = {}) {
          state.options = newOptions;
        }
      }
    },

    splitter: {
      strict: true,
      namespaced: true,
      state: {
        open: false
      },
      mutations: {
        toggle(state, shouldOpen) {
          if (typeof shouldOpen === 'boolean') {
            state.open = shouldOpen;
          } else {
            state.open = !state.open;
          }
        }
      }
    },

    tabbar: {
      strict: true,
      namespaced: true,
      state: {
        index: 3
      },
      mutations: {
        set(state, index) {
          state.index = index;
        }
      }
    },

    ajax: {
      namespaced:true,
      state: {
        logIn: false,
        staff: {},
        wallet: {}
      },
      mutations: {
        setLogin(state, logInStatus) {
          state.logIn = logInStatus;
        },
        setStaff(state, staff) {
          state.staff = staff;
        },
        setWallet(state, wallet) {
          state.wallet = wallet;
        }
      },
      actions: {
        login (context, credentials) {
          console.log(credentials)
          const payload = {
            account: credentials.account,
            password: credentials.password
          }
          console.log(payload)
          axios
          .put('auth', payload)
          .then(resp => {
            console.log(resp)
            context.commit("setLogin", true)
          })
          .catch(err => {
            console.log(err)
          })
        },
        getAllProducts () {
          axios
          .get('product')
          .then(resp => {
            console.log(resp)
          })
          .catch(err => {
            console.log(err)
          })
        },
        getWallet (context) {
          axios
          .get('user/')
          .then(resp => {
            const staff = resp.data
            const wallet = staff.wallet
            context.commit("setStaff", staff)
            context.commit("setWallet", wallet)
          })
          .catch(err => {
            console.log(err)
          })
        }

      }
    }
  }
};
