import { GET_USERS_FAILURE, GET_USERS_REQUEST, GET_USERS_SUCCESS } from './actionTypes'

export const getUsersRequest = () => {
  return {
    type: GET_USERS_REQUEST as typeof GET_USERS_REQUEST,
  }
}

export const getUsersSuccess = () => {
  return {
    type: GET_USERS_SUCCESS as typeof GET_USERS_SUCCESS,
  }
}

export const getUsersFailure = () => {
  return {
    type: GET_USERS_FAILURE as typeof GET_USERS_FAILURE,
    error: true,
  }
}
export type Action = ReturnType<typeof getUsersRequest> | ReturnType<typeof getUsersSuccess>
