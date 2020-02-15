const causeController = function () {

    const getCreateCause = function (context) {

        const loggedIn = storage.getData('userInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        context.loadPartials({
            header: './views/common/header.hbs',
            footer: './views/common/footer.hbs'
        }).then(function () {
            this.partial('./views/causes/createCause.hbs')
        });
    }

    const postCreateCause = function (context) {
        causeModel.createCause(context.params)
            .then(helper.handler)
            .then(() => {
                homeController.getHome(context);
            })

    }

    const getDetailsCause = async function (context) {
        const loggedIn = storage.getData('userInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;

            let response = await causeModel.getCause(context.params.causeId);
            let cause = await response.json();

            Object.keys(cause).forEach((key) => {
                context[key] = cause[key];
            });

            context.isCreator = JSON.parse(storage.getData("userInfo"))._id === cause._acl.creator;
        }


        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
        }).then(function () {
            this.partial('../views/causes/detailsCause.hbs')
        });
    }

    const postDeleteCause = function (context) {
        causeModel.deleteCause(context.params.causeId)
        .then(helper.handler)
        .then((data) => {
            homeController.getHome(context);
        })
    }

    return {
        getCreateCause,
        postCreateCause,
        getDetailsCause,
        postDeleteCause,
    }
}();