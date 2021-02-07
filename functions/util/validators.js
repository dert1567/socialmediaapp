



const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true
    else return false
}

const isEmpty = (string) => {
    if (string.trim() === '') return true;
    else return false
}

exports.validateSignupData = (data) => {
    let errors = {};

    if (isEmpty(data.email)) {
        errors.email = 'Must not be emty'
    } else if (!isEmail(data.email)) {
        errors.email = "Must be valid emial adress"
    }


    if (isEmpty(data.password)) errors.password = 'Must nor be empty'
    if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords must be the same'


    if (isEmpty(data.handle)) errors.handle = 'Must nor be empty'


    
return{
    errors,
    valid: Object.keys(errors).length === 0 ? true : false 
}

}

exports.validateLoginDate = (data) => {
    let errors = {};

    if (isEmpty(data.email)) errors.email = 'Must not be empty'
    if (isEmpty(data.password)) errors.password = 'Must not be empty'

    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    return{
        errors,
        valid: Object.keys(errors).length === 0 ? true : false 
    } 

}


exports.reduceUserDetails = (data) => {
    let userDetails = {};
    if(!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
    if(!isEmpty(data.website.trim())){
        if(data.website.trim().substring(0, 4) !=='http') {
            userDetails.website = `http://${data.website.trim()}`
        } else userDetails.website = data.website;

        
    }
    if(!isEmpty(data.location.trim())) userDetails.location = data.location;

    return userDetails;
    

}