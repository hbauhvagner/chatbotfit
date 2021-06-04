const dialogflow = require('dialogflow');
const configs = require('./dio-bot-fit.json');

const sessionCliente = new dialogflow.SessionsClient({
    projectId: configs.project_id,
    credentials: {
        private_key: configs.private_key,
        client_email: configs.client_email
    }
});

async function sendMessage(chatId, message) {
    const sessionPath = sessionCliente.sessionPath(configs.project_id, chatId);
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: 'pt-BR'
            }
        }
    }

    const responses = await sessionCliente.detectIntent(request);
    const result = responses[0].queryResult;
    return {
        text: result.fullfillmentText,
        intent: result.intent.displayName,
        fields: result.parameters.fields
    };
}


module.exports.sendMessage = sendMessage;