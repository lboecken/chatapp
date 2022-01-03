import axios from 'axios';

export function getUtcSecondsSinceEpoch() {
  const now = new Date();
  const utcMilllisecondsSinceEpoch = now.getTime();
  const utcSecondsSinceEpoch = Math.round(utcMilllisecondsSinceEpoch / 1000);
  return utcSecondsSinceEpoch;
}

export function getPossibleRooms() {
  axios('./api/get-possible-rooms').then((response) => {
    console.log(response['data']);
    console.log(response);
    return response['data'];
  });
}
