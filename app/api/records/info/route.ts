import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const [minTimestamp, maxTimestamp] = await Promise.all([
      db.hmi_records.aggregate({
        _min: {
          timestamp: true,
        },
      }),
      db.hmi_records.aggregate({
        _max: {
          timestamp: true,
        },
      }),
    ]);

    return NextResponse.json(
      {
        message: "Info",
        data: {
          min_timestamp: minTimestamp._min.timestamp,
          max_timestamp: maxTimestamp._max.timestamp,
        },
      },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { message: e.message || "Internal server error" },
      { status: 500 }
    );
  }
}
