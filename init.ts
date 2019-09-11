import * as fs from 'fs';

fs.mkdirSync('diretorio-descartavel');
fs.mkdirSync('diretorio-descartavel/subdiretorio-descartavel');
fs.writeFileSync('diretorio-descartavel/arquivo-descartavel.txt', null);
fs.writeFileSync('diretorio-descartavel/subdiretorio-descartavel/subarquivo-descartavel.txt', null);
