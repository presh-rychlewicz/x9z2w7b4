import { Book, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Paper,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { uiText } from "../constants/uiText";
import type { GlossaryItem } from "../types/story";
import Translatable from "./Translatable";

interface GlossaryPanelProps {
  glossary: GlossaryItem[];
}

export function GlossaryPanel({ glossary }: GlossaryPanelProps) {
  const accordionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleAccordionChange =
    (index: number) => (event: React.SyntheticEvent, expanded: boolean) => {
      const target = event.target as HTMLElement | null;
      const clickedExpandIcon = Boolean(
        target?.closest(".MuiAccordionSummary-expandIconWrapper") ||
        target?.closest(".MuiIconButton-root"),
      );

      if (!clickedExpandIcon) return;

      setExpandedIndex(expanded ? index : null);

      if (!expanded) return;

      window.setTimeout(() => {
        const accordionEl = accordionRefs.current[index];
        if (!accordionEl) return;

        const rect = accordionEl.getBoundingClientRect();
        const viewportPadding = 16;

        if (rect.top < viewportPadding) {
          window.scrollBy({
            top: rect.top - viewportPadding,
            behavior: "smooth",
          });
          return;
        }

        const overflowBottom =
          rect.bottom - window.innerHeight + viewportPadding;
        if (overflowBottom > 0) {
          window.scrollBy({ top: overflowBottom, behavior: "smooth" });
        }
      }, 220);
    };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        position: "sticky",
        top: 88,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1.5,
          mb: 3,
        }}
      >
        <Book color="primary" />
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: "700", fontFamily: "Inter, system-ui, sans-serif" }}
        >
          <Translatable>{uiText.glossary.title}</Translatable>
        </Typography>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3, fontFamily: "Inter, system-ui, sans-serif" }}
      >
        <Translatable>{uiText.glossary.description}</Translatable>
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {glossary.map((item, index) => (
          <Accordion
            key={index}
            expanded={expandedIndex === index}
            ref={(el) => {
              accordionRefs.current[index] = el;
            }}
            onChange={handleAccordionChange(index)}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "none",
              m: 0,
              borderRadius: "8px !important",
              "&.Mui-expanded": {
                m: 0,
              },
              "&::before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls={`glossary-content-${index}`}
              id={`glossary-header-${index}`}
              sx={{ px: 2 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1.5,
                  width: "100%",
                }}
              >
                <Typography
                  color="primary.main"
                  sx={{
                    fontWeight: "700",
                    fontSize: "1.05rem",
                    fontFamily: "Inter, system-ui, sans-serif",
                  }}
                >
                  <Translatable>{item.word}</Translatable>
                </Typography>
                <Chip
                  label={<Translatable>{item.partOfSpeech}</Translatable>}
                  size="small"
                  variant="outlined"
                  sx={{
                    height: 20,
                    fontSize: "0.75rem",
                    color: "text.secondary",
                    fontFamily: "Inter, system-ui, sans-serif",
                  }}
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2, pb: 2, pt: 0 }}>
              <Typography
                variant="body2"
                color="text.primary"
                sx={{
                  fontWeight: "500",
                  mb: 1,
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                <Translatable>{uiText.glossary.definitionLabel}</Translatable>
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 2,
                  fontFamily: "Inter, system-ui, sans-serif",
                  lineHeight: 1.5,
                }}
              >
                <Translatable>{item.definition}</Translatable>
              </Typography>
              <Typography
                variant="body2"
                color="text.primary"
                sx={{
                  fontWeight: "500",
                  mb: 0.5,
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                <Translatable>{uiText.glossary.exampleLabel}</Translatable>
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontStyle: "italic",
                  color: "text.secondary",
                  fontFamily: "Inter, system-ui, sans-serif",
                  borderLeft: "3px solid",
                  borderColor: "primary.light",
                  pl: 1,
                }}
              >
                <Translatable>{`"${item.example}"`}</Translatable>
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Paper>
  );
}
