const BASE = "https://maitri-med-backend.onrender.com";

export interface ChatResponse {
  answer: string;
  sources: { name: string; topic: string }[];
  session_id: string;
}

export interface SymptomResult {
  urgency: "emergency" | "high" | "medium" | "low";
  is_emergency: boolean;
  emergency_message: string | null;
  duration_note: string;
  general_advice: string;
  results: {
    condition: string;
    condition_id: string;
    confidence: "high" | "medium" | "low";
    advice: string;
    visit: string;
    has_danger_signs: boolean;
  }[];
}

export async function sendChat(
  message: string,
  sessionId: string | null,
  language: string
): Promise<ChatResponse> {
  const res = await fetch(`${BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, session_id: sessionId, language }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Server error");
  }
  return res.json();
}

export async function checkSymptoms(
  primarySymptom: string,
  durationDays: number,
  severity: string,
  extraSymptoms?: string
): Promise<SymptomResult> {
  const res = await fetch(`${BASE}/symptom-check`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      primary_symptom: primarySymptom,
      duration_days: durationDays,
      severity,
      extra_symptoms: extraSymptoms,
    }),
  });
  if (!res.ok) throw new Error("Symptom check failed");
  return res.json();
}

export async function getStats() {
  const res = await fetch(`${BASE}/stats`);
  return res.json();
}

export async function getNearbyCenters(lat: number, lng: number) {
  const res = await fetch(`${BASE}/nearby-centers?lat=${lat}&lng=${lng}`);
  return res.json();
}
