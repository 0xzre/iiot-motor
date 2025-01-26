-- CreateTable
CREATE TABLE "hmi_records" (
    "power_status" BOOLEAN NOT NULL,
    "encoder" INTEGER NOT NULL,
    "frequency" DOUBLE PRECISION NOT NULL,
    "rotation_direction" BOOLEAN NOT NULL,
    "digital_input" SMALLINT NOT NULL,
    "timestamp" TIMESTAMP(6) NOT NULL,
    "id" UUID NOT NULL,

    CONSTRAINT "hmi_records_pkey" PRIMARY KEY ("id")
);
