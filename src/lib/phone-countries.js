import { getCountries, getCountryCallingCode } from "libphonenumber-js";

/**
 * Country list for the dial-code select, built on the server so names render
 * identically for every visitor (no hydration mismatch). Sorted by name.
 */
export function getPhoneCountries() {
  const names = new Intl.DisplayNames(["en"], { type: "region" });
  return getCountries()
    .map((code) => ({ code, name: names.of(code) || code, dial: getCountryCallingCode(code) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
