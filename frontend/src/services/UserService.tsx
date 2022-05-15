import {httpClient} from "./HttpService";

export const User = {
  async create(user) {
    console.log("About to client post to create new user");
    return httpClient.post("/users"
      , { email: user.email, password: user.password }
    )

  }
}
