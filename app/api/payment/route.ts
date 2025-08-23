import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const pidx = searchParams.get("pidx");
  const txnId = searchParams.get("txnId");
  const amount = searchParams.get("amount");
  const mobile = searchParams.get("mobile");
  const purchase_order_id = searchParams.get("purchase_order_id");
  const purchase_order_name = searchParams.get("purchase_order_name");
  const transaction_id = searchParams.get("transaction_id");

  if (!pidx) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_WEBSITE_URL}?error=missing_pidx`);
  }

  try {
    // Verify the payment with Khalti
    const options = {
      method: "POST",
      headers: {
        Authorization: `key ${process.env.NEXT_PUBLIC_KHALTI_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pidx }),
    };

    const khaltiResponse = await fetch(
      "https://a.khalti.com/api/v2/epayment/lookup/",
      options
    );

    const khaltiData = await khaltiResponse.json();

    if (khaltiData.status === "Completed") {
      // Payment successful
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/payment-success?txnId=${txnId}&amount=${amount}&pidx=${pidx}`
      );
    } else {
      // Payment failed or pending
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_WEBSITE_URL}/payment-failed?status=${khaltiData.status}&pidx=${pidx}`
      );
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_WEBSITE_URL}?error=verification_failed`
    );
  }
}