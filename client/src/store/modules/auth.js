
const state = {
  user: null,
  jwt: '',
  authFailureMessages: [],
  registrationErrorMessages: []
};

const getters = {
  
  authUser: state => state.user,
  
  isAuthenticated: state => state.user && state.jwt,
  
  getJWT: state => state.jwt,
  
  getAuthFailureMessages: state => state.authFailureMessages,

  getRegistrationErrorMessages: state => state.registrationErrorMessages
 
};

const actions = {
  
  async logIn({commit}, credentials) {
    
    let response = await fetch('/api/users/authenticate', { 
      method: 'POST',  
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' }
    });
    let data = await response.json();
    if (response.status === 200) {
      commit('authenticationSuccess', data);
    } else {
      commit('authenticationFailure', {msg:data.msg, statusCode:response.status });
    }
  },

  async confirmAccount({commit}, data) {
    
    let response = await fetch(`/api/users/confirm/${data.id}.${data.key}`, { 
       method: 'GET',  
       headers: { 'Content-Type': 'application/json' }
    });
    let d = await response.json();
    if(response.status === 200) {
      commit('confirmationSuccess', d.user)
    }
    
  },

  async reAuthenticate({commit}) {
    
    let token = localStorage.getItem('auth_token');
    if(token) {
      let response = await fetch('/api/users/reauthenticate', { 
        method: 'POST',  
        body: JSON.stringify({token: token}),
        headers: { 'Content-Type': 'application/json' }
      });
      let data = await response.json();
      if (response.status === 200) {
        commit('authenticationSuccess', data);
      } else {
        localStorage.setItem('auth_token', '')
      }
    }
  },
  
  logOut({commit}) {
    commit('clearAthentication');
  },

  async register({commit}, user) {
    let response = await fetch('/api/users/register', { 
      method: 'POST',  
      body: JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        confirmationRoute: `${window.location.origin}/confirm`
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    let data = await response.json();
    if (response.status !== 200) {
      commit('registrationFailure', {msg:data.msg, statusCode:response.status });
    } else {
      commit('registrationSuccess', data);
    }     
  },
  async requestConfirmation({commit}, user) {
    
  }
};



const mutations = {
  
  authenticationSuccess: (state, data) => {
    state.user = data.user;
    state.jwt = data.token;
    localStorage.setItem('auth_token', data.token);
    state.authFailureMessage = [];
  },
  
  authenticationFailure: (state, data) => {
    state.user = data.user;
    state.jwt = '';
    localStorage.setItem('auth_token', '');
    state.authFailureMessages = [];
    state.authFailureMessages.push(data);
  },
  
  clearAthentication: (state) => {
    state.user = null,
    state.jwt = '';
    localStorage.setItem('auth_token', '');
    state.authFailureMessages = [];
  },

  confirmationSuccess: (state, user) => {
    state.user = user;
  },

  registrationSuccess: (state, data) => {
    state.registrationErrorMessages = [];
    state.user = data.user;
  },

  registrationFailure: (state, data) => {
    state.registrationErrorMessages = [];
    state.registrationErrorMessages.push(data);
  }
  
};

export default {
  state,
  getters,
  actions,
  mutations
};
