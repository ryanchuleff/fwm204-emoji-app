// lib/api/appsync.ts
import * as path from 'path'
import { Construct } from 'constructs'
import { Duration } from 'aws-cdk-lib'
import * as appsync from 'aws-cdk-lib/aws-appsync';
import { AmplifyGraphqlApi, AmplifyGraphqlDefinition } from '@aws-amplify/graphql-api-construct'

export function createAmplifyGraphqlApi(
  scope: Construct
) {
  const apiName = `emojiThrowerApi`;

  const amplifyAppSyncAPI = new AmplifyGraphqlApi(scope, apiName, {
    definition: AmplifyGraphqlDefinition.fromFiles(
      path.join(__dirname, './schema.graphql')
    ),
    authorizationModes: {
      defaultAuthorizationMode: 'API_KEY',
      apiKeyConfig: {
        description: 'Api Key for public access',
        expires: Duration.days(30),
      },
    },
  });

  const noneDS = amplifyAppSyncAPI.addNoneDataSource('NoneDataSource', {
    description: 'A None Datasource.'
  });

  const resolverCodeWithSubscription = `
    export function request(ctx) {
      return { payload: ctx.args };
    }

    export function response(ctx) {
      return ctx.result
    }
  `;

  amplifyAppSyncAPI.addResolver('channelPublishResolver', {
    typeName: 'Mutation',
    fieldName: 'publish',
    code: appsync.Code.fromInline(resolverCodeWithSubscription),
    runtime: appsync.FunctionRuntime.JS_1_0_0,
    dataSource: noneDS,
  });

  return amplifyAppSyncAPI;
}
