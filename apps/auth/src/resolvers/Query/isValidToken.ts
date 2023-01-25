import { Query, QueryIsValidTokenArgs } from "../../graphql/generated/schema";
import { verifyJwt } from "../../utils/jwt";

export default async (
  input: QueryIsValidTokenArgs
): Promise<Query["isValidToken"]> => {
  try {
    verifyJwt(input.token);

    return true;
  } catch (e) {
    return false;
  }
};
