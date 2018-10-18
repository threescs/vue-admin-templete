import httpService from '@/services/httpService';

const serverPath = window.location.origin;
const zbApi = "/zb_gateway";
const CommonService = {
  formData: (obj) => { // FormData
    const data = new FormData();
    for (const _attr in obj) {
      if (obj.hasOwnProperty(_attr)) {
        data.append(_attr, obj[_attr]);
      }
    }
    return data;
  },
};

export default CommonService;
