import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export function jsonResponse<T>(data: T, status: number = 200, headers?: HeadersInit) {
  return NextResponse.json(data, { status, headers });
}

export function errorResponse(message: string, status: number = 400, headers?: HeadersInit) {
  return NextResponse.json({ error: message }, { status, headers });
}

export function handleApiError(err: unknown) {
  console.error('API Error:', err);

  if (err instanceof ZodError) {
    const message = err.issues.map((issue) => issue.message).join('; ');
    return errorResponse(`Validation error: ${message}`, 400);
  }

  if (err instanceof Error) {
    return errorResponse(err.message, 500);
  }

  return errorResponse('Internal server error', 500);
}
