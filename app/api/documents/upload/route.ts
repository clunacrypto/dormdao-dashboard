import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const ticker = (formData.get("ticker") as string | null)?.toUpperCase() || "SCHOOL";
    const title = formData.get("title") as string | null;
    const school = formData.get("school") as string | null;
    const documentDate = formData.get("document_date") as string | null;
    const documentType = (formData.get("document_type") as string | null) ?? "report";

    if (!file || !title) {
      return NextResponse.json({ error: "file and title are required" }, { status: 400 });
    }

    const supabase = createServiceClient();

    // Upload to Supabase Storage
    const ext = file.name.split(".").pop() ?? "pdf";
    const storagePath = `${ticker}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const bytes = await file.arrayBuffer();

    const { error: uploadError } = await supabase.storage
      .from("token-documents")
      .upload(storagePath, bytes, {
        contentType: file.type || "application/pdf",
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("token-documents")
      .getPublicUrl(storagePath);

    // Insert metadata row
    const { data, error: dbError } = await supabase
      .from("token_documents")
      .insert({
        token_ticker: ticker,
        title: title.trim(),
        school: school?.trim() || null,
        document_date: documentDate || null,
        file_url: urlData.publicUrl,
        document_type: documentType,
      })
      .select()
      .single();

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ document: data }, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
