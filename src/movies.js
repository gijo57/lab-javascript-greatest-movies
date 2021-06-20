// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.

const movies = require('./data');

// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(movies) {
  return movies.map((movie) => movie.director);
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(movies) {
  return movies.filter(
    (movie) =>
      movie.director === 'Steven Spielberg' && movie.genre.includes('Drama')
  ).length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(movies) {
  const average =
    movies.reduce((sum, movie) => (movie.score ? sum + movie.score : sum), 0) /
      movies.length || 0;
  return Number(average.toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(movies) {
  return scoresAverage(movies.filter((movie) => movie.genre.includes('Drama')));
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(movies) {
  return [...movies].sort((a, b) => {
    if (a.year === b.year) {
      return a.title.localeCompare(b.title);
    }
    return a.year - b.year;
  });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(movies) {
  return [...movies]
    .sort((a, b) => {
      return a.title.localeCompare(b.title);
    })
    .slice(0, 20)
    .map((movie) => movie.title);
}
// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(movies) {
  return movies.map((movie) => {
    let digits = movie.duration.match(/\d+/g);
    let durationInMinutes =
      digits.length === 2
        ? Number(digits[0]) * 60 + Number(digits[1])
        : Number(digits[0]) * 60;
    return { ...movie, duration: durationInMinutes };
  });
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(movies) {
  if (!movies.length) return null;
  const yearlyScores = {};
  movies.forEach((movie) => {
    if (yearlyScores.hasOwnProperty(movie.year)) {
      yearlyScores[movie.year].push(movie.score);
    } else {
      yearlyScores[movie.year] = [];
      yearlyScores[movie.year].push(movie.score);
    }
  });
  const yearlyAverages = Object.entries(yearlyScores).map((year) => {
    return {
      year: year[0],
      avg: year[1].reduce((acc, val) => acc + val, 0) / year[1].length
    };
  });
  const highestAverage = yearlyAverages.reduce(
    (acc, year) => {
      return acc.avg < year.avg ? year : acc;
    },
    { year: '', avg: 0 }
  );
  return `The best year was ${highestAverage.year} with an average score of ${highestAverage.avg}`;
}

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg
  };
}
