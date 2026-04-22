import React from 'react';
import DefaultPage from '@/components/layout/Page';
import { Button, Input, Form } from 'rsuite';
import * as Yup from 'yup';
import { z } from 'zod';
import Joi from 'joi';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { object, string, number, size, min, refine } from 'superstruct';
import { create, test, enforce, only } from 'vest';
import * as v from 'valibot';
import * as t from 'io-ts';
import { isLeft } from 'fp-ts/Either';
import { PathReporter } from 'io-ts/PathReporter';
import { makeValidator, isObject, isString, isNumber, applyCascade } from 'typanion';
import { Type } from '@sinclair/typebox';
import nopeModule from 'nope-validator';

const sandboxDependencies = {
  yup: '^1.3.3',
  zod: '^3.22.0',
  joi: '^17.12.0',
  ajv: '^8.12.0',
  'ajv-formats': '^3.0.1',
  superstruct: '^2.0.2',
  vest: '^5.0.0',
  valibot: '^0.30.0',
  'io-ts': '^2.2.21',
  'fp-ts': '^2.16.2',
  typanion: '^3.14.0',
  '@sinclair/typebox': '^0.32.0',
  'nope-validator': '^0.9.0'
};

export default function Page() {
  return (
    <DefaultPage
      dependencies={{
        Button,
        Input,
        Form,
        // Yup
        Yup,
        // Zod
        z,
        // Joi
        Joi,
        // AJV / TypeBox
        Ajv,
        addFormats,
        // Superstruct
        object,
        string,
        number,
        size,
        min,
        refine,
        // Vest
        create,
        test,
        enforce,
        only,
        // Valibot
        v,
        // io-ts
        t,
        isLeft,
        PathReporter,
        // typanion
        makeValidator,
        isObject,
        isString,
        isNumber,
        applyCascade,
        // TypeBox
        Type,
        // nope
        nope: nopeModule
      }}
      sandboxDependencies={sandboxDependencies}
    />
  );
}
