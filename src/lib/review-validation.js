/**
 * Review submission rules – shared by the browser form and /api/reviews.
 */
export const REVIEW_LIMITS = {
  name: 80,
  country: 60,
  textMin: 20,
  textMax: 2000,
  photoBytes: 4 * 1024 * 1024, // 4 MB (keeps the request under hosting body limits)
  photoTypes: ["image/jpeg", "image/png", "image/webp"],
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * @param {{name,email,country,tour,rating,text,consent}} v – trimmed strings / numbers
 * @param {{allowedTours?: Set<string>, photo?: {type:string,size:number}|null}} opts
 * @returns {Record<string,string>} errors keyed by field name
 */
export function validateReview(v, { allowedTours, photo } = {}) {
  const e = {};
  if (!v.name) e.name = "Enter your name.";
  else if (v.name.length > REVIEW_LIMITS.name) e.name = `Use ${REVIEW_LIMITS.name} characters or fewer.`;

  if (!v.email || v.email.length > 254 || !EMAIL_RE.test(v.email)) e.email = "Enter a valid email address.";

  if (v.country && v.country.length > REVIEW_LIMITS.country) e.country = `Use ${REVIEW_LIMITS.country} characters or fewer.`;

  if (!v.tour) e.tour = "Choose the tour or service you took.";
  else if (allowedTours && !allowedTours.has(v.tour)) e.tour = "Choose one of the listed tours or services.";

  if (!Number.isInteger(v.rating) || v.rating < 1 || v.rating > 5) e.rating = "Choose a rating from 1 to 5 stars.";

  if (!v.text || v.text.length < REVIEW_LIMITS.textMin)
    e.text = `Tell us a little more – at least ${REVIEW_LIMITS.textMin} characters.`;
  else if (v.text.length > REVIEW_LIMITS.textMax) e.text = `Use ${REVIEW_LIMITS.textMax} characters or fewer.`;

  if (photo) {
    if (!REVIEW_LIMITS.photoTypes.includes(photo.type)) e.photo = "Upload a JPG, PNG or WebP image.";
    else if (photo.size > REVIEW_LIMITS.photoBytes) e.photo = "Choose a photo smaller than 4 MB.";
  }

  if (!v.consent) e.consent = "Please confirm we may publish your review.";
  return e;
}
