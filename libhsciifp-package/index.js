"use client";
"use strict";

const React = require("react");
const catalog = require("./font-catalog.json");

const FONT_CATALOG = catalog.fonts;
const DEFAULT_FONT_ID = catalog.defaultFontId;
const DEFAULT_STORAGE_KEY = "user-local-font";

function applyFont(fontId) {
  if (typeof document === "undefined") return;
  const font = FONT_CATALOG.find((item) => item.id === fontId);
  if (!font) return;
  const family = `"${font.family}", sans-serif`;
  document.documentElement.style.setProperty("--current-active-font", family);
  document.body.style.fontFamily = family;
}

function FontPicker(props) {
  const options = props || {};
  const storageKey = options.storageKey || DEFAULT_STORAGE_KEY;
  const requestedDefault = options.defaultFontId;
  const baseDefault = FONT_CATALOG.some((font) => font.id === requestedDefault) ? requestedDefault : DEFAULT_FONT_ID;
  const [selectedFont, setSelectedFont] = React.useState(baseDefault);

  React.useEffect(() => {
    let saved;
    try { saved = window.localStorage.getItem(storageKey); } catch (_) { /* Storage may be blocked. */ }
    const next = FONT_CATALOG.some((font) => font.id === saved) ? saved : baseDefault;
    setSelectedFont(next);
    applyFont(next);
  }, [storageKey, baseDefault]);

  function handleChange(event) {
    const fontId = event.target.value;
    setSelectedFont(fontId);
    applyFont(fontId);
    try { window.localStorage.setItem(storageKey, fontId); } catch (_) { /* Storage may be blocked. */ }
    if (typeof options.onChange === "function") options.onChange(fontId);
  }

  return React.createElement("label", { className: options.className, style: options.style },
    React.createElement("span", null, options.label || "Font"),
    React.createElement("select", {
      "aria-label": options.ariaLabel || "Choose display font",
      value: selectedFont,
      onChange: handleChange,
    }, FONT_CATALOG.map((font) => React.createElement("option", { key: font.id, value: font.id }, font.name))));
}

module.exports = {
  FontPicker,
  LocalFontPicker: FontPicker,
  Hsciifontpicker: FontPicker,
  FONT_CATALOG,
  DEFAULT_FONT_ID,
  applyFont,
  default: FontPicker,
};
