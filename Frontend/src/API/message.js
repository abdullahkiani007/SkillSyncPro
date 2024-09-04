import ApiClient from "./ApiClient";

class MessageAPI {
  constructor() {
    this.apiClient = new ApiClient("http://localhost:3000/api/v1/message");
  }

  async checkRoom(participants, token) {
    try {
      const response = await this.apiClient.post("checkRoom", participants, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getMessages(token, roomId) {
    console.log("Getting messages");
    console.log(roomId);
    try {
      const response = await this.apiClient.get(`messages?roomId=${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  }

  async getConversations(token) {
    try {
      const response = await this.apiClient.get("conversations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching conversations:", error);
      throw error;
    }
  }

  async postMessage(data, token) {
    try {
      const response = await this.apiClient.post("message", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Error posting message:", error);
      throw error;
    }
  }
}

export default new MessageAPI();
