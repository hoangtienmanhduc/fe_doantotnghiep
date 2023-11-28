// AUTH STATE
export function clearStorage() {
    localStorage.clear();
}
export function isAuthenticated() {
    return !!getUserId() && !!getAccessToken();
}

// ACCESS TOKEN
export function setUserToken({ token, refreshToken, xApiKey }) {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('xApiKey', xApiKey);
}

export function setAccessToken(accessToken) {
    localStorage.setItem('accessToken', accessToken);
}
export function getAccessToken() {
    return localStorage.getItem('accessToken');
}
export function removeAccessToken() {
    localStorage.removeItem('accessToken');
}

// REFRESH TOKEN
export function setRefreshToken(refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
}
export function getRefreshToken() {
    return localStorage.getItem('refreshToken');
}
export function removeRefreshToken() {
    localStorage.removeItem('refreshToken');
}

// X-API-KEY
export function setXApiKey(xApiKey) {
    localStorage.setItem('xApiKey', xApiKey);
}
export function getXApiKey() {
    return localStorage.getItem('xApiKey');
}
export function removeXApiKey() {
    localStorage.removeItem('xApiKey');
}

// USER INFO
export function setUserInfo({ id, username, systemRole }) {
    localStorage.setItem('id', id);
    localStorage.setItem('username', username);
    localStorage.setItem('systemRole', systemRole);
}

export function getUserId() {
    return !!localStorage.getItem('id') && JSON.parse(localStorage.getItem('id'));
}

export function getUsername() {
    return localStorage.getItem('username');
}

export function getSystemRole() {
    return localStorage.getItem('systemRole');
}

// SESSION
export function setSessionId(sessionId) {
    localStorage.setItem('sessionId', sessionId);
}
export function getSessionId() {
    return localStorage.getItem('sessionId');
}
export function removeSessionId() {
    localStorage.removeItem('sessionId');
}

// USER ROLE
export const SystemRoles = {
    ADMIN: 'admin',
    USER: 'user',
};

export function setUserRole(userRole) {
    localStorage.setItem('userRole', userRole);
}
export function getUserRole() {
    return localStorage.getItem('userRole');
}
export function removeUserRole() {
    localStorage.removeItem('userRole');
}

export function storeAllUserData(data) {
    setUserInfo(data?.userInfo);
    setUserToken(data?.userToken);
    setXApiKey(data?.xApiKey);
    setSessionId(data?.sessionId);
}

// ATTEMPT
export function getAuthAttempt() {
    return localStorage.getItem('attempt');
}

export function setAuthAttempt(attempt) {
    localStorage.setItem('attempt', attempt);
}

export function removeAuthAttempt() {
    localStorage.removeItem('attempt');
}
