import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchUserProfile, updateUserProfile } from '../features/userSlice';
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
  const dispatch = useDispatch<AppDispatch>();
  const { profile, isLoading, error } = useSelector(
    (state: RootState) => state.user
  );

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(profile);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(updateUserProfile(formData));
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