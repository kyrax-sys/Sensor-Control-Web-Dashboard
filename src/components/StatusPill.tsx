import { Chip } from "@mui/material";

type StatusPillProps = {
  label: string;
  tone?: "success" | "warning" | "danger" | "neutral";
};

const colorMap = {
  success: "#2f8f5b",
  warning: "#f0a202",
  danger: "#d64541",
  neutral: "#5c6871",
} as const;

const StatusPill = ({ label, tone = "neutral" }: StatusPillProps) => {
  return (
    <Chip
      label={label}
      sx={{
        color: colorMap[tone],
        borderColor: colorMap[tone],
        fontWeight: 700,
      }}
      variant="outlined"
    />
  );
};

export default StatusPill;
