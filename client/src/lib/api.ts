// lib/api.ts
export async function submitContactForm(data: {
  name: string;
  email: string;
  company?: string;
  project: string;
}): Promise<{ message: string }> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    let errorMessage = 'Failed to submit form';
    
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      errorMessage = res.statusText || errorMessage;
    }
    
    throw new Error(errorMessage);
  }

  return res.json();
}