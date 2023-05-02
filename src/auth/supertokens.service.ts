import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import { AuthModuleConfig, ConfigInjectionToken } from './config.interface';
import UserRoles from 'supertokens-node/recipe/userroles';
import Dashboard from 'supertokens-node/recipe/dashboard';
import { PrismaService } from '../prisma.service';
import { UserRole } from "@prisma/client";

@Injectable()
export class SupertokensService {
  constructor(
    @Inject(ConfigInjectionToken) private config: AuthModuleConfig,
    private readonly prisma: PrismaService,
  ) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        Dashboard.init(),
        UserRoles.init(),
        EmailPassword.init({
          signUpFeature: {
            formFields: [
              {
                id: 'name',
              },
              {
                id: 'phone_number',
              },
              {
                id: 'email',
              },
              {
                id: 'password',
              },
            ],
          },
          override: {
            apis: (originalImplementation) => {
              return {
                ...originalImplementation,
                signUpPOST: async function (input) {
                  if (originalImplementation.signUpPOST === undefined) {
                    throw Error('Should never come here');
                  }
                  console.log(input)
                  const roles = (await UserRoles.getAllRoles()).roles;
                  if (!roles.includes('manager')) {
                    await UserRoles.createNewRoleOrAddPermissions('manager', [
                      'write',
                      'read',
                    ]);
                  }

                  if (!roles.includes('customer')) {
                    await UserRoles.createNewRoleOrAddPermissions('customer', [
                      'read',
                    ]);
                  }

                  const response = await originalImplementation.signUpPOST(
                    input,
                  );

                  if (response.status === 'OK') {
                    const formFields = input.formFields;

                    const email = formFields.find(
                      (field) => field.id === 'email',
                    ).value;

                    if (email.includes("@cupcake.ru")) {
                      await UserRoles.addRoleToUser(response.user.id, 'manager');
                      await prisma.user.create({
                        data: {
                          id: response.user.id,
                          role: UserRole.MANAGER,
                          name: formFields.find(
                            (field) => field.id === 'name',
                          ).value,
                          phone_number: formFields.find(
                            (field) => field.id === 'phone_number',
                          ).value,
                          email: email,
                          password: formFields.find(
                            (field) => field.id === 'password',
                          ).value
                        },
                      });
                    } else {
                      await UserRoles.addRoleToUser(response.user.id, 'customer');
                      await prisma.user.create({
                        data: {
                          id: response.user.id,
                          role: UserRole.CUSTOMER,
                          name: formFields.find(
                            (field) => field.id === 'name',
                          ).value,
                          phone_number: formFields.find(
                            (field) => field.id === 'phone_number',
                          ).value,
                          email: email,
                          password: formFields.find(
                            (field) => field.id === 'password',
                          ).value
                        },
                      });
                    }


                  }
                  return response;
                },
              };
            },
          },
        }),
        Session.init(),
      ],
    });
  }
}