# ELP2000-82B
Self-contained JavaScript implementation of ELP2000-82B

The code computes the coordinates of the Moon in the geocentric ecliptic frame of mean ecliptic and equinox of J2000.

For examples of use, see test/test.js. 

The ELP2000-82B data is stored in data/ELP2000-82b.json JSON file. The ELP2000 data used for the generation of the JSON file is downloaded with the script [data/download_elp2000.js](data/download_elp2000.js). Then, the JSON file is generated with the script [data/create_json_elp2000.js](data/create_json_elp2000.js). The truncation level can be adjusted with the two parameters given to the script. Both steps with truncation level of 0.001 can be executed by running "npm run elp2000".

The accuracy of the data has been tested by comparison to [JPL Horizons](https://ssd.jpl.nasa.gov/horizons/app.html#/). The error generally seems to be quite constant and vary according to the year.

![Error w.r.t. JPL Horizons 1900-2100](error_JPL_Horizons.png)