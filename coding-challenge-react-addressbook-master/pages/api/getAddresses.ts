import generateMockAddresses from "../../src/utils/generateMockAddresses";
import { NextApiRequest, NextApiResponse } from "next";

function validateInput(input: string, name: string) {
  if (!input) {
    throw new Error(`${name} field is mandatory!`);
  }

  // !/^\d+$/ checks that there are only digits
  if (!/^\d+$/.test(input)) {
    throw new Error(`${name} must be all digits!`);
  }

  return input;
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { postcode, streetnumber } = req.query;

  try {
    const validatedPostcode = validateInput(postcode as string, "Postcode");
    const validatedStreetNumber = validateInput(
      streetnumber as string,
      "Street number"
    );

    const mockAddresses = generateMockAddresses(
      validatedPostcode,
      validatedStreetNumber
    );
    if (mockAddresses) {
      return res.status(200).json({
        status: "ok",
        details: mockAddresses,
      });
    }

    throw new Error("No results found!");
  } catch (error) {
    return res.status(400).send({
      status: "error",
      throw: error,
    });
  }
}
