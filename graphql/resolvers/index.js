const notesResolver = require('./notes');
const authResolver = require('./auth');

const rootResolver = {
    ...notesResolver,
    ...authResolver
};

module.exports = rootResolver;