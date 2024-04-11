import { auth } from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { user }: { user: string } = await request.json();
    auth()
      .verifyIdToken(user)
      .then(() => {
        return NextResponse.json(
          {},
          {
            status: 200,
          }
        );
      });
  } catch (err) {
    return NextResponse.json(
      { error: `Error verify user token_id: ${err}` },
      { status: 500 }
    );
  }
}
