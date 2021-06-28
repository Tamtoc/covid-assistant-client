const url = "http://18.119.66.249:10004";

export default {
    
    login : userCredentials =>{
        console.log(userCredentials);
        return fetch(url + '/auth/login',{
            method : "post",
            body : JSON.stringify(userCredentials),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => {
            if(res.ok)
                return res.json().then(data => {
                    const { user: userRes, token } = data;
                    const { id, email, first_name: firstName, last_name: lastName, role, img } = userRes;
                    
                    localStorage.setItem( 'Authorization', token );
                    return { isAuthenticated: true, user: { id, email, firstName, lastName, role, img } };
                });
            else
                return { isAuthenticated : false, user : { id: "", email : "", firstName: "", lastName: "", role : "", img: null}};
        })
    },
    signup : user =>{
        console.log(user);
        return fetch(url + '/users',{
            method : 'post',
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => {
            if ( res.ok ) {
                return res.json().then( data => {
                    const { user: userRes } = data;
                    const { email, first_name, last_name, role, img } = userRes;
                    const errors = [ { msg: 'Account successfully created' } ]

                    return { email, first_name, last_name, role, img, messages: { error: false, errors } };
                });
            } else {
                return res.json().then( error => {
                    const  { errors } = error;
                    return { messages: { error: true, errors } }
                })
            }
        })
    },
    logout : ()=>{
        localStorage.clear();
    },
    isAuthenticated : async () =>{

        const token = localStorage.getItem('Authorization');
        if ( !token ) return { isAuthenticated : false, user : { id: "", email : "", firstName: "", lastName: "", role : "", img: null}};

        const res = await fetch(url + '/auth/review', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        if (res.ok)
            return res.json().then(data => {
                const { user: userRes } = data;
                const { id, email, first_name: firstName, last_name: lastName, role, img } = userRes;

                return { isAuthenticated: true, user: { id, email, firstName, lastName, role, img } };
            });

        else
            return { isAuthenticated: false, user: { id: "", email : "", firstName: "", lastName: "", role : "", img: null} };
    }

}