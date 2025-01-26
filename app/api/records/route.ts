import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const min_timestamp = url.searchParams.get("min_timestamp");
    const max_timestamp = url.searchParams.get("max_timestamp");

    if (!min_timestamp || !max_timestamp) {
      return NextResponse.json(
        {
          message: "min_timestamp and max_timestamp required",
        },
        { status: 400 }
      );
    }

    const inputMinTimestamp = new Date(min_timestamp);
    const inputMaxTimestamp = new Date(max_timestamp);

    const [minLimitTimestamp, maxLimitTimestamp] = await Promise.all([
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

    // Get the limits from the database
    const minAvailableTimestamp = minLimitTimestamp._min.timestamp;
    const maxAvailableTimestamp = maxLimitTimestamp._max.timestamp;

    if (minAvailableTimestamp === null || maxAvailableTimestamp === null) {
      throw Error("min max not available");
    }

    // Adjust input values to respect the limits
    const minTimestamp = inputMinTimestamp
      ? new Date(
          Math.max(
            new Date(inputMinTimestamp).getTime(),
            new Date(minAvailableTimestamp).getTime()
          )
        )
      : new Date(minAvailableTimestamp);

    const maxTimestamp = inputMaxTimestamp
      ? new Date(
          Math.min(
            new Date(inputMaxTimestamp).getTime(),
            new Date(maxAvailableTimestamp).getTime()
          )
        )
      : new Date(maxAvailableTimestamp);

    // Fetch the records within the adjusted range
    const records = await db.hmi_records.findMany({
      where: {
        timestamp: {
          gte: minTimestamp,
          lte: maxTimestamp,
        },
      },
      orderBy: {
        timestamp: "asc",
      },
    });

    return NextResponse.json(
      {
        message: "Records",
        data: {
          records,
          min_timestamp: minTimestamp,
          max_timestamp: maxTimestamp,
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
