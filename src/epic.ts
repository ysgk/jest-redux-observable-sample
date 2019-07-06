import { ofType } from 'redux-observable'
import { Observable, of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import { getUsersFailure, getUsersRequest, getUsersSuccess } from './actions'
import { GET_USERS, GET_USERS_REQUEST } from './actionTypes'
import { fetchUsers } from './api'

export const getUsersEpic = (action$: Observable<any>) => {
  return action$.pipe(
    ofType(GET_USERS),
    map(() => getUsersRequest())
  )
}

export const getUsersRequestEpic = (action$: Observable<any>) => {
  return action$.pipe(
    ofType(GET_USERS_REQUEST),
    mergeMap(() => {
      return fetchUsers().pipe(
        map(() => getUsersSuccess()),
        catchError(() => of(getUsersFailure()))
      )
    })
  )
}
