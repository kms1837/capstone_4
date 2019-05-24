module.exports = {
    async loginCheck(request, response) {
        if (request.session.name) {
        } else {
            response.redirect('/login');
        }
    }
}