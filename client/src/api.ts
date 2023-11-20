
export type publishDoc = {
  publish?: {
    data: string,
    name: string,
  } | null,
};

export const PUBLISH_DOC = /* GraphQL */ `
  mutation Publish($data: AWSJSON!, $name: String!) {
    publish(data: $data, name: $name) {
      data
      name
    }
  }
`;
