import type {Config} from '@jest/types';
import {pathsToModuleNameMapper} from 'ts-jest/utils';

import {compilerOptions} from './tsconfig.json';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  automock: false,
  testTimeout: 30000,
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)+(spec|test).+(js|jsx|ts|tsx)'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', {presets: ['next/babel']}],
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  setupFilesAfterEnv: ['<rootDir>/test/setupJest.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
};
export default config;
