export type SpeedLevel = "LOW" | "HIGH" | "STOP" | string;

export type Telemetry = {
  distance?: number | string;
  speed?: SpeedLevel;
  speed_value?: number;
  running?: boolean;
  auto_stop?: boolean;
  cpu_temp?: number;
  motor_status?: string;
  uptime?: string;
  ultrasonic_status?: string;
  event?: string;
  timestamp?: string;
};
