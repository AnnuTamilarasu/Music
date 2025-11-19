const APIController = (function() {
    const client id = '';
    const clientSecret = '';

    const _get Token = async() =>{
        const result = await fetch('https://accounts.spotify.com/api/token'){
            method: 'POST',
            headers:{
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic' + btoa
            }
        }
    }
});