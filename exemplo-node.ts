import * as fs from "fs";
import { promisify } from "util";

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const unlink = promisify(fs.unlink);
const rmdir = promisify(fs.rmdir);

const main = async () => {

    const removerDiretorio = async (diretorio) => {
        const itens = await readdir(diretorio);
        for await (const item of itens) {
            const path = `${diretorio}/${item}`;
            const itemInfos = await stat(path);
            if (itemInfos.isDirectory()) {
                await removerDiretorio(path);
            } else {
                await unlink(path);
            }
        }
        rmdir(diretorio);
    };

    await removerDiretorio(`${process.cwd()}/diretorio-descartavel`);
};

// main();

rmdir(`${process.cwd()}/diretorio-descartavel`);
