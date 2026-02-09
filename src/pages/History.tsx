import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchWithAuth, SERVER_HTTP } from "../services/api";

type LogItem = {
  timestamp: string;
  distance: number;
  speed: string;
  speed_value: number;
  auto_stop: boolean;
};

const History = () => {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchWithAuth(`${SERVER_HTTP}/api/logs?limit=200`);
        if (!res.ok) {
          setError("Backend not connected");
          return;
        }
        const data = (await res.json()) as LogItem[];
        setLogs(data);
      } catch {
        setError("Backend not connected");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return <Typography>Loading logs...</Typography>;
  }

  if (error) {
    return (
      <Stack spacing={1}>
        <Typography color="text.secondary">{error}</Typography>
        <Typography variant="body2" color="text.secondary">
          Historical logs will appear once backend is connected.
        </Typography>
      </Stack>
    );
  }

  if (logs.length === 0) {
    return <Typography>No historical data available</Typography>;
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h4">History</Typography>
      <Typography color="text.secondary">
        Review previous telemetry events captured from the vehicle.
      </Typography>

      <Paper elevation={0} sx={{ border: "1px solid #efe5d8" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Distance (cm)</TableCell>
              <TableCell>Speed</TableCell>
              <TableCell>Obstacle</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((item, index) => (
              <TableRow key={`${item.timestamp}-${index}`}>
                <TableCell>{item.timestamp}</TableCell>
                <TableCell>{item.distance}</TableCell>
                <TableCell>
                  {item.speed} ({item.speed_value})
                </TableCell>
                <TableCell>{item.auto_stop ? "Detected" : "Clear"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Stack>
  );
};

export default History;
