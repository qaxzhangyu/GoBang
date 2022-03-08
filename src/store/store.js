import Vuex from 'vuex';
import Vue from 'vue';
import { featchRegister, featchSignin } from './../api/api';
Vue.use(Vuex);
// import socket from './../utils/socket.io';

export default new Vuex.Store({
	state: {
		baseData: 1,
		socketState: null,
		userId:null,
	},
	// getters: {
	// 	getSocket: (state) => {
	// 		return state.socketState ? state.socketState : socket.getSocketIns();
	// 	}
	// },
	actions: {
		async Register(state, payload) {
			try {
				const response = await featchRegister(payload);
				if (response.code == 200) {
					//注册成功，缓存username
					localStorage.setItem('userInfo', JSON.stringify(payload));
				} else {
					alert(response.msg);
				}
			} catch (err) {
				console.error(err);
			}
		},
		async Signin(state, payload) {
			try {
				const response = await featchSignin(payload);
				if (response.code == 200) {
					//登录成功
					localStorage.setItem('userInfo', JSON.stringify(payload));
					state.state.userId = response.data.userId;
					payload.success();
					// this.getters.getSocket.socket().emit('default', { userNo: 123 });
					console.log('payload=>',state)

				} else {
					alert(response.msg);
				}
			} catch (err) {
				console.error(err);
			}
		}
	},
	mutations: {
		setBaseData(state, payload) {
			// state.info = { ...state.info, ...payload };
			state.baseData = payload;
		}
	}
});
