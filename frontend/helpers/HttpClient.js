import axios from "axios";

export default class HttpClient {
     endpoint = '/api/index.php';


    response;
     debug= false;

     token = null;

     constructor(token= null) {
    this.token = token;
}



 async  newRequest(endpoint, data = null) {
    const url = this.url(endpoint);
    const response = axios.get(url, {
        headers: {//...await this.getBearerTokenHeaders(),
        AccessControlAllowOrigin:true},
        ...data,
    });
    return response ;
}

 async newPostRequest(endpoint, data= null) {
    const url = this.url(endpoint);
    try {
        const response = await axios.post(url, data, {
            headers: {
                ...(await this.getBearerTokenHeaders()),
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (err) {
        console.log(err);
        await this.checkResponseForErrors(err);
    }
}

 async newPutRequest(endpoint, data= null) {
    const url = this.url(endpoint);
    const response = axios.put(url, data, {
        headers: await this.getBearerTokenHeaders(),
    });
    return response;
}

async newDeleteRequest(endpoint, data = null) {
    const url = this.url(endpoint);
    try {
        const response = await axios.delete(url, {
            headers: await this.getBearerTokenHeaders(),
            data,
        });
        return response;
    } catch (error) {
        console.log(error);
        await this.checkResponseForErrors(error);
        throw error;
    }
}

async newPatchRequest(endpoint, data = null) {
    const url = this.url(endpoint);
    const response = axios.patch(url, data, {
        headers: await this.getBearerTokenHeaders(),
    });
    return response ;
}

// public async getUser() {
//     try {
//         const response = await this.newRequest('/users/current');
//
//         if (response.data.success === true) {
//             return response.data.user;
//         }
//     } catch (error) {
//         if (error.code === 403) return null;
//     }
// }

// public async getUsers() {
//     try {
//         const response = await this.newRequest('/user/all');
//         return response.data.users;
//     } catch (error) {
//         if (error.code === 403) return null;
//     }
//     return null;
// }

 async sendRequest(
    endpoint,
    method = 'GET',
    data = [],
    config = {}
) {
    const url = this.url(endpoint);
    try {
        const headers = {
            ...(await this.getBearerTokenHeaders()),
            ...(config?.headers ?? {}),
        };
        return await axios.request({
            url: url,
            method: method,
            data: data,
            ...config,
            headers: headers,
        });
    } catch (err) {
        console.log(err);
        await this.checkResponseForErrors(err);
        return err.response;
    }
}



 url(endpoint= null){
    let protocol = 'http://127.0.0.1:8000/api';


    const base = [protocol,  endpoint].join(
        ''
    );
    const url = encodeURI(base);
    return url;
}

 printValidationErrors(errorMessagesObj) {
    if (typeof errorMessagesObj === 'string') {
       // showInSnackbar(errorMessagesObj, 30000, 'error');
        return;
    }
    let errorMessages = '';

    const objectKeys = Object.keys(errorMessagesObj);
    const lastProperty = objectKeys[objectKeys.length - 1];
    for (const errorField in errorMessagesObj) {
        errorMessagesObj[errorField].forEach((errorMsg) => {
            errorMessages += errorMsg;
            const lastArrayItem =
                errorMessagesObj[errorField][errorMessagesObj[errorField].length - 1];

            if (errorMsg != lastArrayItem) errorMessages += ', ';
        });
        errorMessages += '<br>';
        if (errorField != lastProperty) errorMessages += '<br>';
    }

   // showInSnackbar(errorMessages, 30000, 'error');
}

 async checkResponseForErrors(err) {
    if (err.status == 422 || err.response.data.validatorErrors) {
        this.printValidationErrorsInSnackBar(err.response.data.validatorErrors);
    } else {
        throw new Error(err);
    }
    return;
}

 async getBearerTokenHeaders() {
    // Tokens are per user, valid for length of SESSION_LIFETIME in .env?
    // Updated these after login with authToken from UserAuthController::logIn() !!!
    const token = /*useLocalStorage('auth_token', 'no_token')*/ '';
    const encodedToken = encodeURI(token.value);
    this.token = encodedToken;

    return {
        Authorization: `Bearer ${encodedToken}`,
    };
}

}