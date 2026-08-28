import { NextResponse, type NextRequest } from "next/server";
import { checkPin, pinLocked, setAuthCookie } from "@/lib/panel/auth";

/** The throttle key: first hop of x-forwarded-for, or "local" in dev. */
function callerKey(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd ? fwd.split(",")[0].trim() : "local";
}

export async function POST(req: NextRequest) {
  const key = callerKey(req);
  if (pinLocked(key)) {
    return NextResponse.json({ ok: false, locked: true }, { status: 429 });
  }

  let pin = "";
  try {
    const body = (await req.json()) as { pin?: unknown };
    if (typeof body.pin === "string") pin = body.pin;
  } catch {
    // Malformed body counts as a miss below, same as a wrong PIN.
  }

  if (!checkPin(key, pin)) {
    // Re-read the lock so the attempt that TRIPPED it says so immediately,
    // rather than one more "wrong PIN" before the lockout message.
    return NextResponse.json({ ok: false, locked: pinLocked(key) }, { status: 401 });
  }

  await setAuthCookie();
  return NextResponse.json({ ok: true });
}
