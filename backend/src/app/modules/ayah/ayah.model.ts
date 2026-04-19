import { Schema, model, type InferSchemaType } from "mongoose";

const AyahSchema = new Schema(
  {
    surahId: { type: Number, required: true, index: true },
    id: { type: Number, required: true },
    ar: { type: String, required: true },
    en: { type: String, default: "" },
    bn: { type: String, default: "" },
  },
  { timestamps: true },
);

AyahSchema.index({ surahId: 1, id: 1 }, { unique: true });
AyahSchema.index({ en: "text", bn: "text" });

export type AyahDocument = InferSchemaType<typeof AyahSchema>;

const AyahModel = model<AyahDocument>("Ayah", AyahSchema);

export default AyahModel;

