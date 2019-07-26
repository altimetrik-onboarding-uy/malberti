import { getImgs } from '../apis/getImages'

export const logIn = (user) => {
    return {
        type: 'LOG_IN',
        payload: user
    }
}

export const logOut = () => { 
    return { 
        type: 'LOG_OUT',
        payload: null
    } 
}

export const createAccount = (newUser, newPassword) => {
    return{
        type: 'CREATE_ACCOUNT',
        payload: {
            user: newUser,
            password: newPassword,
            admin: false
        }
    }
}

export const deleteAccount = (user) =>{
    return{
        type: 'DELETE_ACCOUNT',
        payload: user
    }
}

export const actUser = (user) =>{
    return{
        type: 'ACT_USER',
        payload: user
    }
}

export const fetchImages = () => async dispatch => {
    const respuesta = await getImgs();
    dispatch({
        type: 'GET_IMAGES',
        payload: respuesta
    })
}