import { Paper, Stack, Typography } from "@mui/material";

type MetricCardProps = {
  label: string;
  value: number | string;
  unit?: string;
  tone?: "default" | "warning" | "danger";
};

const toneMap = {
  default: "#0f4c81",
  warning: "#f0a202",
  danger: "#d64541",
} as const;

const MetricCard = ({ label, value, unit, tone = "default" }: MetricCardProps) => {
  return (
    <Paper elevation={0} sx={{ p: 2.5, border: "1px solid #efe5d8" }}>
      <Stack spacing={1}>
        <Typography variant="overline" sx={{ letterSpacing: 1.1 }}>
          {label}
        </Typography>
        <Typography variant="h5" sx={{ color: toneMap[tone] }}>
          {value} {unit}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default MetricCard;
