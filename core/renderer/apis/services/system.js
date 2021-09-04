import HTTPClient from "@/api/http";

export default class SystemService {
  static async GeneratePassword() {
    return HTTPClient.post(`/api/system/generate-password`);
  }
}
