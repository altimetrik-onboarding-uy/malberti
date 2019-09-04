import sv from '../api/savings';

export const signIn = (userId, origin, name) => {
    return {
        type: 'SIGN_IN',
        payload: {userId, origin, name}
    }
}

export const signOut = () => {
    return { 
        type: 'SIGN_OUT'
    }
}


export const addSaving = (saving) => async (dispatch) =>{
    
    const response = await sv.post('/savings', saving);

    dispatch({
        type: 'ADD_SAVING',
        payload: response.data
    })
}

export const editSaving = (saving) => async (dispatch) =>{

    const response = await sv.put(`/savings/${saving.userId}`, saving);

    dispatch({
        type: 'EDIT_SAVING',
        payload: response.data 
    });
}

export const fetchSavings = () => async (dispatch) =>{

    const response = await sv.get(`/savings`);

    dispatch({
        type: 'FETCH_SAVNGS',
        payload: response.data
    })
}