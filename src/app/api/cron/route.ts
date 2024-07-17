import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import { refreshAccessToken } from '~/lib/google';
import { getServerSession } from 'next-auth';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

export interface GoogleApiError extends Error {
    response?: {
      status: number;
      data: {
        error: {
          code: number;
          message: string;
          errors: Array<{
            message: string;
            domain: string;
            reason: string;
          }>;
        };
      };
    };
  }
  
  

export async function GET() {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let accessToken = session.accessToken!;
  const refreshToken = session.refreshToken!;

  if (!accessToken || !refreshToken) {
    return NextResponse.json({ error: 'Missing access or refresh token' }, { status: 400 });
  }

  try {
    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    const response = await gmail.users.messages.list({
      userId: 'me',
    });

    const messages = response.data.messages ?? [];
    return NextResponse.json({ messages });
  } catch (error: unknown) {
    const err = error as GoogleApiError;
    if (err.response && err.response.status === 401) {
      const newTokens = await refreshAccessToken(refreshToken);
      if (newTokens) {
        accessToken = newTokens.access_token ?? "";

        oauth2Client.setCredentials({ access_token: accessToken });

        const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

        const response = await gmail.users.messages.list({
          userId: 'me',
        });

        const messages = response.data.messages ?? [];
        return NextResponse.json({ messages });
      } else {
        return NextResponse.json({ error: 'Failed to refresh access token' }, { status: 500 });
      }
    } else if (err.response) {
      return NextResponse.json({ error: err.response.data }, { status: err.response.status });
    } else {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
