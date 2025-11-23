CREATE TABLE "device" (
	"id" uuid PRIMARY KEY NOT NULL,
	"serial" varchar(16) NOT NULL,
	"created_at" timestamp (3) DEFAULT now() NOT NULL,
	CONSTRAINT "device_serial_unique" UNIQUE("serial")
);
--> statement-breakpoint
CREATE TABLE "weather" (
	"time" timestamp (3) NOT NULL,
	"zone" integer NOT NULL,
	"temp" integer NOT NULL,
	"device_id" uuid NOT NULL,
	CONSTRAINT "weather_device_id_time_zone_pk" PRIMARY KEY("device_id","time","zone")
);
--> statement-breakpoint
ALTER TABLE "weather" ADD CONSTRAINT "weather_device_id_device_id_fk" FOREIGN KEY ("device_id") REFERENCES "public"."device"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "weather_time_zone_idx" ON "weather" USING btree ("time","zone");