"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Gauge } from "@/components/gauge";
import { PowerChart } from "@/components/power-chart";
// import { Keypad } from "@/components/keypad";
// import { Toggle } from "@/components/toggle";
// import { SpeedInput } from "@/components/speed-input";
import { MqttClient } from "mqtt";

const MAX_SPEED = 2;
const MAX_RPM = 100;

export default function MotorControl({ client }: { client: MqttClient }) {
  // const [power, setPower] = useState(0);
  const [frequency, setFrequency] = useState(0.0);
  const [RPM, setRPM] = useState(0.0);
  const [isOn, setIsOn] = useState(false);
  const [direction, setDirection] = useState<"forward" | "reverse">("forward");
  const [status, setStatus] = useState("Off");
  const [time, setTime] = useState(new Date());
  const [refresh, setRefresh] = useState(false);

  // Simulate real-time updates
  // useEffect(() => {
  //   if (!isOn) {
  //     const interval = setInterval(() => {
  //       setPower((prev) => Math.min(1, prev + Math.random() * 5))
  //     }, 1000)
  //     return () => clearInterval(interval)
  //   } else {
  //     setPower(0)
  //   }
  // }, [isOn])

  useEffect(() => {
    client?.on("message", (topic, message) => {
      console.log(
        `Received message: ${message.toString()} from topic: ${topic}`
      );
      if (topic === "PLC_Motor") {
        console.log(message.toString());
        setRefresh(prev => !prev)
        const data = JSON.parse(message.toString());
        setFrequency(data.frequency);
        setRPM(data.encoder);
        setTime(new Date(data.date));
        setIsOn(data.power_status);
        setDirection(data.rotation_direction ? "forward" : "reverse");
        setStatus(
          data.digital_input == 0
            ? "Off"
            : data.digital_input == 1
            ? "Manual"
            : "Auto"
        );
        // setPower(data.frequency);
      }
    });
  }, [client]);

  const handleSpeedChange = (newSpeed: number) => {
    setFrequency(newSpeed);
    // Here you would send the speed to the PLC
    console.log("Sending speed to PLC:", newSpeed);
  };

  // const togglePower = () => {
  //   setIsOn(!isOn)
  //   setStatus(isOn ? "Stopped" : "Running")
  //   // Here you would send the power state to the PLC
  //   console.log("Sending power state to PLC:", !isOn)
  // }

  // useEffect(() => {
  //   if (inputBuffer) {
  //     const newSpeed = Math.min(100, parseInt(inputBuffer))
  //     handleSpeedChange(newSpeed)
  //   }
  // }, [inputBuffer])

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTime(new Date());
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

  // Disable SSR
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Motor Control Panel
          </h1>
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            {time.toDateString()} {time.toLocaleTimeString()}
          </div>
        </div>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-1 sm:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Speed Status</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Gauge value={frequency} maxSpeed={MAX_SPEED} unit="Hz" />
              {/* <div className="w-full max-w-xs">
                <SpeedInput value={speed} onChange={handleSpeedChange} />
              </div> */}
              {/* <div className="flex space-x-2">
                <Button onClick={() => handleSpeedChange(Math.max(0, speed - 10))}>-10%</Button>
                <Button onClick={() => handleSpeedChange(Math.min(100, speed + 10))}>+10%</Button>
              </div> */}
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader>
              <CardTitle>Power Monitor</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={power} className="h-4" />
              <p className="mt-2 text-center text-base sm:text-lg font-semibold text-gray-600">
                {power.toFixed(1)}% Power Usage
              </p>
            </CardContent>
          </Card> */}

          <Card>
            <CardHeader>
              <CardTitle>PLC Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* <Toggle checked={isOn} onCheckedChange={togglePower} /> */}
              <div className="rounded-lg bg-gray-100 p-4">
                <p className="font-medium">
                  Status:{" "}
                  <span
                    className={
                      status == "Off" ? "text-red-600" : "text-green-600"
                    }
                  >
                    {status}
                  </span>
                </p>
                <p className="font-medium text-gray-600">
                  Direction: {direction}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 sm:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Rotation per Minutes</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Gauge value={RPM} maxSpeed={MAX_RPM} unit="RPM" />
              {/* <div className="w-full max-w-xs">
                <SpeedInput value={speed} onChange={handleSpeedChange} />
              </div> */}
              {/* <div className="flex space-x-2">
                <Button onClick={() => handleSpeedChange(Math.max(0, speed - 10))}>-10%</Button>
                <Button onClick={() => handleSpeedChange(Math.min(100, speed + 10))}>+10%</Button>
              </div> */}
            </CardContent>
          </Card>
          <Card className="col-span-1 sm:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle>Performance Monitor</CardTitle>
            </CardHeader>
            <CardContent>
              <PowerChart power_data={frequency} max_speed={MAX_SPEED} refresh={refresh} />
              <div className="mt-2 sm:mt-4 font-bold text-center text-base sm:text-lg ">
                Speed
              </div>
            </CardContent>
            <CardContent>
              <PowerChart power_data={RPM} max_speed={MAX_RPM} refresh={refresh}/>
              <div className="mt-2 sm:mt-4 font-bold text-center text-base sm:text-lg ">
                RPM
              </div>
            </CardContent>
          </Card>

          {/* <Card className="col-span-1 sm:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Control Pad</CardTitle>
            </CardHeader>
            <CardContent>
              <Keypad onPress={handleKeypadPress} />
              <p className="mt-2 text-center text-base sm:text-lg font-semibold">Input: {inputBuffer || "---"}</p>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
}
