// How to Globally Mock an External Library in Jest
// https://medium.com/@justintulk/how-to-mock-an-external-library-in-jest-140ac7b210c2

global.callback = (error, response) => (error || response)
global.event = require('./event.json');