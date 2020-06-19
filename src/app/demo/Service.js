import CommonService from '../../service/CommonService';
import { Remote } from '../../util';

class Service extends CommonService {
    getList(params) {
        return Remote.get('/customer/query.do', params);
    }
}

export default new Service();
