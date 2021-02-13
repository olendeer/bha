
export function checkAuth(){
    return localStorage.getItem('auth')
}

export function setAuth(){
    localStorage.setItem('auth', 'authenticated')
}
