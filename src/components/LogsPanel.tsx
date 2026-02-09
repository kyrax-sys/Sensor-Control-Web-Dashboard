import { Divider, Stack, Typography } from "@mui/material";

export type LogItem = {
  time: string;
  message: string;
};

type LogsPanelProps = {
  logs: LogItem[];
  onClear: () => void;
};

const LogsPanel = ({ logs, onClear }: LogsPanelProps) => {
  return (
    <Stack spacing={2} sx={{ maxHeight: 260, overflow: "hidden" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Realtime Logs</Typography>
        <Typography
          component="button"
          onClick={onClear}
          style={{
            background: "none",
            border: "none",
            color: "#d64541",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          Clear
        </Typography>
      </Stack>
      <Divider />
      <Stack spacing={1} sx={{ overflowY: "auto", pr: 1 }}>
        {logs.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Waiting for telemetry events...
          </Typography>
        ) : (
          logs.map((log, index) => (
            <Typography key={`${log.time}-${index}`} variant="body2">
              [{log.time}] {log.message}
            </Typography>
          ))
        )}
      </Stack>
    </Stack>
  );
};

export default LogsPanel;
