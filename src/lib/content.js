/**
 * Single data-access layer. Pages and components import ONLY from here –
 * when the admin dashboard / API exists, rewrite these functions and
 * nothing else in the app changes.
 */
import { dayTours } from "@/data/day-tours";
import { itineraries, itineraryCategoryLabels } from "@/data/itineraries";
import { transferServices, vehicles } from "@/data/transfers";
import { destinations } from "@/data/destinations";
import { experiences } from "@/data/experiences";

export function getDayTours() {
  return dayTours.filter((t) => t.published);
}

export function getDayTourBySlug(slug) {
  return getDayTours().find((t) => t.slug === slug) || null;
}

export function getRelatedDayTours(tour, limit = 3) {
  const bySlug = new Map(getDayTours().map((t) => [t.slug, t]));
  return (tour.related || [])
    .map((slug) => bySlug.get(slug))
    .filter(Boolean)
    .slice(0, limit);
}

/* ---------------------------------------------------------------- Itineraries */

export function getItineraries() {
  return itineraries.filter((t) => t.published);
}

export function getItineraryBySlug(slug) {
  return getItineraries().find((t) => t.slug === slug) || null;
}

export function getRelatedItineraries(tour, limit = 3) {
  const bySlug = new Map(getItineraries().map((t) => [t.slug, t]));
  return (tour.related || [])
    .map((slug) => bySlug.get(slug))
    .filter(Boolean)
    .slice(0, limit);
}

export function getItineraryCategoryLabel(id) {
  return itineraryCategoryLabels[id] || id;
}

/* ------------------------------------------------------------------ Transfers */
export function getTransferServices() {
  return transferServices.filter((s) => s.published);
}

export function getTransferServiceBySlug(slug) {
  return getTransferServices().find((s) => s.slug === slug) || null;
}

export function getRelatedTransferServices(service, limit = 3) {
  const bySlug = new Map(getTransferServices().map((s) => [s.slug, s]));
  return (service.related || []).map((s) => bySlug.get(s)).filter(Boolean).slice(0, limit);
}

export function getVehicles() {
  return vehicles.filter((v) => v.active);
}

/* --------------------------------------------------------------- Destinations */
export function getDestinations() {
  return destinations.filter((d) => d.published);
}

export function getDestinationBySlug(slug) {
  return getDestinations().find((d) => d.slug === slug) || null;
}

export function getNearbyDestinations(destination, limit = 3) {
  const bySlug = new Map(getDestinations().map((d) => [d.slug, d]));
  return (destination.nearby || []).map((s) => bySlug.get(s)).filter(Boolean).slice(0, limit);
}

/** Resolves a destination's related tour slugs into full day-tour / itinerary objects. */
export function getDestinationTours(destination) {
  const dayTourMap = new Map(getDayTours().map((t) => [t.slug, t]));
  const itineraryMap = new Map(getItineraries().map((t) => [t.slug, t]));
  return {
    dayTours: (destination.relatedDayTours || []).map((s) => dayTourMap.get(s)).filter(Boolean),
    itineraries: (destination.relatedItineraries || []).map((s) => itineraryMap.get(s)).filter(Boolean),
  };
}

/* --------------------------------------------------------------- Experiences */
export function getExperiences() {
  return experiences.filter((e) => e.published);
}

export function getExperienceBySlug(slug) {
  return getExperiences().find((e) => e.slug === slug) || null;
}

/** Resolves an experience's related tour slugs into full day-tour / itinerary objects. */
export function getExperienceTours(experience) {
  const dayTourMap = new Map(getDayTours().map((t) => [t.slug, t]));
  const itineraryMap = new Map(getItineraries().map((t) => [t.slug, t]));
  return {
    dayTours: (experience.relatedDayTours || []).map((s) => dayTourMap.get(s)).filter(Boolean),
    itineraries: (experience.relatedItineraries || []).map((s) => itineraryMap.get(s)).filter(Boolean),
  };
}

/** Resolves an experience's related destination slugs into full destination objects. */
export function getExperienceDestinations(experience, limit = 3) {
  const bySlug = new Map(getDestinations().map((d) => [d.slug, d]));
  return (experience.relatedDestinations || [])
    .map((s) => bySlug.get(s))
    .filter(Boolean)
    .slice(0, limit);
}
