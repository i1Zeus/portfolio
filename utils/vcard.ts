export interface VCardData {
  firstName: string;
  lastName: string;
  title: string;
  organization?: string;
  email: string;
  phone?: string;
  website: string;
  linkedin: string;
  github: string;
  x: string;
  instagram: string;
  facebook: string;
  note?: string;
}

export const defaultProfileData: VCardData = {
  firstName: "Hussein",
  lastName: "Najah",
  title: "Software Engineer",
  organization: "Independent / Dev",
  email: "husseinnajah.it@gmail.com",
  website: "https://www.hussein-najah.com",
  linkedin: "https://www.linkedin.com/in/i1zeus",
  github: "https://github.com/i1Zeus",
  x: "https://x.com/i1Zeus",
  instagram: "https://www.instagram.com/hxg.1",
  facebook: "https://www.facebook.com/iZeus01",
  note: "Hussein Najah - Software Engineer | Connected via NFC Wallet (@i1Zeus)",
};

export function generateVCardString(data: VCardData = defaultProfileData): string {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${data.lastName};${data.firstName};;;`,
    `FN:${data.firstName} ${data.lastName}`,
    data.organization ? `ORG:${data.organization}` : "",
    `TITLE:${data.title}`,
    `EMAIL;type=INTERNET;type=WORK;type=pref:${data.email}`,
    data.phone ? `TEL;type=CELL:${data.phone}` : "",
    `URL;type=WORK:${data.website}`,
    `X-SOCIALPROFILE;type=linkedin:${data.linkedin}`,
    `X-SOCIALPROFILE;type=twitter:${data.x}`,
    `X-SOCIALPROFILE;type=github:${data.github}`,
    `X-SOCIALPROFILE;type=instagram:${data.instagram}`,
    `X-SOCIALPROFILE;type=facebook:${data.facebook}`,
    data.note ? `NOTE:${data.note}` : "",
    "REV:" + new Date().toISOString(),
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\r\n");
}

export function downloadVCard(data: VCardData = defaultProfileData) {
  const vcardString = generateVCardString(data);
  const blob = new Blob([vcardString], { type: "text/vcard;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${data.firstName}_${data.lastName}.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function triggerHapticFeedback(pattern: number | number[] = [25, 40, 25]) {
  if (typeof window !== "undefined" && "navigator" in window && "vibrate" in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      // Ignore vibration errors if blocked by browser policy
    }
  }
}
