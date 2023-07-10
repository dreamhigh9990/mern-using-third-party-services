import moment from 'moment';

export function getHumanizedDate(date) {
  return moment(date).format('MMM D, YYYY');
}

export function getAgo(date) {
  return moment(date).fromNow();
}

export default {
  getHumanizedDate
};
