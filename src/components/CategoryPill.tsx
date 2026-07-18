import { Chip } from "@mui/material";
import type { Story } from "../types/story";
import Translatable from "./Translatable";

interface CategoryPillProps {
  category: Story["category"];
}

export function CategoryPill({ category }: CategoryPillProps) {
  return (
    <Chip
      label={<Translatable>{category}</Translatable>}
      size="small"
      variant="outlined"
      sx={{
        fontWeight: "700",
        fontSize: "0.75rem",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    />
  );
}

export default CategoryPill;