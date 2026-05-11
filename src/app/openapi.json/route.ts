import { NextResponse } from "next/server";
import { buildOpenApiDocument } from "@/lib/api/openapi";

export function GET() {
  return NextResponse.json(buildOpenApiDocument());
}
