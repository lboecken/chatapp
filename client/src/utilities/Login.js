export function setLogin() {
  sessionStorage.setItem('TEST_TOKEN', 'authUser');
}

export function clearLogin() {
  sessionStorage.removeItem('TEST_TOKEN');
}

export function isLogin() {
  if (sessionStorage.getItem('TEST_TOKEN')) {
    return true;
  }
  return false;
}
