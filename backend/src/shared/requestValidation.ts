import ApiError from "../errors/ApiError.js";

export function parsePositiveInteger(value: unknown, fieldName: string): number {
  const parsedValue =
    typeof value === "string" && value.trim() ? Number(value) : NaN;

  if (!Number.isInteger(parsedValue) || parsedValue < 1) {
    throw new ApiError(400, `${fieldName} must be a positive integer`);
  }

  return parsedValue;
}

export function parseOptionalPositiveInteger(
  value: unknown,
  fieldName: string,
  defaultValue: number,
): number {
  if (value === undefined) return defaultValue;

  if (typeof value !== "string") {
    throw new ApiError(400, `${fieldName} must be a positive integer`);
  }

  return parsePositiveInteger(value, fieldName);
}
