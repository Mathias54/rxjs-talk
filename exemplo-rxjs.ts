import * as fs from "fs";
import { promisify } from "util";
import { Observable } from 'rxjs';

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const unlink = promisify(fs.unlink);
const rmdir = promisify(fs.rmdir);

const removerDiretorio = async (diretorio, diretorioCallback, arquivoCallback) => {
  const itens = await readdir(diretorio);
  for await (const item of itens) {
    const path = `${diretorio}/${item}`;
    const itemInfos = await stat(path);
    if (itemInfos.isDirectory()) {
      await removerDiretorio(path, diretorioCallback, arquivoCallback);
    } else {
      arquivoCallback(path);
    }
  }
  diretorioCallback(diretorio);
};

const itens$ = Observable.create( async (subscriber) => {

  const diretorio = `${process.cwd()}/diretorio-descartavel`;

  const diretorioCallback = (path) => {
    subscriber.next({path, isDiretorio: true});
  };

  const arquivoCallback = (path) => {
    subscriber.next({path, isDiretorio: false});
  };

  await removerDiretorio(
      diretorio,
      diretorioCallback,
      arquivoCallback,
  );

  subscriber.complete();
});

itens$
    .subscribe((item) => item.isDiretorio ? rmdir(item.path) : unlink(item.path));