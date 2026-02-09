import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import MetricCard from "../components/MetricCard";
import SectionCard from "../components/SectionCard";
import StatusPill from "../components/StatusPill";
import LogsPanel, { type LogItem } from "../components/LogsPanel";
import { connectSocket } from "../services/socket";
import { fetchWithAuth, SERVER_HTTP } from "../services/api";
import { getRole, getToken } from "../services/auth";
import { type Telemetry } from "../types/telemetry";

const SPEED_MAP: Record<string, number> = {
  LOW: 20,
  HIGH: 60,
  STOP: 0,
};

const Dashboard = () => {
  const [distance, setDistance] = useState<number | string>("--");
  const [speed, setSpeed] = useState<string>("--");
  const [carStatus, setCarStatus] = useState<string>("--");
  const [autoStop, setAutoStop] = useState<boolean>(false);

  const [cpuTemp, setCpuTemp] = useState<number | string>("--");
  const [cpuTempStatus, setCpuTempStatus] = useState<string>("--");
  const [motorStatus, setMotorStatus] = useState<string>("--");
  const [connectionStatus, setConnectionStatus] = useState<string>("Disconnected");
  const [uptime, setUptime] = useState<string>("--");
  const [ultrasonicStatus, setUltrasonicStatus] = useState<string>("--");
  const [showAlert, setShowAlert] = useState(false);
  const [role, setRole] = useState<"doctor" | "user" | null>(null);
  const [logs, setLogs] = useState<LogItem[]>([]);

  const socketRef = useRef<ReturnType<typeof connectSocket> | null>(null);
  const telemetryReady = useRef(false);
  const backendConnected = useRef(false);
  const lastAutoStop = useRef(false);

  useEffect(() => {
    setRole(getRole());
  }, []);

  const addLog = (message: string) => {
    const now = new Date().toLocaleTimeString();
    setLogs((prev) => [{ time: now, message }, ...prev].slice(0, 80));
  };

  useEffect(() => {
    if (!telemetryReady.current || !backendConnected.current) return;

    const interval = window.setInterval(() => {
      const numericSpeed = SPEED_MAP[speed] ?? 0;
      addLog(
        `Snapshot - Speed: ${numericSpeed} km/h | Status: ${carStatus} | ${
          autoStop ? "Obstacle detected" : "Clear"
        }`
      );
    }, 5000);

    return () => window.clearInterval(interval);
  }, [speed, carStatus, autoStop]);

  useEffect(() => {
    let mounted = true;

    const initSocket = async () => {
      const token = getToken();
      if (!token || !mounted) return;

      const socket = connectSocket(token);
      socketRef.current = socket;

      socket.on("connect", () => {
        backendConnected.current = true;
        setConnectionStatus("Connected");
        addLog("Backend connected");
      });

      socket.on("disconnect", () => {
        backendConnected.current = false;
        setConnectionStatus("Disconnected");
        addLog("Backend disconnected");
      });

      socket.on("telemetry", (data: Telemetry) => {
        telemetryReady.current = true;

        setDistance(data.distance ?? "--");
        setSpeed(String(data.speed ?? "--"));
        setCarStatus(data.running ? "MOVING" : "STOPPED");
        setAutoStop(Boolean(data.auto_stop));
        setCpuTemp(data.cpu_temp ?? "--");
        if (typeof data.cpu_temp === "number") {
          setCpuTempStatus(data.cpu_temp > 70 ? "High" : "Safe");
        } else {
          setCpuTempStatus("--");
        }
        setMotorStatus(data.motor_status ?? "--");
        setUptime(data.uptime ?? "--");
        setUltrasonicStatus(data.ultrasonic_status ?? "--");

        if (data.event === "SPEED") {
          const numericSpeed = SPEED_MAP[String(data.speed)] ?? 0;
          addLog(`Speed changed to ${numericSpeed} km/h`);
        }

        if (data.auto_stop && !lastAutoStop.current) {
          setShowAlert(true);
          addLog("Obstacle detected - vehicle auto stopped");
        }

        if (!data.auto_stop && lastAutoStop.current) {
          addLog("Obstacle cleared");
        }

        lastAutoStop.current = Boolean(data.auto_stop);
      });
    };

    initSocket();

    return () => {
      mounted = false;
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  const sendSpeed = async (level: string) => {
    if (!backendConnected.current) {
      addLog("Backend disconnected - cannot send speed command");
      return;
    }

    if (autoStop) {
      addLog("Speed command blocked due to obstacle");
      return;
    }

    try {
      await fetchWithAuth(`${SERVER_HTTP}/api/speed`, {
        method: "POST",
        body: JSON.stringify({ speed: level }),
      });
    } catch {
      addLog("Failed to send speed command");
    }
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4">Dashboard</Typography>
        <Typography color="text.secondary">
          Real-time vehicle telemetry and control panel.
        </Typography>
      </Stack>

      {autoStop && (
        <Alert severity="error">Auto-stop engaged. Obstacle detected.</Alert>
      )}

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.4fr 1fr" }, gap: 2 }}>
        <SectionCard
          title="Car Control"
          action={<StatusPill label={connectionStatus} tone={
            connectionStatus === "Connected" ? "success" : "danger"
          } />}
        >
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
            <MetricCard label="Distance" value={distance} unit="cm" />
            <MetricCard label="Speed Mode" value={speed} />
            <MetricCard label="Car Status" value={carStatus} />
            <MetricCard label="Uptime" value={uptime} />
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={2}>
            <Button
              variant="contained"
              color="success"
              disabled={autoStop}
              onClick={() => sendSpeed("LOW")}
            >
              Low Speed
            </Button>
            <Button
              variant="contained"
              color="warning"
              disabled={autoStop}
              onClick={() => sendSpeed("HIGH")}
            >
              High Speed
            </Button>
            <Button
              variant="contained"
              color="error"
              disabled={autoStop}
              onClick={() => sendSpeed("STOP")}
            >
              Stop
            </Button>
          </Stack>
        </SectionCard>

        <SectionCard title="System Sensors">
          <Stack spacing={2}>
            <MetricCard
              label="CPU Temperature"
              value={cpuTemp}
              unit="°C"
              tone={cpuTempStatus === "High" ? "danger" : "default"}
            />
            <MetricCard label="CPU Status" value={cpuTempStatus} />
            <MetricCard label="Motor Status" value={motorStatus} />
            <MetricCard label="Ultrasonic" value={ultrasonicStatus} />
          </Stack>
        </SectionCard>
      </Box>

      <SectionCard
        title="Realtime Logs"
        action={
          <Typography variant="body2" color="text.secondary">
            {role === "doctor" ? "Doctor mode enabled" : "User mode"}
          </Typography>
        }
      >
        <LogsPanel logs={logs} onClear={() => setLogs([])} />
      </SectionCard>

      <Dialog open={showAlert} onClose={() => setShowAlert(false)}>
        <DialogTitle>Obstacle Detected</DialogTitle>
        <DialogContent>
          <Typography>Vehicle stopped automatically.</Typography>
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

export default Dashboard;
