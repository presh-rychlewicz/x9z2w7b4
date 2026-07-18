import { Chip } from "@mui/material";
import Translatable from "./Translatable";

interface CategoryPillProps {
  category: string;
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
