import executionContextWarningsVocabAccessor from '@/errors/warnings/executionContext';

type TComputedNodeEnv = {
  PROD: boolean;
  DEV: boolean;
  TEST: boolean;
};

const [NODE_PROD_ENV_NEEDLE, NODE_DEV_ENV_NEEDLE, NODE_TEST_ENV_NEEDLE] = ['prod', 'dev', 'test'];
const { NODE_ENV } = process.env;

let devCtx: boolean | undefined = NODE_ENV ? NODE_ENV.startsWith(NODE_DEV_ENV_NEEDLE) : undefined;
let testCtx: boolean | undefined = NODE_ENV ? NODE_ENV.startsWith(NODE_TEST_ENV_NEEDLE) : undefined;
let prodCtx: boolean | undefined = NODE_ENV ? NODE_ENV.startsWith(NODE_PROD_ENV_NEEDLE) : undefined;
let forcedToProd: boolean = prodCtx || false;

if (NODE_ENV === undefined) {
  console.warn(executionContextWarningsVocabAccessor('UNABLE_TO_GET_NODE_ENV'));
  forcedToProd = true;
}

if (forcedToProd) {
  devCtx = false;
  testCtx = false;
}

if (devCtx === undefined) {
  console.warn(executionContextWarningsVocabAccessor('UNABLE_TO_INFER_DEV_CTX'));
  forcedToProd = true;
  devCtx = false;
}

if (testCtx === undefined) {
  console.warn(executionContextWarningsVocabAccessor('UNABLE_TO_INFER_TEST_CTX'));
  testCtx = false;
}

if ([devCtx, testCtx, prodCtx, forcedToProd].every((v) => Boolean(v) === false)) {
  console.warn(executionContextWarningsVocabAccessor('FAILED_TO_INFER_CTX'));
  forcedToProd = true;
}

export const ComputedNodeCtx: TComputedNodeEnv = {
  PROD: forcedToProd || !testCtx ? !devCtx : false,
  DEV: !forcedToProd ? devCtx : false,
  TEST: !forcedToProd ? testCtx : false
} as const;

export default ComputedNodeCtx;