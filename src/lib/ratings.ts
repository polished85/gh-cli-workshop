/**
 * Pure formatting helpers for game star ratings.
 *
 * Kept framework-free and side-effect-free so the logic is unit-testable
 * without the Astro runtime (see `ratings.test.ts`). Consumed by the
 * `StarRating.astro` component.
 */

/**
 * Clamps a rating into the displayable 0–5 range.
 */
export function clampRating(rating: number): number {
    return Math.min(5, Math.max(0, rating));
}

/**
 * Builds the accessible numeric rating label shown alongside the stars.
 */
export function formatRatingValue(rating: number | null): string {
    if (rating === null) return 'No rating yet';

    return `${clampRating(rating).toFixed(1)} / 5`;
}

/**
 * Returns the percentage of each star that should be filled for a rating.
 */
export function getStarFillPercentages(rating: number | null): number[] {
    if (rating === null) return [];

    const clamped = clampRating(rating);
    return Array.from({ length: 5 }, (_, index) => {
        const percentage = (clamped - index) * 100;
        return Math.round(Math.min(100, Math.max(0, percentage)) * 10) / 10;
    });
}

/**
 * Builds a star glyph string for a rating between 0 and 5.
 *
 * Renders full (★), an optional half (½) and empty (☆) stars. Returns
 * `'Not yet rated'` when the rating is `null`. Ratings are clamped to the
 * 0–5 range so the output always contains exactly five star positions.
 */
export function formatStarRating(rating: number | null): string {
    if (rating === null) return 'Not yet rated';

    const clamped = clampRating(rating);
    const fullStars = Math.floor(clamped);
    const halfStar = clamped % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
}
