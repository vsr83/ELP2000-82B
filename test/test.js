import { elp2000SphericalOfDate, elp2000CartesianOfDate, elp2000CartesianJ2000 } from '../src/Elp2000-82b.js';
import { horizon_array_hourly_2020 } from '../data/horizons_results_hourly_2020.js';
import { horizon_array_monthly_1900_2100 } from '../data/horizons_results_monthly_1900-2100.js';
import { elp2000ref_array_monthly_1900_2100 } from '../data/elp2000ref_results_monthly_1900-2100.js';

/**
 * Compute the position of the Moon for a sequence of Julian times and compute
 * errors to the given coordinates.
 * 
 * @param {*} array 
 *      The expected array with rows in the format [JT, X, Y, Z].
 * @returns Object with maximum, minimum and average errors.
 */
function checkArray(array)
{
    let maxError = 0;
    let avgError = 0;
    let minError = 1e10;

    for (let indValue = 0; indValue < array.length; indValue++)
    {
        const values = array[indValue];
        const JT = values[0];
        const computed = elp2000CartesianJ2000(JT);
        const expected = [values[1], values[2], values[3]];

        // Difference between the two coordinate vectors.
        const diff = [
            computed[0] - expected[0], 
            computed[1] - expected[1], 
            computed[2] - expected[2]
        ];

        const diffNorm = Math.sqrt(diff[0]*diff[0] + diff[1]*diff[1] + diff[2]*diff[2]);
        avgError += diffNorm;
        if (diffNorm > maxError)
        {
            maxError = diffNorm;
        }
        if (diffNorm < minError)
        {
            minError = diffNorm;
        }
    }

    avgError /= horizon_array_hourly_2020.length;

    return {avgError : avgError, maxError : maxError, minError : minError};
}

describe('Elp2000-82b', function() {
    describe('elp2000', function() {
        it('2020-01-01', function() {
            // Dummy example.
            console.log(elp2000CartesianJ2000(2458849.5));
        });

        // Compare to the hourly data from JPL Horizons.
        it('JPL Horizons 2020 hourly', function() {
            console.log(checkArray(horizon_array_hourly_2020));
        });

        // Compare to the montly data from JPL Horizons.
        it('JPL Horizons 1900-2100 monthly', function() {
            console.log(checkArray(horizon_array_monthly_1900_2100));
        });

        // Compare to data from the Fortran reference implementation.
        it('ELP2000-82b Reference Implementation 1900-2100 monthly', function() {
            console.log(checkArray(elp2000ref_array_monthly_1900_2100));
        });
    });
});
