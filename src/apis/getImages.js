export function getImgs(){
    let list = fetch('https://api.unsplash.com/photos/?client_id=0f2094b1cd6e703a27ca8f9a0e3b662e067e88cb125308c70274dc44c5b335dc')
    .then(req => {
        return req.json()
    })
    .then(resp => {
        return resp
    });
    return list;
}