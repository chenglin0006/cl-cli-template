import { Remote } from '../util';

class CommonService {
    delay = (time) => {
        return new Promise((resolve) => {
            return setTimeout(() => {
                return resolve();
            }, time);
        });
    };

    getMenus() {
        return Remote.get('/menu/list.do');
    }

    getAreaInit() {
        return Remote.get('/area/getState.do');
    }

    getCity(params) {
        return Remote.get('/area/getCity.do', params);
    }

    getCounty(params) {
        return Remote.get('/area/getCounty.do', params);
    }

    getStreet(params) {
        return Remote.get('/area/getStreet.do', params);
    }
}

export default CommonService;
