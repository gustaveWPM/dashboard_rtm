import type { Pipe } from '@rtm/shared-types/CustomUtilityTypes';

const pipeFun = <input, output>(actual: (_: input) => output): Pipe<input, output> => {
  const f = actual as Pipe<input, output>;
  f.then = function <nextOutput>(this: Pipe<input, output>, other: Pipe<output, nextOutput>): Pipe<input, nextOutput> {
    return pipeFun((input) => other(this(input)));
  };

  return f;
};

export default pipeFun;
