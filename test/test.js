import { elp2000SphericalOfDate, elp2000CartesianOfDate, elp2000CartesianJ2000 } from '../src/Elp2000-82b.js';
import { horizon_array_hourly_2020 } from './horizons_results_hourly_2020.js';
import { horizon_array_monthly_1900_2100 } from './horizons_results_monthly_1900-2100.js';

function checkArray(array)
{
    let maxError = 0;
    let avgError = 0;

    for (let indValue = 0; indValue < array.length; indValue++)
    {
        const values = array[indValue];
        const JT = values[0];
        const computed = elp2000CartesianJ2000(JT);
        const expected = [values[1], values[2], values[3]];

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
    }
    avgError /= horizon_array_hourly_2020.length;

    return {avgError : avgError, maxError : maxError};
}

describe('Elp2000-82b', function() {
    describe('elp2000', function() {
        it('2020-01-01', function() {
            console.log(elp2000CartesianJ2000(2458849.5));
        });

        it('JPL Horizons 2020 hourly', function() {
            console.log(checkArray(horizon_array_hourly_2020));
        });

        it('JPL Horizons 1900-2100 monthly', function() {
            console.log(checkArray(horizon_array_monthly_1900_2100));
        });

    });
});
