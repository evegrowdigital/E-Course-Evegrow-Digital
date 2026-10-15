import members from "@/data/members.json";

export function isMember(email) {
  return members
    .map((e) => e.trim().toLowerCase())
    .includes(String(email).trim().toLowerCase());
}
