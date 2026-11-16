"use client";

import { useId, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import PriceRangeSlider from "@/components/tour-packages/PriceRangeSlider";
import { cn } from "@/lib/utils";

/** Collapsible filter group (disclosure pattern). */
function Group({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className="border-t border-brand-line py-5 first:border-t-0 first:pt-0">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-3 text-left text-[14px] font-bold uppercase tracking-[0.08em] text-black"
        >
          {title}
          <ChevronDown
            className={cn("size-4 text-brand-muted transition-transform duration-200", open && "rotate-180")}
            aria-hidden="true"
          />
        </button>
      </h3>
      <div id={id} hidden={!open} className="pt-4">
        {children}
      </div>
    </div>
  );
}

/** Pill-shaped checkbox (real checkbox for assistive tech). */
function PillCheck({ id, label, count, checked, onChange }) {
  const disabled = !checked && count === 0;
  return (
    <label
      htmlFor={id}
      className={cn(
        "relative inline-flex cursor-pointer select-none items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13.5px] font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-blue/40",
        checked
          ? "border-brand-navy bg-brand-navy text-white"
          : "border-brand-line bg-white text-brand-ink hover:border-brand-blue hover:text-brand-blue",
        disabled && "cursor-not-allowed opacity-45 hover:border-brand-line hover:text-brand-ink"
      )}
    >
      <input id={id} type="checkbox" className="sr-only" checked={checked} disabled={disabled} onChange={onChange} />
      {label}
      <span className={cn("text-[12px] font-medium", checked ? "text-white/70" : "text-brand-muted")}>({count})</span>
    </label>
  );
}

/** List-style checkbox row with result count. */
function RowCheck({ id, label, count, checked, onChange }) {
  const disabled = !checked && count === 0;
  return (
    <label
      htmlFor={id}
      className={cn(
        "group/row flex cursor-pointer items-center gap-3 rounded-lg px-1 py-1.5 text-[14.5px] text-brand-ink",
        disabled && "cursor-not-allowed opacity-45"
      )}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="size-[18px] shrink-0 cursor-pointer rounded accent-brand-blue disabled:cursor-not-allowed"
      />
      <span className={cn("flex-1 leading-snug", !disabled && "group-hover/row:text-brand-blue", checked && "font-semibold text-brand-navy")}>
        {label}
      </span>
      <span className="rounded-full bg-brand-mist px-2 py-0.5 text-[12px] font-semibold text-brand-muted">{count}</span>
    </label>
  );
}

function CheckList({ name, idPrefix, options, selected, counts, onToggle, limit }) {
  const [expanded, setExpanded] = useState(false);
  const shown = limit && !expanded ? options.slice(0, limit) : options;
  return (
    <fieldset>
      <legend className="sr-only">{name}</legend>
      <div className="space-y-0.5">
        {shown.map((o) => (
          <RowCheck
            key={o.id}
            id={`${idPrefix}-${o.id}`}
            label={o.label}
            count={counts[o.id] ?? 0}
            checked={selected.includes(o.id)}
            onChange={() => onToggle(o.id)}
          />
        ))}
      </div>
      {limit && options.length > limit && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="mt-2 text-[13px] font-semibold text-brand-blue hover:text-brand-blue-dark"
        >
          {expanded ? "Show less" : `Show all ${options.length}`}
        </button>
      )}
    </fieldset>
  );
}

/**
 * The full filter form. Rendered in the desktop sidebar and in the mobile
 * drawer (each with its own idPrefix so ids stay unique).
 */
export default function PackageFilters({ idPrefix, state, actions, groups, counts, bounds }) {
  const { query, durations, tourTypes, themes, destinations, experiences, currency, price } = state;
  const range = bounds[currency];

  return (
    <div>
      {/* Search */}
      <div className="pb-5">
        <label htmlFor={`${idPrefix}-search`} className="mb-2 block text-[14px] font-bold uppercase tracking-[0.08em] text-black">
          Search tours
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-brand-muted" aria-hidden="true" />
          <input
            id={`${idPrefix}-search`}
            type="search"
            value={query}
            onChange={(e) => actions.setQuery(e.target.value)}
            placeholder="Place or activity, e.g. Ella"
            autoComplete="off"
            className="h-12 w-full rounded-xl border border-brand-line bg-white pl-10 pr-10 text-base text-brand-ink placeholder:text-brand-muted/70 focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20 sm:text-[15px] [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => actions.setQuery("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-brand-muted hover:bg-brand-mist hover:text-brand-navy"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <div className="border-t border-brand-line pt-5">  
        <Group title="Duration">
          <fieldset>
            <legend className="sr-only">Duration</legend>
            <div className="flex flex-wrap gap-2">
              {groups.durations.map((o) => (
                <PillCheck
                  key={o.id}
                  id={`${idPrefix}-dur-${o.id}`}
                  label={o.label}
                  count={counts.durations[o.id] ?? 0}
                  checked={durations.includes(o.id)}
                  onChange={() => actions.toggle("durations", o.id)}
                />
              ))}
            </div>
          </fieldset>
        </Group>

        <Group title="Price per person">
          <fieldset>
            <legend className="sr-only">Currency</legend>
            <div className="mb-5 grid grid-cols-2 rounded-full bg-brand-mist p-1">
              {["USD", "LKR"].map((c) => (
                <label
                  key={c}
                  className={cn(
                    "cursor-pointer rounded-full py-1.5 text-center text-[13px] font-bold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-blue/40",
                    currency === c ? "bg-white text-brand-navy shadow-sm" : "text-brand-muted hover:text-brand-navy"
                  )}
                >
                  <input
                    type="radio"
                    name={`${idPrefix}-currency`}
                    value={c}
                    checked={currency === c}
                    onChange={() => actions.setCurrency(c)}
                    className="sr-only"
                  />
                  {c}
                </label>
              ))}
            </div>
          </fieldset>
          <PriceRangeSlider
            idPrefix={`${idPrefix}-price`}
            min={range.min}
            max={range.max}
            step={range.step}
            value={price}
            currency={currency}
            onChange={actions.setPrice}
          />
          <p className="mt-3 text-[12px] leading-relaxed text-brand-muted">
            Estimated starting prices per person. USD figures are operator estimates, not live exchange rates.
          </p>
        </Group>

        <Group title="Tour type">
          <CheckList
            name="Tour type"
            idPrefix={`${idPrefix}-type`}
            options={groups.tourTypes}
            selected={tourTypes}
            counts={counts.tourTypes}
            onToggle={(id) => actions.toggle("tourTypes", id)}
          />
        </Group>

        <Group title="Themes">
          <fieldset>
            <legend className="sr-only">Themes</legend>
            <div className="flex flex-wrap gap-2">
              {groups.themes.map((o) => (
                <PillCheck
                  key={o.id}
                  id={`${idPrefix}-theme-${o.id}`}
                  label={o.label}
                  count={counts.themes[o.id] ?? 0}
                  checked={themes.includes(o.id)}
                  onChange={() => actions.toggle("themes", o.id)}
                />
              ))}
            </div>
          </fieldset>
        </Group>

        <Group title="Destinations">
          <CheckList
            name="Destinations"
            idPrefix={`${idPrefix}-dest`}
            options={groups.destinations}
            selected={destinations}
            counts={counts.destinations}
            onToggle={(id) => actions.toggle("destinations", id)}
          />
        </Group>

        <Group title="Experiences">
          <CheckList
            name="Experiences"
            idPrefix={`${idPrefix}-exp`}
            options={groups.experiences}
            selected={experiences}
            counts={counts.experiences}
            onToggle={(id) => actions.toggle("experiences", id)}
            limit={6}
          />
        </Group>
      </div>
    </div>
  );
}
