export type ContactEnquiry = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  office?: string;
  message: string;
};

export async function submitContactEnquiry(enquiry: ContactEnquiry) {
  const response = await fetch("https://api.vegithglobal.com/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enquiry),
  });

  if (!response.ok) {
    throw new Error(`Contact service returned ${response.status}`);
  }

  const result: { success?: boolean } = await response.json();
  if (result.success !== true) {
    throw new Error("Contact service did not accept the enquiry");
  }
}

export function getContactEmailHref(enquiry: ContactEnquiry) {
  const body = [
    `Name: ${enquiry.name}`,
    `Company: ${enquiry.company}`,
    `Email: ${enquiry.email}`,
    `Phone: ${enquiry.phone}`,
    `Service: ${enquiry.service}`,
    ...(enquiry.office ? [`Preferred office: ${enquiry.office}`] : []),
    "",
    enquiry.message,
  ].join("\n");
  const params = new URLSearchParams({
    subject: `Website Enquiry - ${enquiry.name}`,
    body,
  });

  return `mailto:info@vegithglobal.com?${params.toString()}`;
}
