"use client";

import { DateTimePicker } from "@/components/date-time-picker";
import LineChart from "@/components/line-chart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RecordData } from "@/types/record";
import { useEffect, useState } from "react";

export default function Home() {
  const nowDate = new Date();
  const [minDate, setMinDate] = useState(
    new Date(nowDate.getTime() - 1000 * 3600 * 24)
  );
  const [maxDate, setMaxDate] = useState(nowDate);
  const [selectedDate, setSelectedDate] = useState({
    min_timestamp: minDate,
    max_timestamp: maxDate,
  });
  const [historyData, setHistoryData] = useState<RecordData[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `/api/records?min_timestamp=${minDate.toISOString()}&max_timestamp=${maxDate.toISOString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const res = await response.json();
        setHistoryData(res.data.records);
        setSelectedDate({
          min_timestamp: new Date(res.data.min_timestamp),
          max_timestamp: new Date(res.data.max_timestamp),
        });
      } else {
        console.error("Failed to fetch records:", response.statusText);
        setHistoryData([]);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Motor History Panel
          </h1>
        </div>
        <Card className="col-span-1 sm:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Select time</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-col md:flex-row gap-2 justify-start md:items-center">
              <div className="w-[200px] space-y-1">
                <Label>Start</Label>
                <DateTimePicker date={minDate} setDate={setMinDate} />
              </div>
              <div className="w-[200px] space-y-1">
                <Label>End</Label>
                <DateTimePicker date={maxDate} setDate={setMaxDate} />
              </div>
            </div>
            <Button onClick={() => fetchData()}>Get data</Button>
          </CardContent>
        </Card>

        <Card className="col-span-1 sm:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Speed Monitor</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              chartData={historyData.map((data) => {
                return {
                  value: data.frequency,
                  timestamp: data.timestamp,
                };
              })}
              title={`Speed data from ${
                selectedDate.min_timestamp.toLocaleDateString() +
                " " +
                selectedDate.min_timestamp.toLocaleTimeString()
              } to ${
                selectedDate.max_timestamp.toLocaleDateString() +
                " " +
                selectedDate.max_timestamp.toLocaleTimeString()
              }`}
              xLabel="Timestamp"
              yLabel="Speed"
            />
          </CardContent>
        </Card>

        <Card className="col-span-1 sm:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>RPM Monitor</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              chartData={historyData.map((data) => {
                return {
                  value: data.encoder,
                  timestamp: data.timestamp,
                };
              })}
              title={`RPM data from ${
                selectedDate.min_timestamp.toLocaleDateString() +
                " " +
                selectedDate.min_timestamp.toLocaleTimeString()
              } to ${
                selectedDate.max_timestamp.toLocaleDateString() +
                " " +
                selectedDate.max_timestamp.toLocaleTimeString()
              }`}
              xLabel="Timestamp"
              yLabel="RPM"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
