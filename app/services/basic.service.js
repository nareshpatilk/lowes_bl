const basicDao = require('../dao/basic.dao');
const basicMapper = require('../mapper/basic.mapper');
/**
 *This function calls to the dao function to gret from DB
 */

let basicServiceFun = async (userSeq) => {
    try {
        const res = await basicDao.callDb();
        res = (basicMapper.basicDto(res));
        console.log('Got dao data  {{in service}}');
        return res;
    } catch (error) {
        console.log('Error in fetching dao data  {{in service}}', error);
        throw error;
    }
};


module.exports = {
    basicServiceFun: basicServiceFun
}