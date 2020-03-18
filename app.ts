import feathers from '@feathersjs/feathers';

interface Message {
    id?: number;
    text: string;
}

class MessageService {
    messages: Message[] = [];

    async find() {
        return this.messages;
    }
    async  create (data: Pick<Message, 'text'>){
        const message: Message = {
            id: this.messages.length,
            text: data.text
        };
        this.messages.push(message);

        return message;
    }
}

const app = feathers();

app.use('messages', new MessageService());

app.service('messages').on('created', (message: Message) => {
    console.log('A new message has been created', message);
});

const main = async () => {
    await app.service('messages').create({
        text: 'Hello Feathers'
    });
    await app.service('messages').create({
        text: 'Hello again'
    });

    const messages = await app.service('messages').find();

    console.log('All messages', messages);
};

main();
