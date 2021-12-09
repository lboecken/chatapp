export function setLogin() {
  localStorage.setItem('TEST_TOKEN', 'authUser');
}

export function clearLogin() {
  localStorage.removeItem('TEST_TOKEN');
}

export function isLogin() {
  if (localStorage.getItem('TEST_TOKEN')) {
    return true;
  }
  return false;
}
