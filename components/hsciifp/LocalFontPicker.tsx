"use client";

import { useEffect, useMemo, useState } from "react";
import { DEFAULT_FONT_ID, LOCAL_FONTS } from "./font-catalog";

const STORAGE_KEY = "user-local-font";
const GROUPS = ["English", "Xi52"];

function applyGlobalFont(fontId: string) {
  const font = LOCAL_FONTS.find((item) => item.id === fontId);
  if (!font) return;

  document.documentElement.style.setProperty(
    "--current-active-font",
    font.variable
  );
  document.body.style.fontFamily = font.variable;
}

export default function LocalFontPicker() {
  const [selectedFont, setSelectedFont] = useState(DEFAULT_FONT_ID);

  const fontGroups = useMemo(
    () =>
      GROUPS.map((group) => ({
        group,
        fonts: LOCAL_FONTS.filter((font) => font.group === group),
      })),
    []
  );

  useEffect(() => {
    const savedFont = localStorage.getItem(STORAGE_KEY);
    const fontId = LOCAL_FONTS.some((font) => font.id === savedFont)
      ? savedFont!
      : DEFAULT_FONT_ID;

    setSelectedFont(fontId);
    applyGlobalFont(fontId);
  }, []);

  function handleFontChange(fontId: string) {
    setSelectedFont(fontId);
    localStorage.setItem(STORAGE_KEY, fontId);
    applyGlobalFont(fontId);
  }

  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 11,
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      <span>Font</span>
      <select
        aria-label="Choose display font"
        value={selectedFont}
        onChange={(event) => handleFontChange(event.target.value)}
        style={{
          maxWidth: 180,
          padding: "8px 9px",
          border: "1px solid currentColor",
          borderRadius: 4,
          background: "white",
          color: "#26313d",
          font: "inherit",
        }}
      >
        {fontGroups.map(({ group, fonts }) => (
          <optgroup key={group} label={group}>
            {fonts.map((font) => (
              <option key={font.id} value={font.id}>
                {font.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </label>
  );
}
