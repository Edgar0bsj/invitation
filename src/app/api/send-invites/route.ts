import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/db/connection";
import GuestModel from "@/model/Guest";
import { transporter, mailOptions } from "@/lib/mailer";
import configEmail from "./configEmail";

export async function POST() {
  try {
    await connectDB();
    const guests = await GuestModel.find({ status: "pendente" });

    for (const guest of guests) {
      const confirmLink = `${process.env.NEXT_PUBLIC_SITE_URL}/confirmar/${guest._id}`;
      const declineLink = `${process.env.NEXT_PUBLIC_SITE_URL}/decline/${guest._id}`;

      const { title, msgHtml } = configEmail(
        guest.name,
        confirmLink,
        declineLink
      );

      await transporter.sendMail({
        ...mailOptions,
        to: guest.email,
        subject: title,
        html: msgHtml,
      });
    }

    return NextResponse.json({ message: "Convites enviados com sucesso!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao enviar convites" },
      { status: 500 }
    );
  }
}
