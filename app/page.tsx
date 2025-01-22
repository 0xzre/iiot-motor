'use client';

import MotorControl from "@/components/motor-control";
import React, { useEffect } from "react";
import useMqtt from "@/app/useMqtt";

export default function Page() {
  const brokerUrl = process.env.MQTT_URL || "ws://localhost:8082"; // Default if unset
  const options = { clientId: "react-mqtt-client" };
  const { client, isConnected } = useMqtt(brokerUrl, options);

  useEffect(() => {
    if (isConnected && client) {
      // Subscribe to the
      client.subscribe("PLC_Motor", (err) => {
        if (err) {
          console.error("Failed to subscribe:", err);
        } else {
          console.log("Subscribed to topic: PLC_Motor");
        }
      });

    }
  }, [isConnected, client]);

  return <MotorControl client={client!} />;
}
