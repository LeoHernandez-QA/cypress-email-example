const sample = require('./cypress/fixtures/fetchmessages.json');
console.log(sample);

test = sample.msgs.find(
    (
        email
    ) =>
        email.subject == "Recovery password" &&
        email.seconds_ago == 21)

console.log(test.id)