var unirest = require('unirest');

module.exports = (url) => {
    unirest.get('https://jsonwhois.com/api/v1/whois')
        .headers({
            'Accept': 'application/json',
            'Authorization': 'Token token=cb8299ec01e523b15e2ec12418aa661f'
        })
        .query({
            "domain": url
        })
        .end(function (response) {
            console.log(response.body.status);
            return response.body.status;
        });
}