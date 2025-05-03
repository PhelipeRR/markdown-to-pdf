import amqplib from "amqplib";
import dotenv from "dotenv";

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";

async function testConnection() {
  try {
    const connection = await amqplib.connect(RABBITMQ_URL);
    console.log("✅ Conectado ao RabbitMQ!");
    await connection.close();
  } catch (error) {
    console.error("❌ Erro ao conectar ao RabbitMQ:", error);
  }
}

testConnection();
