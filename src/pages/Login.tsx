import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SERVER_HTTP } from "../services/api";
import { storeAuth } from "../services/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${SERVER_HTTP}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
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
      <Paper elevation={0} sx={{ p: 4, width: "100%", maxWidth: 420, border: "1px solid #efe5d8" }}>
        <Stack spacing={2}>
          <Stack spacing={0.5}>
            <Typography variant="h4">Welcome back</Typography>
            <Typography color="text.secondary">Sign in to continue.</Typography>
          </Stack>
          {error && <Alert severity="error">{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
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
              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </Stack>
          </Box>
          <Typography variant="body2" color="text.secondary">
            No account yet? <Link to="/signup">Create one</Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;
