'use client';

import MotorControl from "@/components/motor-control";
import React, { useEffect } from "react";
import useMqtt from "@/app/useMqtt";

export default function Page() {
  // Use WebSocket URL for browser-based MQTT
  const brokerUrl = "ws://localhost:8082"; // Ensure your broker is set up for WebSocket on port 9001
  const options = { clientId: "react-mqtt-client" }; // Add options as needed
  const { client, isConnected, messages } = useMqtt(brokerUrl, options);

  useEffect(() => {
    if (isConnected && client) {
      // Subscribe to a topic
      client.subscribe("PLC_Motor", (err) => {
        if (err) {
          console.error("Failed to subscribe:", err);
        } else {
          console.log("Subscribed to topic: PLC_Motor");
        }
      });

      // // Publish a message
      // client.publish("PLC_Motor", "Hello MQTT", (err) => {
      //   if (err) {
      //     console.error("Failed to publish:", err);
      //   } else {
      //     console.log("Message published to PLC_Motor");
      //   }
      // });
    }
  }, [isConnected, client]);

  return <MotorControl client={client} />;
}
