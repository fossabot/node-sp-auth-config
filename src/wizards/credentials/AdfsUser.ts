import { Question, prompt } from 'inquirer';
import { IAdfsUserCredentials } from 'node-sp-auth';

import { defaultPasswordMask } from '../../utils';
import { IWizardCallback } from '../../interfaces/wizard';

const wizard: IWizardCallback = async (authContext, answersAll = {}) => {
  const adfsUserCredentials = authContext.authOptions as IAdfsUserCredentials;
  const promptFor: Question[] = [
    {
      name: 'username',
      message: 'User name',
      type: 'input',
      default: adfsUserCredentials.username,
      validate: (answer: string) => answer.length > 0
    },
    {
      name: 'password',
      message: 'Password',
      type: 'password',
      mask: '*',
      default: adfsUserCredentials.password ? defaultPasswordMask : null,
      validate: (answer: string) => answer.length > 0
    },
    {
      name: 'relyingParty',
      message: 'relyingParty',
      type: 'input',
      default: adfsUserCredentials.relyingParty || 'urn:sharepoint:portal',
      validate: (answer: string) => answer.length > 0
    },
    {
      name: 'adfsUrl',
      message: 'adfsUrl',
      type: 'input',
      default: adfsUserCredentials.adfsUrl,
      validate: (answer: string) => answer.length > 0
    },
    {
      name: 'adfsCookie',
      message: 'adfsCookie',
      type: 'input',
      default: adfsUserCredentials.adfsCookie || 'FedAuth',
      validate: (answer: string) => answer.length > 0
    }
  ];
  const answers = await prompt(promptFor);
  return {
    ...answersAll, ...answers,
    password: answers.password === defaultPasswordMask
      ? adfsUserCredentials.password
      : answers.password
  };
};

export default wizard;
