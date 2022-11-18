-- CreateTable
CREATE TABLE "client" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "data" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producer" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "url" TEXT,
    "data" JSONB,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "producer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producer_log" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "producer_id" UUID NOT NULL,
    "event" TEXT NOT NULL,
    "created_by" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "producer_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producer_facility" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "producer_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "benchmark" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "buffer_percentage" INTEGER NOT NULL DEFAULT 20,
    "additionality_percentage" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "producer_facility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producer_facility_meta" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "facility_id" UUID NOT NULL,
    "country" TEXT NOT NULL,
    "design_definitions" JSONB,
    "highlight_features" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "producer_facility_meta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producer_facility_input" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "facility_id" UUID NOT NULL,
    "validation_hash" TEXT NOT NULL,
    "tonnes_input" DECIMAL(65,6) NOT NULL,
    "tonnes_additionality" DECIMAL(65,6) NOT NULL,
    "state" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "producer_facility_input_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producer_facility_input_meta" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "input_id" UUID NOT NULL,
    "collector" TEXT NOT NULL,
    "waste_code" TEXT NOT NULL,
    "material_type" TEXT NOT NULL,
    "full_dataset" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "producer_facility_input_meta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producer_facility_credit" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "facility_id" UUID NOT NULL,
    "input_id" UUID NOT NULL,
    "validation_hash" TEXT NOT NULL,
    "tonnes_base_amount" DECIMAL(65,6) NOT NULL,
    "tonnes_buffer" DECIMAL(65,6) NOT NULL,
    "tonnes_available" DECIMAL(65,6) NOT NULL,
    "tonnes_reserved" DECIMAL(65,6) NOT NULL,
    "tonnes_retired" DECIMAL(65,6) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "producer_facility_credit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "facility_id" UUID NOT NULL,
    "client_id" UUID NOT NULL,
    "validation_hash" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "tonnes" DECIMAL(65,6) NOT NULL,
    "tonne_price" DOUBLE PRECISION NOT NULL,
    "state" TEXT NOT NULL,
    "meta" JSONB,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_log" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "purchase_id" UUID NOT NULL,
    "event" TEXT NOT NULL,
    "data" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "purchase_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchase_credit" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "purchase_id" UUID NOT NULL,
    "credit_id" UUID NOT NULL,
    "tonnes" DECIMAL(65,6) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "purchase_credit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "refresh_id" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "role" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "data" JSONB,
    "last_login_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_client" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "client_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_producer" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "producer_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_producer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_customer" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "client_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "client_customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_customer_vehicle" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "customer_id" UUID NOT NULL,
    "license_plate" VARCHAR(255) NOT NULL,
    "vin_code" VARCHAR(255) NOT NULL,
    "make" VARCHAR(255) NOT NULL,
    "model" VARCHAR(255) NOT NULL,
    "owner" VARCHAR(255) NOT NULL,
    "co_wltp" VARCHAR(255),
    "co_nedc" VARCHAR(255),
    "monthly_fee" DECIMAL(65,6) NOT NULL,
    "allowed_monthly_mileage" DECIMAL(65,30) NOT NULL,
    "contract_start" TIMESTAMP(3) NOT NULL,
    "contract_end" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "client_customer_vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_vehicle_cache" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "license_plate" VARCHAR(255) NOT NULL,
    "vin_code" VARCHAR(255) NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_vehicle_cache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_name_key" ON "client"("name");

-- CreateIndex
CREATE INDEX "client_name_idx" ON "client"("name");

-- CreateIndex
CREATE UNIQUE INDEX "producer_name_key" ON "producer"("name");

-- CreateIndex
CREATE INDEX "producer_name_idx" ON "producer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "producer_facility_name_key" ON "producer_facility"("name");

-- CreateIndex
CREATE INDEX "producer_facility_name_idx" ON "producer_facility"("name");

-- CreateIndex
CREATE UNIQUE INDEX "producer_facility_meta_facility_id_key" ON "producer_facility_meta"("facility_id");

-- CreateIndex
CREATE UNIQUE INDEX "producer_facility_input_facility_id_validation_hash_key" ON "producer_facility_input"("facility_id", "validation_hash");

-- CreateIndex
CREATE UNIQUE INDEX "producer_facility_input_meta_input_id_key" ON "producer_facility_input_meta"("input_id");

-- CreateIndex
CREATE UNIQUE INDEX "producer_facility_credit_input_id_key" ON "producer_facility_credit"("input_id");

-- CreateIndex
CREATE INDEX "producer_facility_credit_facility_id_input_id_idx" ON "producer_facility_credit"("facility_id", "input_id");

-- CreateIndex
CREATE UNIQUE INDEX "producer_facility_credit_validation_hash_facility_id_key" ON "producer_facility_credit"("validation_hash", "facility_id");

-- CreateIndex
CREATE UNIQUE INDEX "producer_facility_credit_validation_hash_input_id_key" ON "producer_facility_credit"("validation_hash", "input_id");

-- CreateIndex
CREATE UNIQUE INDEX "purchase_client_id_validation_hash_key" ON "purchase"("client_id", "validation_hash");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_refresh_id_key" ON "user"("refresh_id");

-- CreateIndex
CREATE INDEX "user_email_idx" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_client_user_id_key" ON "user_client"("user_id");

-- CreateIndex
CREATE INDEX "user_client_client_id_user_id_idx" ON "user_client"("client_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_producer_user_id_key" ON "user_producer"("user_id");

-- CreateIndex
CREATE INDEX "user_producer_producer_id_user_id_idx" ON "user_producer"("producer_id", "user_id");

-- AddForeignKey
ALTER TABLE "producer_log" ADD CONSTRAINT "producer_log_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producer_log" ADD CONSTRAINT "producer_log_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producer_facility" ADD CONSTRAINT "producer_facility_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producer_facility_meta" ADD CONSTRAINT "producer_facility_meta_facility_id_fkey" FOREIGN KEY ("facility_id") REFERENCES "producer_facility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producer_facility_input" ADD CONSTRAINT "producer_facility_input_facility_id_fkey" FOREIGN KEY ("facility_id") REFERENCES "producer_facility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producer_facility_input_meta" ADD CONSTRAINT "producer_facility_input_meta_input_id_fkey" FOREIGN KEY ("input_id") REFERENCES "producer_facility_input"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producer_facility_credit" ADD CONSTRAINT "producer_facility_credit_facility_id_fkey" FOREIGN KEY ("facility_id") REFERENCES "producer_facility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producer_facility_credit" ADD CONSTRAINT "producer_facility_credit_input_id_fkey" FOREIGN KEY ("input_id") REFERENCES "producer_facility_input"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_facility_id_fkey" FOREIGN KEY ("facility_id") REFERENCES "producer_facility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_log" ADD CONSTRAINT "purchase_log_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_credit" ADD CONSTRAINT "purchase_credit_credit_id_fkey" FOREIGN KEY ("credit_id") REFERENCES "producer_facility_credit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_credit" ADD CONSTRAINT "purchase_credit_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_client" ADD CONSTRAINT "user_client_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_client" ADD CONSTRAINT "user_client_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_producer" ADD CONSTRAINT "user_producer_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "producer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_producer" ADD CONSTRAINT "user_producer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_customer" ADD CONSTRAINT "client_customer_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_customer_vehicle" ADD CONSTRAINT "client_customer_vehicle_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "client_customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
