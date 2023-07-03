import { Argument, InvalidArgumentError } from "@commander-js/extra-typings";

type Iam = {
  account: string;
  project: string;
  iam: string;
};

export const createIamArgument = () => {
  return new Argument(
    "<iam>",
    "IAM in the format of <account>@<project>.iam.gserviceaccount.com"
  ).argParser((iam): Iam => {
    try {
      const [account, host] = iam.split("@");
      const [project] = host.split(".");
      if (!account || !project) {
        throw new InvalidArgumentError("Not a valid IAM.");
      }
      return { account, project, iam };
    } catch (e) {
      throw new InvalidArgumentError("Not a valid IAM.");
    }
  });
};
