import * as React from "react";

export interface FontPickerProps {
  defaultFontId?: string;
  storageKey?: string;
  label?: string;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (fontId: string) => void;
}

export interface FontDefinition { id: string; name: string; family: string; }
export const FONT_CATALOG: readonly FontDefinition[];
export const DEFAULT_FONT_ID: string;
export function applyFont(fontId: string): void;
export const FontPicker: React.ComponentType<FontPickerProps>;
export const LocalFontPicker: typeof FontPicker;
export const Hsciifontpicker: typeof FontPicker;
export default FontPicker;
