import {
  Alert,
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SERVER_HTTP } from "../services/api";
import { type Role, storeAuth } from "../services/auth";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${SERVER_HTTP}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }

      storeAuth(data.token, data.role);
      navigate("/", { replace: true });
    } catch {
      setError("Unable to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", p: 2 }}>
      <Paper elevation={0} sx={{ p: 4, width: "100%", maxWidth: 460, border: "1px solid #efe5d8" }}>
        <Stack spacing={2}>
          <Stack spacing={0.5}>
            <Typography variant="h4">Create account</Typography>
            <Typography color="text.secondary">
              Join the sensor platform to control your vehicle.
            </Typography>
          </Stack>
          {error && <Alert severity="error">{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Full name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <TextField
                select
                label="Role"
                value={role}
                onChange={(event) => setRole(event.target.value as Role)}
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="doctor">Doctor</MenuItem>
              </TextField>
              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? "Creating..." : "Create Account"}
              </Button>
            </Stack>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Already have an account? <Link to="/login">Sign in</Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Signup;
