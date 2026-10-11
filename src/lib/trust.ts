// Trust content shown on the home page. Each section stays hidden until it
// has entries, so only add real clients and genuine customer quotes
// (with the client's permission).

export type Client = {
  name: string;
  /** Optional logo imported from src/assets; the name is shown when absent */
  logo?: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  /** e.g. "Operations Manager, Example Ltd" */
  role?: string;
};

export const clients: Client[] = [];

export const testimonials: Testimonial[] = [];
