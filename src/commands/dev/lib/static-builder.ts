import { basename, extname, dirname, join } from 'path';
import { BuilderParams, BuildResult, ShouldServeParams } from './types';

export function build({ files, entrypoint }: BuilderParams): BuildResult {
  const output = {
    [entrypoint]: files[entrypoint]
  };
  return { output };
}

export function shouldServe({
  entrypoint,
  files,
  requestPath
}: ShouldServeParams) {
  if (isIndex(entrypoint)) {
    const indexPath = join(requestPath, basename(entrypoint));
    if (entrypoint === indexPath && indexPath in files) {
      return true;
    }
  }
  return entrypoint === requestPath && requestPath in files;
}

function isIndex(path: string): boolean {
  const ext = extname(path);
  const name = basename(path, ext);
  return name === 'index';
}
