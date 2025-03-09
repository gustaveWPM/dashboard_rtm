import type { PipeUnit } from '@rtm/shared-types/CustomUtilityTypes';

const pipeable = <input, output>(actual: (_: input) => output): PipeUnit<input, output> => {
  const f = actual as PipeUnit<input, output>;

  f.then = function <nextOutput>(this: PipeUnit<input, output>, other: PipeUnit<output, nextOutput>): PipeUnit<input, nextOutput> {
    return pipeable((input) => other(this(input)));
  };

  return f;
};

export default pipeable;
