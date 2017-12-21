class Spotify {
    constructor({ client_id, callback_address }) {
        this.client_id = client_id;
        this.callback_address = callback_address;
        this.generate_url = '';
        this.checkToken();
        this.access_token = localStorage.getItem('access_token');
    }

    /**
     * This method will return header informations.
     * @return {Object} returns header
     */
    headers() {
        return {
            'Authorization': 'Bearer ' + this.access_token
        }
    }

    /**
     * This method checking is there hash in window.location.
     * If there is hash, pop-up window will close.
     */
    checkToken() {
        window.addEventListener('DOMContentLoaded', () => {
            if (window.location.hash) {
                let hash = window.location.hash;
                let access_token = hash.split('#access_token=')[1].split('&')[0];
                localStorage.setItem('access_token', access_token);

                window.location.hash = `access_token=${localStorage.getItem('access_token')}`;
                window.close();
            }
        })
    }

    /**
     * This method returns generated oauth url
     * @return {string} this.generate_url Generated url
     */
    generateUrl() {
        this.generate_url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${this.client_id}&redirect_uri=${this.callback_address}&scope=user-read-email`

        return this.generate_url;
    }

    /**
     * You'll use this method for the authentication. You need an HTML element. Instead of login button.
     * @param {string} el The property of html element to select.
     * @param {function} [callback] The callback function to get some information. Optional
     * @example
     *  spotify.login('.btn');
     * 
     * @example
     * 
     *  spotify.login('.btn', (data) => {
     *      data.btn.display = 'none';
     *      console.log(data.url);
     *  })
     */
    login(el, callback) {
        let btn = document.querySelector(el);

        let width = 450;
        let height = 730;
        let left = (screen.width / 2) - (width / 2);
        let top = (screen.height / 2) - (height / 2);

        btn.addEventListener("click", () => {

            window.open(this.generateUrl(), 'Spotify', 'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);

        });

        if (callback) {
            let data = {
                btn: btn,
                url: this.generateUrl()
            }
            callback(data);
        }

    }

    /**
     * This method will information about your account
     * @return {Promise} Return Promise with fetch method
     * 
     * @example
     * 
     * spotify.me().then(resp => {
     *  console.log("me", resp);
     * })
     */
    me() {
        return fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: this.headers()
        })
            .then(resp => resp.json())
            .then(obj => obj)
            .catch(error => error);
    }

    /** 
     * This method will return data you searched. Data type must be object.
     * @param {Object} query Artist or song name whatever you want egg: Lil Wayne
     * @param {Object} type track, artist
     * @param {Object} [market] Your country code egg: TR
     * @param {Object} [limit] How many results will return at one time.
     * @param {Object} [offset] The starting position of data. Instead of pagination.
     * 
     * @return {Promise} Return Promise with fetch method
     * 
     * @example
     * 
     * spotify.search({
     *   query: 'Tarkan',
     *   type: 'track,artist',
     * }).then(resp => {
     *   console.log(resp);
     * })
     *  {@link Also, check out https://beta.developer.spotify.com/documentation/web-api/reference/search/search/ Spotify}.
     * 
    */
    search(data) {

        let extras = ['market', 'limit', 'offset'];

        extras.forEach((k, v) => {
            if (data[k]) {
                data[k] = `&${k}=${data[k]}`
            } else {
                data[k] = '';
            }
        });

        let extra_fields = `${data.market}${data.limit}${data.offset}`;

        let url = `https://api.spotify.com/v1/search?q=${data.query}&type=${data.type}${extra_fields}`;

        return fetch(url, {
            method: 'GET',
            headers: this.headers()
        })
            .then(resp => resp.json())
            .then(obj => obj)
            .catch(error => error);
    }

    /**
     * This method will return information about an album.
     * @param {Object} id AlbumID required
     * @param {Object} [market] Optional market filter
     * 
     * @return {Promise} Return Promise with fetch method
     * 
     * @example
     * 
     * spotify.album({
     *     id: '4fJzakARJP2UfOjSj5Q9s1',
     *     market: 'TR'
     * }).then(resp => {
     *     console.log(resp)
     * });
     */
    album(data) {

        let extras = ['market'];

        extras.forEach((k, v) => {
            if (data[k]) {
                data[k] = `?${k}=${data[k]}`
            } else {
                data[k] = '';
            }
        });

        let url = `https://api.spotify.com/v1/albums/${data.id}${data.market}`;

        return fetch(url, {
            method: 'GET',
            headers: this.headers()
        })
            .then(resp => resp.json())
            .then(obj => obj)
            .catch(error => error);
    }

    /**
     * This method will return information about albums.
     * @param {Object} ids multiple ids with comma - required
     * @param {Object} [market] Optional market filter
     * 
     * @return {Promise} Return Promise with fetch method
     * 
     * @example
     * 
     * spotify.albums({
     *     ids: '4fJzakARJP2UfOjSj5Q9s1,06EBiLh3V0q2dOUdXnic7e',
     *     market: 'TR'
     * }).then(resp => {
     *     console.log(resp)
     * });
     */
    albums(data) {
        let extras = ['market'];

        extras.forEach((k, v) => {
            if (data[k]) {
                data[k] = `&${k}=${data[k]}`
            } else {
                data[k] = '';
            }
        })

        let url = `https://api.spotify.com/v1/albums?ids=${data.ids}${data.market}`;

        return fetch(url, {
            method: 'GET',
            headers: this.headers()
        })
            .then(resp => resp.json())
            .then(obj => obj)
            .catch(error => error);
    }

    /** 
     * This method will return tracks of album.
     * @param {Object} id album id
     * @param {Object} [market] Your country code egg: TR
     * @param {Object} [limit] How many results will return at one time.
     * @param {Object} [offset] The starting position of data. Instead of pagination.
     * 
     * @return {Promise} Return Promise with fetch method
     * 
     * @example
     * 
     * spotify.tracks({
     *   id: '4fJzakARJP2UfOjSj5Q9s1',
     *   market: 'TR',
     *   limit: 10,
     *   offset: 1
     * }).then(resp => {
     *   console.log(resp);
     * })
     * 
    */
    tracks(data) {
        let extras = ['market', 'limit', 'offset'];

        extras.forEach((k, v) => {
            if (data[k]) {
                data[k] = `&${k}=${data[k]}`
            } else {
                data[k] = '';
            }
        });

        let extra_fields = `?${data.market}${data.limit}${data.offset}`.replace('?&', '?');

        let url = `https://api.spotify.com/v1/albums/${data.id}/tracks${extra_fields}`;

        return fetch(url, {
            method: 'GET',
            headers: this.headers()
        })
            .then(resp => resp.json())
            .then(obj => obj)
            .catch(error => error);
    }

    artist(id) {
        let url = `https://api.spotify.com/v1/artists/${id}`;

        return fetch(url, {
            method: 'GET',
            headers: this.headers()
        })
            .then(resp => resp.json())
            .then(obj => obj)
            .catch(error => error);
    }
}

module.exports = Spotify;