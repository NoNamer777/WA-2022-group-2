import express from 'express';
import { jwtAuthHeaderValidator } from '../auth/index.js';
import { challengeSuggestionController } from './challengeSuggestion.controller.js';

export const challengeSuggestionRouter = express.Router();

challengeSuggestionRouter.get('/', jwtAuthHeaderValidator, async (_, response) => {
  const allSuggestions = await challengeSuggestionController.getAll();

  response.send(allSuggestions);
});
