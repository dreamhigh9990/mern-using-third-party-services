import { createBrowserHistory } from 'history';
import qs from 'qs';
import get from 'lodash/get';

const browserHistory = createBrowserHistory();

export function getQuery() {
  const { location } = browserHistory;

  return qs.parse(location.search, { ignoreQueryPrefix: true });
}

export function getQueryParam(param) {
  const query = getQuery();
  return get(query, param);
}

export function buildUrl(pathname, params) {
  const strParams = qs.stringify(params, {
    encodeValuesOnly: true,
    skipNulls: true
  });
  return `${pathname}?${strParams}`;
}

export function goToPage(pathname, params) {
  browserHistory.push({
    pathname,
    search: qs.stringify(params, { encodeValuesOnly: true, skipNulls: true })
  });
}

export function silentPushState(newUrl) {
  window.history.pushState('', '', newUrl);
}

export default browserHistory;
