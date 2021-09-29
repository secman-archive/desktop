import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import CryptoTools from "@/tools/crypto";

import AuthService from "@/apis/services/auth";
import SystemService from "@/apis/services/system";
import HTTPClient from "@/apis/http";

import Logins from "@/contents/Logins/store";
import CreditCards from "@/contents/CreditCards/store";
import Emails from "@/contents/Emails/store";
import Notes from "@/contents/Notes/store";
import Servers from "@/contents/Servers/store";

export default new Vuex.Store({
	state() {
		CryptoTools.encryptKey = localStorage.master_hash;
		CryptoTools.transmissionKey = localStorage.transmission_key;

		return {
			transmission_key: localStorage.transmission_key,
			master_hash: localStorage.master_hash,
			searchQuery: "",
			authenticated: false,
			user: {}
		};
	},

	getters: {
		isAuthenticated(state) {
			return state.authenticated;
		}
	},

	actions: {
		async Login({ state }, payload) {
			payload.master_password = CryptoTools.sha256Encrypt(
				payload.master_password
			);

			const { data } = await AuthService.Login(payload);
			state.transmission_key = data.transmission_key;
			state.master_hash = CryptoTools.pbkdf2Encrypt(
				data.secret,
				payload.master_password
			);

			CryptoTools.encryptKey = state.master_hash;
			CryptoTools.transmissionKey = state.transmission_key;
			state.user = data;
			state.authenticated = true;

			localStorage.email = payload.email;
			localStorage.server = payload.server;
			localStorage.access_token = data.access_token;
			localStorage.refresh_token = data.refresh_token;

			if (process.env.NODE_ENV !== "production") {
				localStorage.master_hash = state.master_hash;
				localStorage.transmission_key = state.transmission_key;
			}
		},

		Logout({ state }, payload) {
			const { data } = AuthService.Logout(payload);

			state.transmission_key = null;
			state.master_hash = null;
			state.user = null;
			state.authenticated = false;

			const lsKeys = Object.keys(localStorage).filter(
				key => ["email", "server"].includes(key) === false
			);

			lsKeys.forEach(key => localStorage.removeItem(key));
		},

		async Import(_, data) {
			return SystemService.Import(data);
		},

		async Export() {
			const { data } = SystemService.Export();
			return data;
		}
	},

	mutations: {
		onInputSearchQuery(state, event) {
			state.searchQuery = event.target.value;
		}
	},

	modules: {
		Logins,
		CreditCards,
		Emails,
		Notes,
		Servers
	}
});
