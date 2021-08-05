const { Kafka } = require("kafkajs")

const clientId = "my-app";

const brokers = ["10.0.10.51:7001"];

const topic = "message-log";

const kafka = new Kafka({ clientId, brokers });

const consumer = kafka.consumer({ groupId: clientId })

const consume = async () => {
	// first, we wait for the client to connect and subscribe to the given topic
	await consumer.connect()
	await consumer.subscribe({ topic })
	await consumer.run({
		// this function is called every time the consumer gets a new message
		eachMessage: ({ message }) => {
			// here, we just log the message to the standard output
			console.log(`received message: ${message.value.data}`)
		},
	})
}

module.exports = {
    consume : consume
}