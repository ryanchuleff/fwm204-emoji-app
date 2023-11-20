
export type subscribeDoc = {
    subscribe?: {
      data: string,
      name: string,
    } | null,
  };

export const SUBSCRIBE_DOC = /* GraphQL */ `
  subscription Subscribe($name: String!) {
    subscribe(name: $name) {
      data
      name
    }
  }
`;
