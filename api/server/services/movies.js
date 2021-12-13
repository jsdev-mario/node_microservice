const axios = require('axios');

class MoviesService {
    constructor({ serviceRegistryUrl, serviceVersionIdentifier }) {
        this.serviceRegistryUrl = serviceRegistryUrl;
        this.serviceVersionIdentifier = serviceVersionIdentifier;
    }

    async getMovie(id) {
        const { ip, port } = await this.getService('movies');
        return axios.get(`http://${ip}:${port}/${id}`);
    }

    async retrieveMovies(params) {
        const { ip, port } = await this.getService('movies');
        return axios.get(`http://${ip}:${port}`, { params });
    }

    async createMovie(data) {
        const { ip, port } = await this.getService('movies');
        return axios.post(`http://${ip}:${port}`, data);
    }

    async updateMovie(data) {
        const { ip, port } = await this.getService('movies');
        return axios.put(`http://${ip}:${port}`, data);
    }

    async deleteMovie(id) {
        const { ip, port } = await this.getService('movies');
        return axios.delete(`http://${ip}:${port}`, { params: { id } });
    }

    async getService(servicename) {
        const response = await axios.get(`${this.serviceRegistryUrl}/${servicename}/${this.serviceVersionIdentifier}`);
        return response.data;
    }
}

module.exports = MoviesService;
