#!/usr/bin/env node
/**
 * @file fortunateCow.js
 * @description Exports a function that returns a cowsay message with a random fortune.
 * The module demonstrates data encapsulation and filtering: fortunes can be filtered by category.
 * @module fortunateCow
 */

import { say } from 'cowsay';
import fortunesData from './fortunes.json' with { type: 'json' };

/**
 * Loads the fortunes array from the imported fortunesData.
 *
 * @returns {Array<Object>} An array of fortune objects.
 */
function loadFortunes() {
  return fortunesData.fortunes;
}

/**
 * Filters fortunes based on category.
 *
 * @param {Array<Object>} fortunes - Array of fortune objects.
 * @param {string} [category] - Optional category to filter by.
 * @returns {Array<Object>} The filtered array of fortune objects.
 */
function filterFortunes(fortunes, category) {
  if (!category) return fortunes;
  return fortunes.filter(fortune => fortune.category && fortune.category.toLowerCase() === category.toLowerCase());
}

/**
 * Selects a random fortune from the provided fortunes array.
 *
 * @param {Array<Object>} fortunes - An array of fortune objects.
 * @returns {string} The text of a randomly selected fortune.
 */
function getRandomFortune(fortunes) {
  const randomIndex = Math.floor(Math.random() * fortunes.length);
  return fortunes[randomIndex].text;
}

/**
 * Returns a cowsay message containing a random fortune.
 * Optionally filters the fortunes by category.
 *
 * @param {string} [category] - The category to filter fortunes by.
 * @returns {string} The cowsay message with the selected fortune.
 *
 * @example
 * To use the module, supply an optional filter:
 * const msg = fortunateCow("motivational");
 * console.log(msg);
 */
export function fortunateCow(category) {
  let fortunes = loadFortunes();

  if (category) {
    fortunes = filterFortunes(fortunes, category);
  }

  if (!fortunes.length) {
    return "No fortune found matching your criteria.";
  }

  const fortune = getRandomFortune(fortunes);
  return say({ text: fortune });
}
