/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Cinemood WordPress Headless CMS / Supabase Connection Interface Model
// For future-proof REST API conversions, you only have to swap the fetch URL
export const API_CONFIG = {
  WORDPRESS_REST_URL: "https://your-wordpress-site.local/wp-json/wp/v2",
  TMDB_BASE_URL: "https://api.themoviedb.org/3",
  USE_WP_INDEXER: false // toggle to true when ready to migrate to Headless backend!
};

export const apiService = {
  /**
   * Universal fetch GET wrapper supporting custom headers and credentials
   */
  get: async <T>(endpoint: string, base: string = API_CONFIG.WORDPRESS_REST_URL): Promise<T> => {
    try {
      const response = await fetch(`${base}/${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      if (!response.ok) {
        throw new Error(`Cinemood API HTTP Error: status is ${response.status}`);
      }
      return await response.json() as T;
    } catch (e) {
      console.error(`Fetch API node error during request to [${endpoint}]`, e);
      throw e;
    }
  },

  /**
   * Fetches movies custom post types (e.g. 'cinemood_movie') from headless WordPress CMS
   */
  fetchWpMovies: async () => {
    // Queries custom WordPress taxonomy 'genres' & custom metadata fields like 'download_links'
    return apiService.get<any[]>("cinemood_movie?_embed=true");
  },

  /**
   * Fetches specific movie data with associated WordPress taxonomies
   */
  fetchWpMovieBySlug: async (slug: string) => {
    return apiService.get<any[]>(`cinemood_movie?slug=${slug}&_embed=true`);
  }
};
