import { useState, useEffect } from 'react';
import mqtt from 'mqtt';
import { IClientOptions } from 'mqtt';

const useMqtt = (brokerUrl: string, options: IClientOptions ) => {
  const [client, setClient] = useState<mqtt.MqttClient|null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!client)
      return;
    const mqttClient = mqtt.connect(brokerUrl, options);

    mqttClient.on('connect', () => {
      console.log(`Connected to MQTT broker ${brokerUrl}`);
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
  }, [brokerUrl, client, options]);

  return { client, isConnected };
};

export default useMqtt;
