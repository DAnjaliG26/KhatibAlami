import axios from 'axios';


class AuthService {
    userAuthenticate(id) {
        return axios.get("" + "User/authenticate",
            {
                params:
                {
                    id: id,

                },

            }
        )
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();
