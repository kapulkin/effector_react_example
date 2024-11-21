import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useStore, useEvent } from 'effector-react';
import {
  $profile,
  $isLoading,
  $error,
  fetchUserProfileFx,
  updateUserProfileFx,
} from '../store';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';

export const Profile: React.FC = () => {
  const profile = useStore($profile);
  const isLoading = useStore($isLoading);
  const error = useStore($error);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(profile);

  useEffect(() => {
    fetchUserProfileFx();
  }, []);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateUserProfileFx(formData);
    setEditMode(false);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handlePlanChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, trainingPlan: e.target.value });
  };

  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        {error && <Alert severity="error">{error}</Alert>}
        
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <Typography variant="h4" gutterBottom>
              Edit Profile
            </Typography>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={handleNameChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Training Plan"
              multiline
              rows={4}
              value={formData.trainingPlan}
              onChange={handlePlanChange}
              margin="normal"
            />
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Save
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setEditMode(false);
                  setFormData(profile);
                }}
              >
                Cancel
              </Button>
            </Box>
          </form>
        ) : (
          <Box>
            <Typography variant="h4" gutterBottom>
              Profile
            </Typography>
            <Typography variant="h6">Name</Typography>
            <Typography paragraph>{profile.name}</Typography>
            <Typography variant="h6">Training Plan</Typography>
            <Typography
              paragraph
              sx={{ whiteSpace: 'pre-wrap' }}
            >
              {profile.trainingPlan}
            </Typography>
            <Button
              variant="contained"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}; 