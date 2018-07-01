
module.exports = handlers = {};

handlers.ping = (data, cb) => {
    cb(200);
};

handlers.notFound = (data, cb) => {
    cb(404);
};
