import Api from './api'

const endpoints = {
    login: '/auth/login',
    register: '/auth/register',
    refresh: '/auth/refresh-tokens',
    resetPassword: '/auth/reset-password',
    forgotPassword: '/auth/forgot-password',
}

export const login = async (email, password) =>
    await Api.post(endpoints.login, {
        email,
        password,
    })

export const register = async (name, email, password) =>
    await Api.post(endpoints.register, {
        name,
        email,
        password,
    })

export const refreshToken = async (token) =>
    await Api.post(endpoints.refresh, {
        refreshToken: token.refresh.token
    })   
