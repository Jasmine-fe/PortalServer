import * as jwt from 'jsonwebtoken';

export const generateAccessToken = function(username) {
    const token = 'Bearer ' + jwt.sign(
        // token expired after a week
        { username: username }, process.env.TOKEN_SECRET, { expiresIn: '604800s' }
    )
    return token;
}


