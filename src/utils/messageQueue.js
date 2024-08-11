const { StatusCodes } = require("http-status-codes");
const amqplib = require("amqplib");
const AppError = require("./errors/app-error");
const {
  MESSAGE_BROKER_URL,
  EXCHANGE_NAME,
  QUEUE_NAME,
} = require("../config/serverConfig");

const createChannel = async () => {
  try {
    const connection = await amqplib.connect(MESSAGE_BROKER_URL); // create connection
    const channel = await connection.createChannel(); // create channel
    await channel.assertExchange(EXCHANGE_NAME, "direct", false); //create exchange
    return channel;
  } catch (err) {
    throw new AppError(
      "AppError",
      "Something went wrong in product service create channel",
      err.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const publishMessage = async (channel, binding_key, message) => {
  try {
    await channel.publish(
      EXCHANGE_NAME, // Exchange name
      binding_key, // Routing key (binding key)
      Buffer.from(message), // Message content
      { persistent: true } // Message persistence
    );
  } catch (err) {
    throw new AppError(
      "AppError",
      "Something went wrong in product service publish channel",
      err.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const subscribeMessage = async (channel, service, binding_key, queue_name) => {
  try {
    const authQueue = await channel.assertQueue(queue_name, {
      // to make sure queue is not lost in case connection is down
      durable: true,
    });
    // to ensure fair dispatch to multiple consumer
    channel.prefetch(1);
    await channel.bindQueue(authQueue.queue, EXCHANGE_NAME, binding_key);
    await channel.consume(authQueue.queue, (msg) => {
      console.log("received data");
      console.log(msg.content.toString());
      const payload = JSON.parse(msg.content.toString());
      service && service(payload);
      channel.ack(msg);
    });
  } catch (err) {
    throw new AppError(
      "AppError",
      "Something went wrong in product service subscribe channel",
      err.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = {
  createChannel,
  publishMessage,
  subscribeMessage,
};
