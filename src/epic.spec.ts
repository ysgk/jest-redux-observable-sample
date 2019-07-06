// @ts-ignore
import { deepStrictEqual } from 'assert'
import { of, throwError } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'
import { GET_USERS, GET_USERS_FAILURE, GET_USERS_REQUEST, GET_USERS_SUCCESS } from './actionTypes'
import { fetchUsers } from './api'
import { getUsersEpic, getUsersRequestEpic } from './epic'

jest.mock('./api')

const createTestScheduler = (assert = deepStrictEqual) => {
  return new TestScheduler(assert)
}

it('', () => {
  const scheduler = createTestScheduler()

  scheduler.run((helpers) => {
    const { cold, expectObservable } = helpers
    const input$ = cold('-a', { a: { type: GET_USERS } })
    const expected = '-a'
    expectObservable(getUsersEpic(input$)).toBe(expected, { a: { type: GET_USERS_REQUEST } })
  })
})

it('', () => {
  const scheduler = createTestScheduler()
  scheduler.run((helpers) => {
    ;(fetchUsers as any).mockReturnValue(of(undefined))
    const { cold, expectObservable } = helpers
    const input$ = cold('-a', { a: { type: GET_USERS_REQUEST } })
    const expected = '-a'
    expectObservable(getUsersRequestEpic(input$)).toBe(expected, {
      a: { type: GET_USERS_SUCCESS },
    })
  })
})

it('', () => {
  const scheduler = createTestScheduler()
  scheduler.run((helpers) => {
    ;(fetchUsers as any).mockReturnValue(throwError(new Error()))
    const { cold, expectObservable } = helpers
    const input$ = cold('-a-b', { a: { type: GET_USERS_REQUEST }, b: { type: GET_USERS_REQUEST } })
    const expected = '-a-b'
    expectObservable(getUsersRequestEpic(input$)).toBe(expected, {
      a: { type: GET_USERS_FAILURE, error: true },
      b: { type: GET_USERS_FAILURE, error: true },
    })
  })
})
