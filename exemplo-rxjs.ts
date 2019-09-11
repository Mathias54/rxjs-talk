import * as fs from "fs";
import {promisify} from "util";
import { Observable } from 'rxjs';
import { from, of } from 'rxjs';
import {map, mergeMap} from "rxjs/operators";

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const estrutura$  = of(`${process.cwd()}/diretorio-descartavel`);

// WIP
estrutura$
    .pipe(
        mergeMap(async (diretorio) => {
            let itens = await readdir(diretorio);
            itens = itens.map((item) => `${diretorio}/${item}`);
            return itens;
        }),
        mergeMap((arquivos) => from(arquivos)),
        mergeMap(async (item) => {
            const infos = await stat(item);
            return {
                path: item,
                isDiretorio: infos.isDirectory(),
            };
        }),
    )
    .subscribe(console.log);
