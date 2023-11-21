// lib/backend-stack.ts
import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { createAmplifyGraphqlApi } from './api/appsync'

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const amplifyGraphQLAPI = createAmplifyGraphqlApi(this)
  }
}

