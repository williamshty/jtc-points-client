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
      namespaced: true,
      state: {
        login: false,
        loginStatus: '',
        redeemStatus: '',
        signupStatus: '',
        addEventStatus: '',
        currentEventId: '',
        currentEventIdForUpload: '',
        currentEvent: {},
        attendEventStatus:'',
        staff: {},
        wallet: {},
        products: [],
        allQR: [],
        allEvents: [],
        allOwnEvents: []
      },
      mutations: {
        setLogin(state, loginStatus) {
          state.login = loginStatus
        },
        setStaff(state, staff) {
          state.staff = staff
        },
        setWallet(state, wallet) {
          state.wallet = wallet
        },
        setProducts(state, products) {
          state.products = products
        },
        setAllQR(state, allQR) {
          state.allQR = allQR
        },
        setLoginStatus(state, loginStatus) {
          state.loginStatus = loginStatus
        },
        setSignupStatus(state, signupStatus) {
          state.signupStatus = signupStatus
        },
        setRedeemStatus(state, redeemStatus) {
          state.redeemStatus = redeemStatus
        },
        setAddEventStatus(state, addEventStatus) {
          state.addEventStatus = addEventStatus
        },
        setAllEvents(state, allEvents) {
          state.allEvents = allEvents
        },
        setAllOwnEvents(state, allOwnEvents) {
          state.allOwnEvents = allOwnEvents
        },
        setCurrentEventId(state, currentEventId) {
          state.currentEventId = currentEventId
        },
        setCurrentEventIdForUpload(state, currentEventIdForUpload) {
          state.currentEventIdForUpload = currentEventIdForUpload
        },
        setCurrentEvent(state, currentEvent) {
          state.currentEvent = currentEvent
        },
        setAttendEventStatus(state, attendEventStatus) {
          state.attendEventStatus = attendEventStatus
        }
      },
      actions: {
          signup (context, credentials) {
            console.log(credentials)
            const payload = {
              account: credentials.account,
              password: credentials.password
            }
            console.log(payload)
            axios
            .post('auth', payload)
            .then(resp => {
              console.log(resp)
              // context.commit("setLogin", true)
              context.commit("setSignupStatus", true)
              this.commit('navigator/pop', {root:true})
            })
            .catch(err => {
              console.log(err)
              context.commit("setSignupStatus", false)
            })
          },
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
            console.log(context)
            context.commit("setLogin", true)
            context.commit("setLoginStatus", true)
            this.commit('navigator/pop', {root:true})
            context.dispatch("getAllProducts")
            context.dispatch("getWallet")
            context.dispatch("getAllQR")
            context.dispatch("getOwnEvent")
            context.dispatch("getAllEvent")
            // this.axios.defaults.headers.common = resp
            // this.commit("tabbar/set", 3, {root:true})
            
          })
          .catch(err => {
            console.log(err)
            context.commit("setLoginStatus", false)
          })
        },
        logout (context) {
          axios
          .get('auth')
          .then(resp => {
            console.log(resp)
            console.log(context)
            context.commit("setLogin", false)
            // context.commit("setLoginStatus", true)
            // this.commit('navigator/pop', {root:true})
            // context.dispatch("getAllProducts")
            // context.dispatch("getWallet")
            // context.dispatch("getAllQR")
            // context.dispatch("getOwnEvent")
            // context.dispatch("getAllEvent")
            this.commit("splitter/toggle", false, {root:true})
            
          })
          .catch(err => {
            console.log(err)
            // context.commit("setLoginStatus", false)
          })
        },
        getAllProducts (context) {
          axios
          .get('product')
          .then(resp => {
            console.log(resp)
            context.commit("setProducts", resp.data)
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
        },
        getAllQR (context) {
          axios
          .get('product/qr/allQr')
          .then(resp => {
            console.log(resp)
            context.commit("setAllQR", resp.data)
          })
          .catch(err => {
            console.log(err)
          })
        },
        redeemProduct (context, credentials) {
          console.log(credentials)
          const payload = {
            id: credentials.productId,
          }
          console.log(payload)
          axios
          .put('product/redeem', payload)
          .then(resp => {
            console.log(resp)
            context.dispatch("getAllProducts")
            context.dispatch("getWallet")
            context.dispatch("getAllQR")
            context.commit("setRedeemStatus", true)
            // this.commit('navigator/pop', {root:true})
          })
          .catch(err => {
            console.log(err.error)
            context.commit("setRedeemStatus", false)
          })
        },
        getAllEvent (context) {
          axios
          .get('event')
          .then(resp => {
            console.log(resp)
            context.commit("setAllEvents", resp.data)
          })
          .catch(err => {
            console.log(err)
          })
        },
        getOwnEvent (context) {
          axios
          .get('event/ownEvents')
          .then(resp => {
            console.log(resp)
            context.commit("setAllOwnEvents", resp.data)
          })
          .catch(err => {
            console.log(err)
          })
        },
        getEventDetail (context, credentials) {
          const eventId = credentials.eventId
          console.log(eventId)
          axios
          .get('event/getById/'+eventId)
          .then(resp => {
            console.log(resp)
            context.commit("setCurrentEvent", resp.data)
          })
          .catch(err => {
            console.log(err)
          })
        },
        addNewEvent(context, credentials) {
          console.log(credentials)
          const payload = credentials
          axios
          .post('event', payload)
          .then(resp => {
            console.log(resp)
            context.dispatch("getOwnEvent")
            context.dispatch("getAllEvent")
            context.dispatch("getWallet")
            context.commit("setAddEventStatus", true)
            context.commit("setCurrentEventId", '')
            this.commit('navigator/pop', {root:true})
          })
          .catch(err => {
            console.log(err.error)
            context.commit("setAddEventStatus", false)
          })
        },
        editEvent(context, credentials) {
          console.log(credentials)
          const payload = credentials
          axios
          .put('event', payload)
          .then(resp => {
            console.log(resp)
            context.dispatch("getOwnEvent")
            context.dispatch("getAllEvent")
            context.dispatch("getWallet")
            // context.commit("setAddEventStatus", true)
            // context.commit("setCurrentEventId", '')
            this.commit('navigator/pop', {root:true})
            this.commit('navigator/pop', {root:true})
          })
          .catch(err => {
            console.log(err.error)
            // context.commit("setAddEventStatus", false)
          })
        },
        deleteEvent(context, credentials) {
          console.log(credentials)
          const payload = credentials
          axios
          .delete('event/delete/'+ payload.id)
          .then(resp => {
            console.log(resp)
            context.dispatch("getOwnEvent")
            context.dispatch("getAllEvent")
            context.dispatch("getWallet")
            // context.commit("setAddEventStatus", true)
            context.commit("setCurrentEventId", '')
            context.commit("setCurrentEvent", {})
            this.commit('navigator/pop', {root:true})
          })
          .catch(err => {
            console.log(err)
            // context.commit("setAddEventStatus", false)
          })
        },
        uploadEventImage(context, files) {
          console.log(files)
          const file = files[0]
          let formData = new FormData()
          formData.append('avatar', file)
          console.log(formData)
          axios
          .post('event/avatar', formData)
          .then(resp => {
            console.log(resp.data.id)
            context.commit("setCurrentEventIdForUpload", resp.data.id)
          })
          .catch(err => {
            console.log(err)
          })
        },
        attendEvent(context, credentials) {
          console.log(credentials)
          const payload = credentials
          axios
          .put('event/attend', payload)
          .then(resp => {
            console.log(resp)
            // context.dispatch("getOwnEvent")
            // context.dispatch("getAllEvent")
            context.dispatch("getWallet")
            context.commit("setAttendEventStatus", resp.data)
            // context.commit("setAddEventStatus", true)
            // context.commit("setCurrentEventId", '')
            // context.commit("setCurrentEvent", {})
            // this.commit('navigator/pop', {root:true})
          })
          .catch(err => {
            console.log(err)
            context.commit("setAttendEventStatus", false)
            // context.commit("setAddEventStatus", false)
          })
      }
    }
  }
}
}
