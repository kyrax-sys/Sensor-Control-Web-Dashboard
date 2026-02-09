import { Paper, Stack, Typography } from "@mui/material";
import { type ReactNode } from "react";

type SectionCardProps = {
  title: string;
  children: ReactNode;
  action?: ReactNode;
};

const SectionCard = ({ title, children, action }: SectionCardProps) => {
  return (
    <Paper elevation={0} sx={{ p: 3, border: "1px solid #efe5d8" }}>
      <Stack spacing={2}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          spacing={1}
        >
          <Typography variant="h6">{title}</Typography>
          {action}
        </Stack>
        {children}
      </Stack>
    </Paper>
  );
};

export default SectionCard;
