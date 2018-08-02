var getUser = (id, callbacks) => {
    var user = {
        id,
        name : 'Vikram'
    };
    setTimeout(() => {
        callbacks(user);
    }, 4000);
};
getUser(31, (user) => {
    console.log(user);
});