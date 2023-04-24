function validatepass(password){
    let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!\/%*?&])[A-Za-z\d@\/$!%*?&]{8,}$/;
    result = pattern.test(password);
    return result;
}

function validatemail(email){
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    result = mailformat.test(email);
    return result;
}

function validateUrl(url) {
    // return /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(url);
    return true;
}

module.exports = {
    validateUrl,
    validatemail,
    validatepass
}