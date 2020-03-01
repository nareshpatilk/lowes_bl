/**
 * Calls db to fetch details of dao data
 * @param {Integer} userId
 */
let callDb = async (userId) => {
    try {
        const details = "data";
        console.log('Successfully getting dao details {{in dao}}');
        return details;
    } catch (error) {
        console.log('Error in getting dao details {{in dao}}', error);
        throw error;
    }
}

module.exports = {
    callDb: callDb
}