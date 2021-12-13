const axios = require('axios');

class GenresService {
    constructor({ serviceRegistryUrl, serviceVersionIdentifier }) {
        this.serviceRegistryUrl = serviceRegistryUrl;
        this.serviceVersionIdentifier = serviceVersionIdentifier;
    }

    async getGenre(id) {
        const { ip, port } = await this.getService('genres');
        return axios.get(`http://${ip}:${port}/${id}`);
    }

    async retrieveGenres(params) {
        const { ip, port } = await this.getService('genres');
        return axios.get(`https://${ip}:${port}`, { params });
    }

    async createGenre(data) {
        const { ip, port } = await this.getService('genres');
        return axios.post(`http://${ip}:${port}`, data);
    }

    async updateGenre(data) {
        const { ip, port } = await this.getService('genres');
        return axios.put(`http://${ip}:${port}`, data);
    }

    async deleteGenre(id) {
        const { ip, port } = await this.getService('genres');
        return axios.delete(`http://${ip}:${port}`, { params: { id } });
    }

    async getService(servicename) {
        const response = await axios.get(`${this.serviceRegistryUrl}/${servicename}/${this.serviceVersionIdentifier}`);
        return response.data;
    }
}

module.exports = GenresService;
