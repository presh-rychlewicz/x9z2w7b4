import { Tooltip } from "@mui/material";
import { Fragment, useMemo, useState } from "react";
import { uiText } from "../constants/uiText";
import uiTranslations from "../i18n/uiTranslations";

interface TranslatableProps {
  children: React.ReactNode;
  enableTooltips?: boolean;
}

interface PressWordTooltipProps {
  token: string;
  translation: string;
  hasTranslation?: boolean;
}

function PressWordTooltip({
  token,
  translation,
  hasTranslation = false,
}: PressWordTooltipProps) {
  const [open, setOpen] = useState(false);

  const show = () => setOpen(true);
  const hide = () => {
    window.setTimeout(() => setOpen(false), 1200);
  };

  return (
    <Tooltip
      title={translation}
      open={open}
      onClose={() => setOpen(false)}
      disableHoverListener
      placement="top"
    >
      <span
        onMouseDown={show}
        onMouseUp={hide}
        onTouchStart={show}
        onTouchEnd={hide}
        style={{
          display: "inline",
          textDecoration: hasTranslation ? "underline" : "none",
          textDecorationStyle: hasTranslation ? "dotted" : "solid",
          textUnderlineOffset: hasTranslation ? "0.12em" : undefined,
        }}
      >
        {token}
      </span>
    </Tooltip>
  );
}

function normalizeWord(word: string) {
  return word.toLowerCase().replace(/^[^a-zA-Z']+|[^a-zA-Z']+$/g, "");
}

function translateToken(token: string) {
  const match = token.match(/^([^a-zA-Z']*)([a-zA-Z']+)([^a-zA-Z']*)$/);
  if (!match) return token;

  const [, prefix, word, suffix] = match;
  const normalized = normalizeWord(word);
  const translatedWord = uiTranslations[normalized];

  if (!translatedWord) return token;

  return `${prefix}${translatedWord}${suffix}`;
}

export function translatePlainText(text: string) {
  const exact = uiTranslations[text.toLowerCase()];
  if (exact) return exact;

  return text
    .split(/(\s+)/)
    .map((token) => {
      if (!token.trim()) return token;
      return translateToken(token);
    })
    .join("");
}

// Wrap non-interactive UI text and show Polish translation for each pressed word.
export function Translatable({
  children,
  enableTooltips = true,
}: TranslatableProps) {
  if (typeof children !== "string") return <>{children}</>;

  const tokens = useMemo(() => children.split(/(\s+)/), [children]);

  return (
    <>
      {tokens.map((token, index) => {
        if (!token.trim())
          return <Fragment key={`space-${index}`}>{token}</Fragment>;

        const normalized = normalizeWord(token);
        if (!normalized)
          return <Fragment key={`plain-${index}`}>{token}</Fragment>;

        const hasTranslation = normalized in uiTranslations;
        const translation = hasTranslation
          ? uiTranslations[normalized]
          : uiText.translatable.missingTranslation;

        if (!enableTooltips) {
          return <Fragment key={`plain-token-${index}`}>{token}</Fragment>;
        }

        return (
          <PressWordTooltip
            key={`translated-${index}`}
            token={token}
            translation={translation}
            hasTranslation={hasTranslation}
          />
        );
      })}
    </>
  );
}

export default Translatable;
