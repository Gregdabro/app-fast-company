import httpService from "./http.service";

const qualityEndpoint = "quality/";
const qualityService = {
    fetchAll: async() => {
        const { data } = await httpService.get(qualityEndpoint);
        return data;
    },
    get: async(id) => {
        const { data } = await httpService.get(qualityEndpoint + id);
        return data;
    }
};

export default qualityService;
