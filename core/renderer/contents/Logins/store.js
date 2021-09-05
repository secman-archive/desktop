import LoginsService from "@/apis/services/logins";
import CryptoTools from "@/tools/crypto";

const EncryptedFields = ["username", "password", "extra"];

export default {
  namespaced: true,

  state() {
    return {
      ItemList: [],
      Detail: {},
    };
  },

  actions: {
    async FetchAll({ state }, query) {
      const { data } = await LoginsService.FetchAll(query);

      const itemList = JSON.parse(CryptoTools.aesDecrypt(data.data));

      itemList.forEach((element) => {
        CryptoTools.decryptFields(element, EncryptedFields);
      });

      state.ItemList = itemList;
    },

    Delete(_, id) {
      return LoginsService.Delete(id);
    },

    Create(_, data) {
      const payload = CryptoTools.encryptPayload(data, EncryptedFields);
      return LoginsService.Create(payload);
    },

    Update(_, data) {
      const payload = CryptoTools.encryptPayload(data, EncryptedFields);
      return LoginsService.Update(data.id, payload);
    },
  },
};