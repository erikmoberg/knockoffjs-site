export class HttpAdapter {
    async getJson(url) {
        return await fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                return response;
            });
    }
}