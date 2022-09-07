import axios from "axios";
export const GET_DETAILS = "GET_DETAILS";
export const REGISTER_USER = "REGISTER_USER";
export const REGISTER_SERVICE = "REGISTER_SERVICE";
export const GET_ALL_SERVICES = "GET_ALL_SERVICES";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const SORT_SERVICES = "SORT_SERVICES";
export const FILTER_SERVICES = "FILTER_SERVICES";
export const SERVICE_NAME = "SERVICE_NAME";
export const POST_CATEGORY = "POST_CATEGORY";
export const UPDATE_SERVICE = "UPDATE_SERVICE";
export const GET_USER = "GET_USER";
export const FILTER = "FILTER";
export const UPDATE = "UPDATE";
export const GET_SERVICE_ID = "GET_SERVICE_ID";
export const POST_REQUEST = "POST_REQUEST";
export const UPDATE_REQUEST = "UPDATE_REQUEST";
export const DELETE_REQUEST = "DELETE_REQUEST";
export const ALL_REQUEST = "ALL_REQUEST";
export const DELETE_SERVICES = "DELETE_SERVICES";
export const NEW_BANNED_STATE = "NEW_BANNED_STATE";
export const ALL_USERS = "ALL_USERS";
export const USER_BY_ID = "USER_BY_ID";
export const POST_REVIEW = "POST_REVIEW";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const ALL_NOTIFICATIONS = "ALL_NOTIFICATIONS";
export const POST_NOTIFICATION = "POST_NOTIFICATION";
export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";
export const USER_LOCATION = "USER_LOCATION";
export const ADMIN_UPDATE = "ADMIN_UPDATE";
export const ALL_REVIEWS = "ALL_REVIEWS";
export const SEARCH_CATEGORY = "SEARCH_CATEGORY";

const baseUrl = "https://deploy-changapp.herokuapp.com";

//ACTIONS PARA LOS USUARIOS
export function registerUser(user) {
  return async function (dispatch) {
    await axios.post(`${baseUrl}/user`, user).then((detalle) =>
      dispatch({
        type: REGISTER_USER,
        payload: detalle.data,
      })
    );
  };
}
export function getUserEmail(email) {
  return async function (dispatch) {
    await axios.get(`${baseUrl}/user/${email}`).then((detalle) =>
      dispatch({
        type: FILTER,
        payload: detalle.data,
      })
    );
  };
}

export function getUserLocation(location) {
  return async function (dispatch) {
    await axios.get(`${baseUrl}/user/${location}`).then((detalle) =>
      dispatch({
        type: USER_LOCATION,
        payload: detalle.data,
      })
    );
  };
}

export function updateUser(email, data) {
  return async function (dispatch) {
    await axios.put(`${baseUrl}/user/${email}`, data).then((detalle) =>
      dispatch({
        type: UPDATE,
        payload: detalle.data,
      })
    );
  };
}

export function bannedState(id, data) {
  return async function (dispatch) {
    try {
      await axios.put(`${baseUrl}/users/${id}`, data).then((detalle) =>
        dispatch({
          type: NEW_BANNED_STATE,
          payload: detalle.data,
        })
      );
    } catch (error) {
      console.log("imposible de bannear, tamo en la V.I.P 😎");
    }
  };
}

export function adminState(id, data) {
  return async function (dispatch) {
    await axios.put(`${baseUrl}/userr/${id}`, data).then((detalle) =>
      dispatch({
        type: ADMIN_UPDATE,
        payload: detalle.data,
      })
    );
  };
}

//ACTION PARA LOS SERVICIOS
export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`${baseUrl}/services/${id}`);

      return dispatch({
        type: GET_DETAILS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAllServices() {
  return async function (dispatch) {
    const dataDb = await axios(`${baseUrl}/services`);
    return dispatch({
      type: GET_ALL_SERVICES,
      payload: dataDb.data,
    });
  };
}

export function getAllCategories() {
  return async function (dispatch) {
    const dataDb = await axios(`${baseUrl}/category`);
    return dispatch({
      type: GET_ALL_CATEGORIES,
      payload: dataDb.data,
    });
  };
}

export function sortServices(payload) {
  return {
    type: SORT_SERVICES,
    payload: payload,
  };
}

export function getName(name) {
  return async (dispatch) => {
    const dataDb = await axios(`${baseUrl}/services/search?name=` + name);
    return dispatch({
      type: SERVICE_NAME,
      payload: dataDb.data,
    });
  };
}

export function postService(service) {
  return async function (dispatch) {
    await axios.post(`${baseUrl}/services`, service).then((detalle) =>
      dispatch({
        type: REGISTER_SERVICE,
        payload: detalle.data,
      })
    );
  };
}

export function updateService(id, service) {
  return async function (dispatch) {
    await axios.put(`${baseUrl}/services/${id}`, service).then((detalle) =>
      dispatch({
        type: UPDATE_SERVICE,
        payload: detalle.data,
      })
    );
  };
}

export function getServiceById(id) {
  return async function (dispatch) {
    await axios.get(`${baseUrl}/services/${id}`).then((detalle) =>
      dispatch({
        type: GET_SERVICE_ID,
        payload: detalle.data,
      })
    );
  };
}

export function deleteService(id) {
  return async function (dispatch) {
    await axios.delete(`${baseUrl}/services/${id}`).then((detalle) =>
      dispatch({
        type: DELETE_SERVICES,
        payload: detalle.data,
      })
    );
  };
}

//ACTION PARA LAS CATEGORIAS

export function deleteCategory(id) {
  return async function (dispatch) {
    await axios.delete(`${baseUrl}/category/${id}`).then((detalle) =>
      dispatch({
        type: DELETE_CATEGORY,
        payload: detalle.data,
      })
    );
  };
}

export function searchCategory(name) {
  return async function (dispatch) {
    await axios.get(`${baseUrl}/category/search?name=${name}`).then((detalle) =>
      dispatch({
        type: SEARCH_CATEGORY,
        payload: detalle.data,
      })
    );
  };
}

export function filterByCategory(payload) {
  return {
    type: FILTER_SERVICES,
    payload: payload,
  };
}

export function postCategory(category) {
  return async function (dispatch) {
    await axios.post(`${baseUrl}/category`, category).then((detalle) =>
      dispatch({
        type: POST_CATEGORY,
        payload: detalle.data,
      })
    );
  };
}

//ACTION PARA LAS REQUEST
export function postRequest(request) {
  return async function (dispatch) {
    await axios.post(`${baseUrl}/request`, request).then((data) =>
      dispatch({
        type: POST_REQUEST,
        payload: data.data,
      })
    );
  };
}

export function updateRequest(state) {
  return async function (dispatch) {
    await axios.put(`${baseUrl}/request`, state).then((detalle) =>
      dispatch({
        type: UPDATE_REQUEST,
        payload: detalle.data,
      })
    );
  };
}

export function deleteRequest(id) {
  return async function (dispatch) {
    await axios.delete(`${baseUrl}/request/${id}`).then((detalle) =>
      dispatch({
        type: DELETE_REQUEST,
        payload: detalle.data,
      })
    );
  };
}

export function allRequest() {
  return async function (dispatch) {
    await axios.get(`${baseUrl}/request`).then((detalle) =>
      dispatch({
        type: ALL_REQUEST,
        payload: detalle.data,
      })
    );
  };
}

// NOTIFICACIONES

export function allNotifications() {
  return async function (dispatch) {
    await axios.get(`${baseUrl}/notifications`).then((detalle) =>
      dispatch({
        type: ALL_NOTIFICATIONS,
        payload: detalle.data,
      })
    );
  };
}

export function postNotification(noti) {
  return async function (dispatch) {
    await axios.post(`${baseUrl}/notifications`, noti).then((detalle) =>
      dispatch({
        type: POST_NOTIFICATION,
        payload: detalle.data,
      })
    );
  };
}

export function deleteNotification(id) {
  return async function (dispatch) {
    await axios.delete(`${baseUrl}/notifications/${id}`).then((detalle) =>
      dispatch({
        type: DELETE_NOTIFICATION,
        payload: detalle.data,
      })
    );
  };
}

export function allUsers() {
  return async function (dispatch) {
    const dataDb = await axios(`${baseUrl}/user`);
    return dispatch({
      type: ALL_USERS,
      payload: dataDb.data,
    });
  };
}
export function userById(userId) {
  return async function (dispatch) {
    const dataDb = await axios(`${baseUrl}/users/${userId}`);
    return dispatch({
      type: USER_BY_ID,
      payload: dataDb.data,
    });
  };
}

//REVIEWS
export function postReview(data) {
  return async function (dispatch) {
    await axios.post(`${baseUrl}/reviews`, data).then((detalle) =>
      dispatch({
        type: POST_REVIEW,
        payload: detalle.data,
      })
    );
  };
}

export function getAllReviews() {
  return async function (dispatch) {
    const dataDb = await axios(`${baseUrl}/reviews`);
    return dispatch({
      type: ALL_REVIEWS,
      payload: dataDb.data,
    });
  };
}
