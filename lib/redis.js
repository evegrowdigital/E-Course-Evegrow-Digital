import { Redis } from '@upstash/redis';

function cariEnv(akhiran) {
  const kunci = Object.keys(process.env).find(
    (k) => k.endsWith(akhiran) && process.env[k]
  );
  return kunci ? process.env[kunci] : undefined;
}

const url =
  process.env.UPSTASH_REDIS_REST_URL ||
  process.env.KV_REST_API_URL ||
  cariEnv('REST_API_URL') ||
  cariEnv('REDIS_REST_URL');

const token =
  process.env.UPSTASH_REDIS_REST_TOKEN ||
  process.env.KV_REST_API_TOKEN ||
  cariEnv('REST_API_TOKEN') ||
  cariEnv('REDIS_REST_TOKEN');

export const redis = new Redis({ url, token });
