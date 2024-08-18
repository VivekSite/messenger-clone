import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const formData = await request.formData();
  const socket_id = formData.get("socket_id") as string;
  const channel_name = formData.get("channel_name") as string;

  if (!socket_id) {
    return new NextResponse("Socket Id is missing!", { status: 400 });
  }

  if (!channel_name) {
    return new NextResponse("Channel Name is missing!", { status: 400 });
  }

  const data = {
    user_id: session.user.email,
  };

  const authResponse = pusherServer.authorizeChannel(
    socket_id,
    channel_name,
    data
  );

  return NextResponse.json(authResponse);
}
