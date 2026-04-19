import { Schema, model, type InferSchemaType } from "mongoose";

const SurahSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    name_ar: { type: String, required: true },
    name_en: { type: String, required: true },
    name_bn: { type: String, default: "" },
    name_translation: { type: String, required: true },
    type: { type: String, enum: ["meccan", "medinan"], required: true },
    total_verses: { type: Number, required: true },
  },
  { timestamps: true },
);

export type SurahDocument = InferSchemaType<typeof SurahSchema>;

const SurahModel = model<SurahDocument>("Surah", SurahSchema);

export default SurahModel;
