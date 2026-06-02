import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface OrderItem {
  id: number;
  item_name: string;
  price: string;
  price_unit: string;
  quantity: number;
}

// Simple in-memory rate limiter: max 5 submissions per IP per hour
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

function esc(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const { name, phone, note, items } = (await req.json()) as {
    name: string;
    phone: string;
    note: string;
    items: OrderItem[];
  };

  if (!name || !phone || !items?.length) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const total = items.reduce((sum, i) => sum + Number(i.price) * i.quantity, 0);

  const itemRows = items
    .map(
      (i) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${esc(i.item_name)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;">${esc(String(i.quantity))}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;">₹${Number(i.price).toLocaleString("en-IN")} / ${esc(i.price_unit)}</td>
        </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e;">
      <div style="background:#0d3b66;padding:24px 32px;border-radius:12px 12px 0 0;">
        <h2 style="color:#fff;margin:0;font-size:20px;">New Order Enquiry — Ramesh Traders</h2>
      </div>
      <div style="background:#f8f5f0;padding:24px 32px;">
        <p style="margin:0 0 4px;font-size:14px;color:#666;">Customer</p>
        <p style="margin:0 0 16px;font-size:18px;font-weight:700;">${esc(name)}</p>
        <p style="margin:0 0 4px;font-size:14px;color:#666;">Phone</p>
        <p style="margin:0 0 16px;font-size:18px;font-weight:700;">${esc(phone)}</p>
        ${note ? `<p style="margin:0 0 4px;font-size:14px;color:#666;">Note</p><p style="margin:0 0 16px;">${esc(note)}</p>` : ""}
      </div>
      <div style="padding:24px 32px;">
        <h3 style="margin:0 0 16px;color:#0d3b66;">Items Ordered</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead>
            <tr style="background:#f8f5f0;">
              <th style="padding:8px 12px;text-align:left;color:#0d3b66;">Product</th>
              <th style="padding:8px 12px;text-align:center;color:#0d3b66;">Qty</th>
              <th style="padding:8px 12px;text-align:right;color:#0d3b66;">Price</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding:12px;font-weight:700;text-align:right;color:#0d3b66;">Estimated Total</td>
              <td style="padding:12px;font-weight:700;text-align:right;color:#0d3b66;">₹${total.toLocaleString("en-IN")}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div style="padding:16px 32px 24px;color:#999;font-size:12px;">
        This order was submitted via the Ramesh Traders website.
      </div>
    </div>`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Ramesh Traders Website" <${process.env.SMTP_USER}>`,
    to: "rameshtraderssutawale@gmail.com",
    subject: `New Order Enquiry from ${esc(name)} — ${items.length} item${items.length > 1 ? "s" : ""}`,
    html,
  });

  return NextResponse.json({ ok: true });
}
