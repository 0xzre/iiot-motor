import { useState, useEffect } from 'react';
import mqtt from 'mqtt';

const useMqtt = (brokerUrl, options) => {
  const [client, setClient] = useState<mqtt.MqttClient|null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const mqttClient = mqtt.connect(brokerUrl, options);

    mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');
      setIsConnected(true);
    });

    // mqttClient.on('message', (topic, message) => {
    //   console.log(`Received message: ${message.toString()} from topic: ${topic}`);
    //   setMessages((prevMessages) => [...prevMessages, { topic, message: message.toString() }]);
    // });

    mqttClient.on('error', (err) => {
      console.error('Connection error: ', err);
      mqttClient.end();
    });

    setClient(mqttClient);

    // Cleanup on unmount
    return () => {
      if (mqttClient) mqttClient.end();
    };
  }, []);

  return { client, isConnected, messages };
};

export default useMqtt;
