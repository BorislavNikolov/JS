const causeModel = function () {

    const createCause = function (params) {
        let data = {
            ...params,
            donors: [],
            collectedFunds: 0
        }

        let url = `/appdata/${storage.appKey}/causes`;

        let headers = {
            body: JSON.stringify(data),
            headers: {}
        }

        return requester.post(url, headers);

    }

    const getAllCauses = function () {
        let url = `/appdata/${storage.appKey}/causes`;
        let headers = {
            headers: {}
        }

        return requester.get(url, headers);
    }

    const getCause = function (id) {
        let url = `/appdata/${storage.appKey}/causes/${id}`;
        let headers = {
            headers: {}
        }

        return requester.get(url, headers);
    }

    const deleteCause = function (id) {

        let url = `/appdata/${storage.appKey}/causes/${id}`;
        let headers = {
            headers: {}
        }

        return requester.del(url, headers);
    }

    return {
        createCause,
        getAllCauses,
        getCause,
        deleteCause,
    }

}();