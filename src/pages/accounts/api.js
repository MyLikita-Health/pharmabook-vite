import { _fetchApi, _postApi } from '../../redux/action/api'

export function getAllServices(q = {}, callback = (f) => f, error = (f) => f) {
  _fetchApi(`/accounts/v1/query-services?${Object.keys(q).map(
      (a) => a + '=' + q[a],
    ).join('&')}`, callback, error)
}

export function postServices(data = {}, callback = (f) => f, error = (f) => f) {
    _postApi(`/accounts/v1/post-services`, data, callback, error)
  }

export function getBillingCategories(
  q = {},
  callback = (f) => f,
  error = (f) => f,
) {
  _fetchApi(
    `/accounts/v1/billing-categories?${Object.keys(q).map(
      (a) => a + '=' + q[a],
    ).join('&')}`,
    callback,
    error,
  )
}

export function getAccountHeads(q = {}, callback = (f) => f, error = (f) => f) {
  _fetchApi(
    `/accounts/v1/account-heads?${Object.keys(q).map((a) => a + '=' + q[a]).join('&')}`,
    callback,
    error,
  )
}
