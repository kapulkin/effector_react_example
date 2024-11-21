import { createStore, createEffect, Effect, Store } from 'effector';
import { UserProfile } from '../types';

// Effects (for async operations)
export const fetchUserProfileFx: Effect<void, UserProfile> = createEffect(async () => {
  const response = await fetch('/api/profile');
  return response.json();
});

export const updateUserProfileFx: Effect<UserProfile, UserProfile> = createEffect(async (profile: UserProfile) => {
  const response = await fetch('/api/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profile),
  });
  return response.json();
});

// Store
export const $profile: Store<UserProfile> = createStore({ name: '', trainingPlan: '' })
  .on(fetchUserProfileFx.doneData, (_state: UserProfile, payload: UserProfile) => payload)
  .on(updateUserProfileFx.doneData, (_state: UserProfile, payload: UserProfile) => payload);

export const $isLoading: Store<boolean> = createStore(false)
  .on([fetchUserProfileFx, updateUserProfileFx], () => true)
  .on([fetchUserProfileFx.done, fetchUserProfileFx.fail, updateUserProfileFx.done, updateUserProfileFx.fail], () => false);

interface ErrorPayload {
  error: Error;
}

export const $error: Store<string | null> = createStore<string | null>(null)
  .on([fetchUserProfileFx.fail, updateUserProfileFx.fail], (_state: string | null, { error }: ErrorPayload) => error.message)
  .reset([fetchUserProfileFx, updateUserProfileFx]); 
