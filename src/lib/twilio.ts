// Twilio SMS sender — calls the REST API directly so we don't need the SDK.

interface SendSmsOptions {
  to: string;
  body: string;
}

interface SendSmsResult {
  sid: string | null;
  error: string | null;
}

export async function sendSms(opts: SendSmsOptions): Promise<SendSmsResult> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_FROM_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    return { sid: null, error: 'Missing Twilio env vars' };
  }

  const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
  const params = new URLSearchParams({
    To: opts.to,
    From: fromNumber,
    Body: opts.body,
  });

  try {
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return { sid: null, error: data?.message ?? `Twilio error ${res.status}` };
    }

    return { sid: data.sid ?? null, error: null };
  } catch (err) {
    return { sid: null, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}
