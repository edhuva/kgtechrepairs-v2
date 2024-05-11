const sendContacts = ({email, message}) => {
    if (email && message) {
        console.log('true data')
        console.log(email)
        console.log(message)
        return true;
    }
    //  else {
    //     console.log('false data')
    //     return new Error({ error: 'Invalid Data'});
    // }
}

export default sendContacts