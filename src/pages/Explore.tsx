import { Box, Paper, Stack, Typography } from "@mui/material";

const Explore = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="h4">Explore</Typography>
      <Typography color="text.secondary">
        Quick insights about your sensor platform and vehicle performance.
      </Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 2 }}>
        {[
          {
            title: "Real-time Monitoring",
            body: "Track distance, speed, and obstacle status as it happens.",
          },
          {
            title: "Remote Control",
            body: "Issue speed commands securely using authenticated channels.",
          },
          {
            title: "Safety First",
            body: "Auto-stop kicks in the moment an obstacle is detected.",
          },
        ].map((item) => (
          <Paper elevation={0} key={item.title} sx={{ p: 3, border: "1px solid #efe5d8" }}>
            <Stack spacing={1}>
              <Typography variant="h6">{item.title}</Typography>
              <Typography color="text.secondary">{item.body}</Typography>
            </Stack>
          </Paper>
        ))}
      </Box>
    </Stack>
  );
};

export default Explore;
